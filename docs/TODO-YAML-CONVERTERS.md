# TODO: YAML Converters for Expression Map Formats

Roadmap for building converters that transform DAW-specific expression map files into our unified YAML format.

---

## Overview

Users upload files in various formats. We need converters to extract articulation data and generate our YAML schema.

```
User uploads .expressionmap/.plist/.keyswitch/.reabank
                    ↓
              Converter
                    ↓
            meta.yaml + instrument.yaml
                    ↓
         Ready for repo / exports
```

---

## 1. Cubase Expression Maps (.expressionmap)

### File Format
- XML-based format
- Located in: `~/Documents/Steinberg/Cubase/Expression Maps/`

### Key Data to Extract
- `<string name="name">` - Articulation name
- `<int name="status">` - MIDI status (note on, CC, etc.)
- `<int name="data1">` - MIDI data 1 (note number, CC number)
- `<int name="data2">` - MIDI data 2 (velocity, CC value)
- `<int name="art1">`, `<int name="art2">` - Articulation slot assignments
- `<obj class="PSoundSlot">` - Sound slot definitions
- `<int name="color">` - Color index
- `<string name="description">` - Slot description

### Structure
```xml
<InstrumentMap>
  <string name="name" value="Library Name"/>
  <list name="slots" type="obj">
    <obj class="PSoundSlot">
      <string name="name" value="Long"/>
      <int name="color" value="0"/>
      <list name="sv" type="obj">
        <!-- Output mappings (keyswitches, CCs) -->
      </list>
    </obj>
  </list>
</InstrumentMap>
```

### Converter Tasks
- [ ] Parse XML structure
- [ ] Extract sound slots and their names
- [ ] Map color indices to hex colors
- [ ] Extract MIDI output mappings (keyswitches, CCs, program changes)
- [ ] Determine keyswitch type (note, CC, program change)
- [ ] Handle remote keys (trigger keys vs keyswitches)
- [ ] Generate meta.yaml with library name
- [ ] Generate instrument.yaml with articulations

---

## 2. Logic Pro Articulation Sets (.plist)

### File Format
- Binary or XML plist (Property List)
- Located in: `~/Music/Audio Music Apps/Articulation Settings/`

### Key Data to Extract
- Articulation names
- Articulation IDs
- Output mappings (note, CC, program change)
- Switch type (momentary, latching)
- Icon/symbol assignments
- Group assignments

### Structure (XML plist)
```xml
<plist version="1.0">
<dict>
  <key>Articulations</key>
  <array>
    <dict>
      <key>ArticulationName</key>
      <string>Long</string>
      <key>OutputType</key>
      <integer>0</integer>
      <key>OutputValue</key>
      <integer>1</integer>
      <!-- ... -->
    </dict>
  </array>
</dict>
</plist>
```

### Converter Tasks
- [ ] Handle both binary and XML plist formats (use `plutil` to convert)
- [ ] Parse articulation array
- [ ] Extract names and output mappings
- [ ] Map output types to our keyswitch_type enum
- [ ] Handle articulation groups
- [ ] Extract icon/symbol info if present
- [ ] Generate YAML files

---

## 3. Studio One Sound Variations (.keyswitch)

### File Format
- XML-based
- Located in: `~/Documents/Studio One/Sound Variations/`

### Key Data to Extract
- Sound variation names
- Keyswitch notes or CC values
- Color assignments
- Bank/program info

### Structure
```xml
<SoundVariation>
  <Variation name="Long" key="C0" color="#4CAF50"/>
  <Variation name="Staccato" key="C#0" color="#FF5722"/>
</SoundVariation>
```

### Converter Tasks
- [ ] Parse XML structure
- [ ] Extract variation names and trigger assignments
- [ ] Convert note names (C0, C#0) to MIDI note numbers
- [ ] Extract color values
- [ ] Handle CC-based variations
- [ ] Generate YAML files

---

## 4. Reaticulate / Reabank (.reabank)

### File Format
- Plain text, INI-like format
- Used by Reaticulate extension for Reaper

### Key Data to Extract
- Bank names
- Program names (articulations)
- MIDI program/bank select values
- Output mappings
- CC values

### Structure
```
//! g="Spitfire/BBC Symphony Orchestra" n="Strings - Violins I"
//! m="Bank select (CC0/CC32)"
Bank 1 1 BBC SO Violins I
1 long
2 legato
20 spiccato
40 staccato
56 pizzicato
```

### Converter Tasks
- [ ] Parse bank definitions (`Bank X Y Name`)
- [ ] Extract metadata from comments (`//! g=`, `//! n=`, `//! m=`)
- [ ] Parse program entries (number + name)
- [ ] Handle output mapping modes (CC, program change, bank select)
- [ ] Map to our YAML structure
- [ ] Handle multi-bank setups
- [ ] Generate YAML files

---

## Implementation Priority

1. **Cubase (.expressionmap)** - Most common, well-documented format
2. **Logic (.plist)** - Second most common, standard Apple format
3. **Reaticulate (.reabank)** - Simple text format, easy to parse
4. **Studio One (.keyswitch)** - Less common, XML-based

---

## Shared Converter Logic

### Input
- Uploaded file (any supported format)
- Optional: library name, developer name (if not in file)

### Output
- `meta.yaml` - Library metadata
- `[instrument].yaml` - Articulation definitions for each instrument

### Common Mappings Needed
- Note names ↔ MIDI numbers (C-2 = 0, C3 = 60, etc.)
- Color indices ↔ Hex colors
- Keyswitch types normalization (note, cc, program_change, uacc)

---

## Automation Ideas

### Option A: CLI Tool
```bash
npx cubby-convert input.expressionmap --output ./libraries/spitfire/bbcso/
```

### Option B: GitHub Action
- Trigger on new Discussion posts
- Download attached zip
- Run converter
- Create draft PR with generated YAML

### Option C: Web Upload
- Drag & drop on website
- Convert in browser (or server)
- Preview YAML before submission

---

## Notes

- Some formats may have incomplete data (missing colors, descriptions)
- Need graceful handling of unknown/custom articulation types
- Consider validation against our schema after conversion
- May need manual review for complex setups (multiple outputs per articulation)
