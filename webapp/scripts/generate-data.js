#!/usr/bin/env node

/**
 * Generate libraries.json and API endpoints from meta.yaml files
 * Run this before building the webapp
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LIBRARIES_DIR = path.join(__dirname, '..', '..', 'libraries');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'lib', 'libraries.json');
const API_DIR = path.join(__dirname, '..', 'public', 'api', 'v1');
const GITHUB_BASE = 'https://github.com/willardjansen/cubby-articulations/raw/main/libraries';

function main() {
  const libraries = [];

  // Read all developer directories
  const developers = fs.readdirSync(LIBRARIES_DIR);

  for (const dev of developers) {
    const devPath = path.join(LIBRARIES_DIR, dev);
    if (!fs.statSync(devPath).isDirectory()) continue;

    // Read all library directories for this developer
    const libs = fs.readdirSync(devPath);

    for (const lib of libs) {
      const libPath = path.join(devPath, lib);
      if (!fs.statSync(libPath).isDirectory()) continue;

      const metaPath = path.join(libPath, 'meta.yaml');
      if (!fs.existsSync(metaPath)) {
        console.warn(`Warning: No meta.yaml in ${dev}/${lib}`);
        continue;
      }

      try {
        const metaContent = fs.readFileSync(metaPath, 'utf8');
        const meta = yaml.load(metaContent);

        // Check what exports actually exist
        const exportsDir = path.join(libPath, 'exports');
        const availableExports = [];

        if (fs.existsSync(exportsDir)) {
          const dawDirs = fs.readdirSync(exportsDir);
          for (const dawDir of dawDirs) {
            const dawPath = path.join(exportsDir, dawDir);
            if (fs.statSync(dawPath).isDirectory()) {
              const files = fs.readdirSync(dawPath);
              if (files.length > 0) {
                availableExports.push(dawDir);
              }
            }
          }
        }

        libraries.push({
          path: `${dev}/${lib}`,
          name: meta.name || lib,
          developer: meta.developer || dev,
          category: meta.category,
          exports: availableExports.length > 0 ? availableExports : meta.exports,
          tags: meta.tags,
          website: meta.website,
          attribution: meta.attribution,
          updated: meta.updated,
        });

        console.log(`✓ ${dev}/${lib}`);
      } catch (e) {
        console.error(`Error parsing ${dev}/${lib}/meta.yaml:`, e.message);
      }
    }
  }

  // Sort by developer, then name
  libraries.sort((a, b) => {
    if (a.developer !== b.developer) {
      return a.developer.localeCompare(b.developer);
    }
    return a.name.localeCompare(b.name);
  });

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON for webapp
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(libraries, null, 2));
  console.log(`\nGenerated ${OUTPUT_FILE}`);
  console.log(`Total libraries: ${libraries.length}`);

  // Generate API endpoints
  generateAPI(libraries);
}

function generateAPI(libraries) {
  console.log('\nGenerating API endpoints...');

  // Ensure API directory exists
  if (!fs.existsSync(API_DIR)) {
    fs.mkdirSync(API_DIR, { recursive: true });
  }

  // Generate /api/v1/libraries.json - summary list
  const apiSummary = {
    version: '1.0',
    generated: new Date().toISOString(),
    count: libraries.length,
    libraries: libraries.map(lib => ({
      path: lib.path,
      name: lib.name,
      developer: lib.developer,
      category: lib.category,
      exports: lib.exports,
      tags: lib.tags,
    })),
  };
  fs.writeFileSync(
    path.join(API_DIR, 'libraries.json'),
    JSON.stringify(apiSummary, null, 2)
  );
  console.log('✓ /api/v1/libraries.json');

  // Generate individual library endpoints with download URLs
  const librariesApiDir = path.join(API_DIR, 'libraries');
  if (!fs.existsSync(librariesApiDir)) {
    fs.mkdirSync(librariesApiDir, { recursive: true });
  }

  for (const lib of libraries) {
    const [developer, library] = lib.path.split('/');
    const devDir = path.join(librariesApiDir, developer);
    if (!fs.existsSync(devDir)) {
      fs.mkdirSync(devDir, { recursive: true });
    }

    // Get download URLs for each export
    const downloads = {};
    const libPath = path.join(LIBRARIES_DIR, lib.path);
    const exportsDir = path.join(libPath, 'exports');

    if (fs.existsSync(exportsDir)) {
      const dawDirs = fs.readdirSync(exportsDir);
      for (const dawDir of dawDirs) {
        const dawPath = path.join(exportsDir, dawDir);
        if (fs.statSync(dawPath).isDirectory()) {
          const files = fs.readdirSync(dawPath);
          if (files.length > 0) {
            downloads[dawDir] = {
              count: files.length,
              files: files.map(f => ({
                name: f,
                url: `${GITHUB_BASE}/${lib.path}/exports/${dawDir}/${encodeURIComponent(f)}`,
              })),
            };
          }
        }
      }
    }

    const libraryDetail = {
      ...lib,
      downloads,
      github: `https://github.com/willardjansen/cubby-articulations/tree/main/libraries/${lib.path}`,
    };

    fs.writeFileSync(
      path.join(devDir, `${library}.json`),
      JSON.stringify(libraryDetail, null, 2)
    );
  }
  console.log(`✓ /api/v1/libraries/[developer]/[library].json (${libraries.length} files)`);

  // Generate developer index
  const developers = {};
  for (const lib of libraries) {
    const dev = lib.developer;
    if (!developers[dev]) {
      developers[dev] = {
        name: dev,
        libraries: [],
      };
    }
    developers[dev].libraries.push({
      path: lib.path,
      name: lib.name,
      category: lib.category,
      exports: lib.exports,
    });
  }

  fs.writeFileSync(
    path.join(API_DIR, 'developers.json'),
    JSON.stringify({
      version: '1.0',
      generated: new Date().toISOString(),
      count: Object.keys(developers).length,
      developers: Object.values(developers),
    }, null, 2)
  );
  console.log('✓ /api/v1/developers.json');

  // Generate categories index
  const categories = {};
  for (const lib of libraries) {
    const cat = lib.category || 'uncategorized';
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push({
      path: lib.path,
      name: lib.name,
      developer: lib.developer,
    });
  }

  fs.writeFileSync(
    path.join(API_DIR, 'categories.json'),
    JSON.stringify({
      version: '1.0',
      generated: new Date().toISOString(),
      categories,
    }, null, 2)
  );
  console.log('✓ /api/v1/categories.json');

  console.log('\nAPI generation complete!');
}

main();
