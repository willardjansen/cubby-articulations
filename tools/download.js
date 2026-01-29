#!/usr/bin/env node

/**
 * Cubby Articulations - Download CLI
 *
 * Usage:
 *   npx cubby-articulations download <library> [--daw <daw>] [--output <dir>]
 *   npx cubby-articulations list [--developer <name>] [--daw <daw>]
 *   npx cubby-articulations search <query>
 *
 * Examples:
 *   npx cubby-articulations list
 *   npx cubby-articulations list --developer "Spitfire Audio"
 *   npx cubby-articulations download spitfire/bbc-symphony-orchestra --daw logic
 *   npx cubby-articulations search "strings"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_URL = 'https://github.com/willardjansen/cubby-articulations';
const RAW_URL = 'https://raw.githubusercontent.com/willardjansen/cubby-articulations/main';

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
Cubby Articulations - Expression Map Database CLI

Commands:
  list                     List all available libraries
  list --developer <name>  List libraries from a specific developer
  list --daw <daw>         List libraries with exports for a specific DAW
  search <query>           Search libraries by name or tags
  download <library>       Download a library's expression maps
  info <library>           Show details about a library

Options:
  --daw <daw>        Filter by DAW (cubase, logic, studio-one, dorico, reaper)
  --output <dir>     Output directory for downloads (default: current directory)
  --help             Show this help message

Examples:
  cubby-articulations list
  cubby-articulations list --developer "Spitfire Audio"
  cubby-articulations download spitfire/bbc-symphony-orchestra --daw logic
  cubby-articulations search "brass"

Repository: ${REPO_URL}
  `);
}

function getArg(flag) {
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1]) {
    return args[idx + 1];
  }
  return null;
}

async function fetchLibraries() {
  // In a real implementation, this would fetch from the GitHub API
  // For now, we'll read from local files
  const librariesPath = path.join(__dirname, '..', 'libraries');
  const developers = fs.readdirSync(librariesPath);
  const libraries = [];

  for (const dev of developers) {
    const devPath = path.join(librariesPath, dev);
    if (!fs.statSync(devPath).isDirectory()) continue;

    const libs = fs.readdirSync(devPath);
    for (const lib of libs) {
      const libPath = path.join(devPath, lib);
      if (!fs.statSync(libPath).isDirectory()) continue;

      const metaPath = path.join(libPath, 'meta.yaml');
      if (fs.existsSync(metaPath)) {
        const yaml = require('js-yaml');
        try {
          const meta = yaml.load(fs.readFileSync(metaPath, 'utf8'));
          libraries.push({
            path: `${dev}/${lib}`,
            ...meta
          });
        } catch (e) {
          // Skip invalid meta files
        }
      }
    }
  }

  return libraries;
}

async function listLibraries() {
  const devFilter = getArg('--developer');
  const dawFilter = getArg('--daw');

  const libraries = await fetchLibraries();

  let filtered = libraries;

  if (devFilter) {
    filtered = filtered.filter(lib =>
      lib.developer?.toLowerCase().includes(devFilter.toLowerCase())
    );
  }

  if (dawFilter) {
    filtered = filtered.filter(lib =>
      lib.exports?.includes(dawFilter.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    console.log('No libraries found matching your criteria.');
    return;
  }

  console.log(`\nFound ${filtered.length} libraries:\n`);
  console.log('PATH                                    DEVELOPER            FORMATS');
  console.log('─'.repeat(75));

  for (const lib of filtered) {
    const path = lib.path.padEnd(40);
    const dev = (lib.developer || 'Unknown').substring(0, 18).padEnd(20);
    const formats = (lib.exports || []).join(', ');
    console.log(`${path}${dev}${formats}`);
  }

  console.log(`\nTo download: cubby-articulations download <path> --daw <daw>`);
}

async function searchLibraries() {
  const query = args[1]?.toLowerCase();
  if (!query) {
    console.log('Please provide a search query.');
    return;
  }

  const libraries = await fetchLibraries();

  const results = libraries.filter(lib => {
    const searchable = [
      lib.name,
      lib.developer,
      lib.category,
      ...(lib.tags || [])
    ].join(' ').toLowerCase();
    return searchable.includes(query);
  });

  if (results.length === 0) {
    console.log(`No libraries found matching "${query}".`);
    return;
  }

  console.log(`\nFound ${results.length} libraries matching "${query}":\n`);
  for (const lib of results) {
    console.log(`  ${lib.path}`);
    console.log(`    ${lib.name} by ${lib.developer}`);
    if (lib.tags) console.log(`    Tags: ${lib.tags.join(', ')}`);
    console.log();
  }
}

async function downloadLibrary() {
  const libPath = args[1];
  if (!libPath) {
    console.log('Please specify a library path (e.g., spitfire/bbc-symphony-orchestra)');
    return;
  }

  const daw = getArg('--daw');
  const outputDir = getArg('--output') || process.cwd();

  const exportsPath = path.join(__dirname, '..', 'libraries', libPath, 'exports');

  if (!fs.existsSync(exportsPath)) {
    console.log(`Library not found: ${libPath}`);
    console.log(`\nRun 'cubby-articulations list' to see available libraries.`);
    return;
  }

  const availableDaws = fs.readdirSync(exportsPath).filter(d => {
    const dawPath = path.join(exportsPath, d);
    return fs.statSync(dawPath).isDirectory() && fs.readdirSync(dawPath).length > 0;
  });

  if (availableDaws.length === 0) {
    console.log(`No exports available for ${libPath}`);
    return;
  }

  if (daw && !availableDaws.includes(daw)) {
    console.log(`No ${daw} exports for ${libPath}`);
    console.log(`Available formats: ${availableDaws.join(', ')}`);
    return;
  }

  const dawsToDownload = daw ? [daw] : availableDaws;

  console.log(`\nDownloading ${libPath}...`);

  for (const dawName of dawsToDownload) {
    const srcDir = path.join(exportsPath, dawName);
    const destDir = path.join(outputDir, libPath.split('/')[1], dawName);

    fs.mkdirSync(destDir, { recursive: true });

    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`  ✓ ${dawName}/${file}`);
    }
  }

  console.log(`\nDownloaded to: ${outputDir}`);
}

async function showInfo() {
  const libPath = args[1];
  if (!libPath) {
    console.log('Please specify a library path');
    return;
  }

  const metaPath = path.join(__dirname, '..', 'libraries', libPath, 'meta.yaml');
  if (!fs.existsSync(metaPath)) {
    console.log(`Library not found: ${libPath}`);
    return;
  }

  const yaml = require('js-yaml');
  const meta = yaml.load(fs.readFileSync(metaPath, 'utf8'));

  console.log(`\n${meta.name}`);
  console.log('─'.repeat(50));
  console.log(`Developer: ${meta.developer}`);
  if (meta.version) console.log(`Version: ${meta.version}`);
  if (meta.category) console.log(`Category: ${meta.category}`);
  if (meta.website) console.log(`Website: ${meta.website}`);
  if (meta.exports) console.log(`Formats: ${meta.exports.join(', ')}`);
  if (meta.tags) console.log(`Tags: ${meta.tags.join(', ')}`);

  if (meta.attribution) {
    console.log(`\nAttribution:`);
    const attr = meta.attribution;
    if (attr.original_author) console.log(`  Original author: ${attr.original_author}`);
    if (attr.original_source) console.log(`  Source: ${attr.original_source}`);
    if (attr.original_license) console.log(`  License: ${attr.original_license}`);
    if (attr.author) console.log(`  Author: ${attr.author}`);
    if (attr.license) console.log(`  License: ${attr.license}`);
  }

  if (meta.notes) {
    console.log(`\nNotes:\n${meta.notes}`);
  }
}

// Main
async function main() {
  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  switch (command) {
    case 'list':
      await listLibraries();
      break;
    case 'search':
      await searchLibraries();
      break;
    case 'download':
      await downloadLibrary();
      break;
    case 'info':
      await showInfo();
      break;
    default:
      console.log(`Unknown command: ${command}`);
      printHelp();
  }
}

main().catch(console.error);
