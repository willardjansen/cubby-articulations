#!/usr/bin/env node

/**
 * Generate libraries.json from meta.yaml files
 * Run this before building the webapp
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LIBRARIES_DIR = path.join(__dirname, '..', '..', 'libraries');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'lib', 'libraries.json');

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

  // Write JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(libraries, null, 2));

  console.log(`\nGenerated ${OUTPUT_FILE}`);
  console.log(`Total libraries: ${libraries.length}`);
}

main();
