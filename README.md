# Cubby Articulations

**The open-source articulation map database for composers.**

*Never build an expression map from scratch again.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

> ## IMPORTANT LEGAL DISCLAIMER
>
> **DO NOT SUBMIT COMMERCIAL OR PROPRIETARY EXPRESSION MAPS**
>
> This repository is for **freely shareable, community-created content only**.
>
> **You MAY NOT contribute:**
> - Expression maps from paid products (e.g., Art Conductor, purchased map packs)
> - Maps extracted from commercial software without permission
> - Any content you don't have the right to share under an open license
> - Copyrighted material from library developers unless explicitly released as free
>
> **You MAY contribute:**
> - Maps you created yourself from scratch
> - Maps released under open source licenses (MIT, GPL, Unlicense, etc.)
> - Official free maps from library developers (with attribution)
> - Modifications of openly-licensed maps (with proper credit)
>
> **Violations will be removed immediately.** If you believe content here infringes on your rights, please [open an issue](https://github.com/willardjansen/cubby-articulations/issues).

---

## What is this?

Cubby Articulations is a community-driven, searchable database of expression maps and articulation sets for all major DAWs and sample libraries. Quality-controlled, version-tracked, and instantly downloadable.

### Supported DAWs

| DAW | Name | Format | Status |
|-----|------|--------|--------|
| Cubase / Nuendo | Expression Maps | `.expressionmap` | Active |
| Dorico | Expression Maps | `.doricolib` | Planned |
| Logic Pro | Articulation Sets | `.plist` | Active |
| Studio One | Sound Variations | `.keyswitch` | Planned |
| Reaper | Reabanks (Reaticulate) | `.reabank` | Planned |
| Digital Performer | Articulation Maps | `.artmap` | Planned |
| Cakewalk | Articulation Maps | `.artmap` | Planned |

### Supported Libraries

We're building coverage for all major sample library developers:

- **Spitfire Audio** - BBC Symphony Orchestra, Albion, Abbey Road, LABS
- **Orchestral Tools** - Berlin Series, Metropolis Ark, Tallinn
- **Vienna Symphonic Library (VSL)** - Synchron, VI Series, Big Bang Orchestra
- **8DIO** - Century Series, Adagio, Anthology
- **Cinematic Studio Series** - Strings, Brass, Woodwinds, Piano
- **Native Instruments** - Symphony Series, Action Strings
- **EastWest** - Hollywood Orchestra, Opus
- **Cinesamples** - CineStrings, CineBrass, CineWinds
- **Audio Imperia** - Nucleus, Jaeger, Areia
- **Sonokinetic** - Orchestral series, Woodwinds
- And many more...

---

## Quick Start

### Download Maps

1. Browse the `/libraries` folder
2. Find your library (e.g., `spitfire/bbc-symphony-orchestra/`)
3. Download from the `exports/` folder for your DAW

### Install

**Cubase/Nuendo:**
```
Copy .expressionmap files to:
[User]/Documents/Steinberg/Cubase/Expression Maps/
```

**Logic Pro:**
```
Copy .plist files to:
[User]/Music/Audio Music Apps/Articulation Settings/
```

**Studio One:**
```
Copy .keyswitch files to:
[User]/Documents/Studio One/Sound Variations/
```

---

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and development status.

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute

1. **Submit new maps** - Create maps for libraries we don't have yet
2. **Improve existing maps** - Fix errors, add missing articulations
3. **Review submissions** - Help validate community contributions
4. **Report issues** - Found a bug? Let us know

### Don't Know Git?

No problem! You can also contribute by:
1. [Open an issue](https://github.com/willardjansen/cubby-articulations/issues/new)
2. Attach your expression map files
3. Tell us which library and DAW it's for
4. We'll add it with credit to you

---

## Project Structure

```
cubby-articulations/
├── libraries/              # All expression maps organized by developer
│   ├── spitfire/
│   │   ├── bbc-symphony-orchestra/
│   │   │   ├── meta.yaml           # Library metadata
│   │   │   ├── strings-violins-1.yaml
│   │   │   └── exports/
│   │   │       ├── cubase/
│   │   │       ├── logic/
│   │   │       └── studio-one/
│   │   └── albion-one/
│   ├── orchestral-tools/
│   ├── vsl/
│   └── ...
├── schema/                 # JSON Schema for validation
├── tools/                  # Conversion and validation scripts
└── webapp/                 # Search UI (coming soon)
```

---

## Attribution

This project aggregates and builds upon work from many contributors. See [CREDITS.md](CREDITS.md) for full attribution.

**Key sources include:**
- [jaredthirsk/cubase-expression-maps](https://github.com/jaredthirsk/cubase-expression-maps) (Unlicense)
- [neugens/logic-articulations-settings](https://github.com/neugens/logic-articulations-settings) (MIT)
- [nobodo/logic-pro-x-articulation-sets](https://github.com/nobodo/logic-pro-x-articulation-sets) (GPL-3.0)
- [r-koubou/ArticulationMappingFiles](https://github.com/r-koubou/ArticulationMappingFiles)
- [alvsvartr/Cubase-Expression-Maps](https://github.com/alvsvartr/Cubase-Expression-Maps)
- Official maps from Spitfire Audio, VSL, Orchestral Tools

---

## Ecosystem

Cubby Articulations is part of the [Cubby Composer](https://cubbycomposer.com) suite:

- **Cubby Remote** - DAW remote control for composers
- **Cubby Score** - Score analysis and conversion tools
- **Cubby Project** - Project management for composers

---

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

Individual expression maps may have their own licenses as noted in their `meta.yaml` files.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/willardjansen/cubby-articulations/issues)
- **Discussions**: [GitHub Discussions](https://github.com/willardjansen/cubby-articulations/discussions)
- **Community**: [VI-Control Forums](https://vi-control.net)

---

Made with love for the composer community.
