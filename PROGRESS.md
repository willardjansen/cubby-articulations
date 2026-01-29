# Cubby Articulations - Development Progress

## Current Status: Phase 2 - Tooling (In Progress)

---

## Statistics

| Metric | Count |
|--------|-------|
| Total Files | 183+ |
| Developers Covered | 6 |
| Libraries Covered | 19 |
| Cubase Expression Maps | 130+ |
| Logic Articulation Sets | 55+ |
| Studio One Sound Variations | 0 |
| Reaper Reabanks | 0 |

---

## Imported Libraries

### Vienna Symphonic Library (VSL)
**Source:** [jaredthirsk/cubase-expression-maps](https://github.com/jaredthirsk/cubase-expression-maps)
**License:** Unlicense (Public Domain)
**Format:** Cubase Expression Maps

- [x] Synchron Brass
- [x] Synchron Strings Pro
- [x] Synchron Elite Strings
- [x] Synchron Drums
- [x] Synchronized Appassionata Strings
- [x] Synchronized Dimension Strings
- [x] Synchronized Solo Strings
- [x] Synchronized Woodwinds
- [x] Synchronized Special Edition
- [x] Big Bang Orchestra
- [x] VI Special Edition

### Spitfire Audio
**Source:** [simonlehmann](https://github.com/simonlehmann) repositories
**License:** MIT
**Format:** Logic Pro Articulation Sets

- [x] BBC Symphony Orchestra (45 articulation sets)
- [x] Abbey Road One: Orchestral Foundations (10 articulation sets)
- [ ] Albion One
- [ ] Albion Tundra
- [ ] Chamber Strings
- [ ] Symphonic Strings
- [ ] LABS

### Cinematic Studio Series
**Source:** [alvsvartr/Cubase-Expression-Maps](https://github.com/alvsvartr/Cubase-Expression-Maps)
**License:** Open source
**Format:** Cubase Expression Maps

- [x] Cinematic Studio Strings
- [ ] Cinematic Studio Brass
- [ ] Cinematic Studio Woodwinds
- [ ] Cinematic Studio Piano

### IK Multimedia
**Source:** Original creation by Willard Jansen
**License:** MIT
**Format:** Cubase Expression Maps

- [x] Miroslav Philharmonik 2 (30 expression maps - full orchestra)

### Impact Soundworks
**Source:** [alvsvartr/Cubase-Expression-Maps](https://github.com/alvsvartr/Cubase-Expression-Maps)
**License:** Open source
**Format:** Cubase Expression Maps

- [x] Bravura Scoring Brass
- [x] Rhapsody Orchestral Colors
- [ ] Shreddage series

---

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full development roadmap with status indicators.

---

## Changelog

### 2026-01-29 - Phase 2 & 3: Tooling and Webapp
**Phase 2: Tooling**
- Added GitHub Actions workflow for PR validation (`.github/workflows/validate-pr.yml`)
  - Validates meta.yaml syntax and required fields
  - Checks exports folder structure
  - Runs on all PRs affecting `libraries/`
- Created CLI tool for downloads (`tools/download.js`)
  - `list` - List all libraries with filtering by developer/DAW
  - `search` - Search libraries by name or tags
  - `download` - Download expression maps for a specific library
  - `info` - Show library details
- Added npm package configuration (`tools/package.json`)

**Phase 3: Search Webapp**
- Created Next.js static site (`webapp/`)
  - Browse all libraries with search and filters
  - Filter by developer, DAW format, category
  - Direct download links to GitHub
  - Cubby pink/purple dark theme
- Build script generates `libraries.json` from meta.yaml files
- Ready to deploy to articulations.cubbycomposer.com

---

### 2025-01-28
- Announced on [Reddit r/composer](https://www.reddit.com/r/composer/comments/1qpqa2v/free_opensource_expression_map_database_for/)
- Announced on [Steinberg Forums](https://forums.steinberg.net/t/free-open-source-expression-map-database-cubby-articulations-community-project/1022305)
- Announced on [VI-Control](https://vi-control.net/community/threads/cubby-articulations-free-open-source-expression-map-database-community-project.169892/)
- Initial repository created
- Imported 70+ VSL expression maps from jaredthirsk (Unlicense)
- Imported 55 Spitfire Logic articulation sets from simonlehmann (MIT)
- Imported Cinematic Studio Strings from alvsvartr
- Added Miroslav Philharmonik 2 (30 maps) - original creation
- Created project structure, schemas, and documentation
- Added to cubbycomposer.com website

---

## How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Quick checklist:**
1. Maps must be your own creation OR from an open-source project
2. NO commercial/proprietary maps (Art Conductor, etc.)
3. Include proper attribution in meta.yaml
4. Test that articulations work correctly
