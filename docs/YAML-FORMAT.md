# YAML Format Reference (For Developers)

This is the technical reference for contributors who want to submit via pull requests with properly formatted YAML files.

**Most contributors don't need this** - just [upload your files here](https://github.com/willardjansen/cubby-articulations/discussions/new?category=share-your-maps).

---

## File Structure

```
libraries/[developer]/[library-name]/
├── meta.yaml              # Required: Library metadata
├── [instrument].yaml      # Source definitions (one per instrument/section)
└── exports/               # Generated DAW-specific files
    ├── cubase/
    ├── logic/
    └── studio-one/
```

## meta.yaml Format

```yaml
name: "BBC Symphony Orchestra"
developer: "Spitfire Audio"
version: "1.2.0"
category: "orchestral"
website: "https://www.spitfireaudio.com/bbc-symphony-orchestra"

attribution:
  author: "Your Name"
  source: "Original creation"
  license: "MIT"
  confirmation: "I created this from scratch"

exports:
  - cubase
  - logic
  - studio-one

updated: "2025-01-28"

tags:
  - strings
  - brass
  - woodwinds
```

## Expression Map YAML Format

```yaml
instrument: "Violins 1"
patch: "BBCSO Violins 1"
channel: 1

keyswitch_type: "uacc"  # or "keyswitch", "program_change", "cc"
keyswitch_base: 32

articulations:
  - name: "Long"
    short: "long"
    keyswitch: 1
    color: "#4CAF50"

  - name: "Legato"
    short: "leg"
    keyswitch: 20
    color: "#2196F3"

dynamics:
  type: "cc"
  controller: 1

expression:
  type: "cc"
  controller: 11
```

## Validation

```bash
npm install
npm run validate
npm run validate -- --library spitfire/bbc-symphony-orchestra
```

## Pull Request Process

1. Fork the repository
2. Create a branch: `git checkout -b add-library-name`
3. Add your files following the structure above
4. Validate your YAML files
5. Submit a PR
