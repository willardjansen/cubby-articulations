# Contributing to Cubby Articulations

Thank you for your interest in contributing! This project thrives on community contributions.

---

## 🎯 Easy Way: Just Upload Your Files

**Don't want to deal with YAML files and pull requests?** No problem!

1. **Zip your expression maps** (.expressionmap, .patchlist, or whatever format you have)
2. **Go to [Discussions → Share Your Maps](https://github.com/willardjansen/cubby-articulations/discussions/categories/share-your-maps)**
3. **Create a new post**, drag & drop your zip, and tell us:
   - What library is this for?
   - Did you create it yourself or where did you get it?
   - What DAW(s) does it work with?

**That's it!** We'll handle the rest and add your maps to the collection with proper credit.

---

> ## STOP! READ THIS FIRST
>
> ### What You CANNOT Contribute
>
> **DO NOT SUBMIT ANY OF THE FOLLOWING:**
>
> - **Paid expression map products** (Art Conductor, Artificial Harmonics packs, etc.)
> - **Commercial map packs** you purchased or downloaded from paid sources
> - **Extracted maps** from commercial software or plugins
> - **Copyrighted content** from library developers (unless explicitly free)
> - **Maps you don't own the rights to share**
>
> ### What You CAN Contribute
>
> - **Your own creations** - Maps you built yourself from scratch
> - **Open source maps** - From GitHub repos with MIT, GPL, Unlicense, or similar
> - **Official free releases** - Maps developers released for free (with attribution)
> - **Modified open-source maps** - Improvements to existing open maps (with credit)
>
> ### Consequences
>
> - Proprietary content will be **removed immediately**
> - Repeat offenders may be **banned from contributing**
> - We take intellectual property seriously
>
> **When in doubt, don't submit it.**

---

## Ways to Contribute

### 1. Submit New Expression Maps

We need maps for hundreds of sample libraries. Check the [Issues](https://github.com/willardjansen/cubby-articulations/issues) for requested libraries.

### 2. Improve Existing Maps

Found an error or missing articulation? Submit a fix!

### 3. Review Submissions

Help validate that submitted maps work correctly.

### 4. Report Issues

Found a bug or have a suggestion? Open an issue.

---

## Submitting Expression Maps

### File Structure

Each library should have its own folder:

```
libraries/[developer]/[library-name]/
├── meta.yaml              # Required: Library metadata
├── [instrument].yaml      # Source definitions (one per instrument/section)
└── exports/               # Generated DAW-specific files
    ├── cubase/
    ├── logic/
    └── studio-one/
```

### meta.yaml Format

```yaml
name: "BBC Symphony Orchestra"
developer: "Spitfire Audio"
version: "1.2.0"
category: "orchestral"
website: "https://www.spitfireaudio.com/bbc-symphony-orchestra"

# Attribution (REQUIRED)
attribution:
  author: "Your Name"
  source: "Original creation"  # or URL to source
  license: "MIT"

  # IMPORTANT: Confirm this is not proprietary content
  confirmation: "I created this from scratch / This is from an open-source project"

# Or if derived from another source:
attribution:
  original_author: "Original Author Name"
  original_source: "https://github.com/..."
  original_license: "MIT"  # Must be an open license!
  modifications: "Added missing articulations, fixed key switches"
  modified_by: "Your Name"

# Supported DAWs
exports:
  - cubase
  - logic
  - studio-one

# Last updated
updated: "2025-01-28"

# Tags for search
tags:
  - strings
  - brass
  - woodwinds
  - percussion
  - full-orchestra
```

### Expression Map YAML Format

```yaml
# libraries/spitfire/bbc-symphony-orchestra/strings-violins-1.yaml

instrument: "Violins 1"
patch: "BBCSO Violins 1"
channel: 1

# Key switch configuration
keyswitch_type: "uacc"  # or "keyswitch", "program_change", "cc"
keyswitch_base: 32      # Base MIDI note for key switches (if applicable)

articulations:
  - name: "Long"
    short: "long"
    keyswitch: 1        # UACC value or key switch offset
    color: "#4CAF50"

  - name: "Legato"
    short: "leg"
    keyswitch: 20
    color: "#2196F3"

  - name: "Spiccato"
    short: "spic"
    keyswitch: 42
    color: "#FF9800"

  - name: "Staccato"
    short: "stac"
    keyswitch: 40
    color: "#FF5722"

  - name: "Pizzicato"
    short: "pizz"
    keyswitch: 56
    color: "#9C27B0"

  - name: "Tremolo"
    short: "trem"
    keyswitch: 11
    color: "#00BCD4"

  - name: "Trills"
    short: "tr"
    keyswitch: 70
    color: "#E91E63"

# Dynamic layers (optional)
dynamics:
  type: "cc"
  controller: 1  # Mod wheel

# Expression (optional)
expression:
  type: "cc"
  controller: 11
```

---

## Pull Request Process

1. **Fork** the repository
2. **Create a branch** for your changes: `git checkout -b add-library-name`
3. **Add your files** following the structure above
4. **Validate** your YAML files (see below)
5. **Submit a PR** with a clear description

### PR Description Template

```markdown
## Library Added/Updated

- **Developer**: Spitfire Audio
- **Library**: BBC Symphony Orchestra
- **Instruments**: Violins 1, Violins 2, Violas, Cellos, Basses

## Source & License Confirmation

> **REQUIRED: Check all that apply**

- [ ] I created these maps myself from scratch
- [ ] These maps are from an open-source project (provide URL)
- [ ] These are official free maps from the developer
- [ ] I have the right to share these under an open license

> **CONFIRM: These are NOT from a paid product**

- [ ] I confirm these maps are NOT from Art Conductor, Artificial Harmonics, or any other paid product
- [ ] I confirm I did NOT extract these from commercial software

## Attribution

- **Original Author**: [Name or "Self"]
- **Source**: [URL or "Original creation"]
- **License**: [MIT/GPL/Unlicense/etc.]

## Tested With

- [ ] Cubase 13
- [ ] Logic Pro 11
- [ ] Studio One 6

## Checklist

- [ ] meta.yaml includes proper attribution
- [ ] YAML files validate against schema
- [ ] Key switches tested and working
- [ ] All articulations included
```

---

## Validation

Before submitting, validate your YAML files:

```bash
# Install dependencies
npm install

# Validate all files
npm run validate

# Validate specific library
npm run validate -- --library spitfire/bbc-symphony-orchestra
```

---

## Code of Conduct

- Be respectful and constructive
- **NEVER submit proprietary or paid content**
- Give proper attribution to original authors
- Help others learn and improve

---

## Questions?

- Open a [Discussion](https://github.com/willardjansen/cubby-articulations/discussions)
- Ask on [VI-Control](https://vi-control.net)

Thank you for contributing!
