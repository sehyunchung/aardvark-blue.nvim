# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

aardvark-blue.nvim is a Neovim colorscheme plugin inspired by the Aardvark Blue theme from Ghostty terminal. It provides optimal readability with a deep blue background and balanced syntax highlighting.

## File Structure

```bash
aardvark-blue.nvim/
├── colors/                          # JSON color management (NEW v2.0.0)
│   ├── palette.json                 # Base color definitions
│   ├── semantic.json                # Semantic color mappings
│   ├── vscode-tokens.json           # VS Code token groupings
│   └── color-assignments.json      # Swappable semantic roles
├── build/                           # TypeScript build system (NEW v2.0.0)
│   ├── generate.ts                  # Main theme generator
│   ├── validate.ts                  # JSON configuration validator
│   └── validate-generated.ts       # Generated file validator
├── colors/
│   └── aardvark-blue.lua           # Vim colorscheme entry point
├── lua/aardvark-blue/              # Generated Neovim files (AUTO-GENERATED)
│   ├── init.lua                    # Main colorscheme module
│   ├── palette.lua                 # Color palette (generated from JSON)
│   ├── highlights.lua              # Highlight groups (generated from JSON)
│   └── config.lua                  # Configuration options
├── doc/
│   └── aardvark-blue.txt           # Vim help documentation
├── extras/
│   └── vscode/                     # VS Code theme collection (vscode-v2.0.0)
│       ├── themes/                 # Generated VS Code themes
│       │   ├── aardvark-blue-color-theme.json          # Default variant
│       │   ├── aardvark-blue-high_contrast-color-theme.json # High contrast
│       │   └── aardvark-blue-minimal-color-theme.json  # Minimal variant
│       ├── package.json            # VS Code extension manifest
│       └── *.md                    # VS Code documentation
├── scripts/                        # Development automation (NEW v2.0.0)
│   └── setup-git-hooks.sh         # Git hooks installer
├── .githooks/                      # Pre-commit validation (NEW v2.0.0)
│   └── pre-commit                  # Automatic validation and generation
└── backup/                         # Manual file backups (NEW v2.0.0)
    └── lua/aardvark-blue/         # Pre-v2.0.0 manual files
```

## Core Components (v2.0.0 Architecture)

### JSON Color Management System

**colors/palette.json**: Base color definitions from Ghostty Aardvark Blue theme
- Exact color values from original theme
- Structured sections: base, ansi, bright, ui
- Semantic color definitions (error, warning, info, hint)

**colors/semantic.json**: Semantic color mappings
- Maps logical roles to palette colors (syntax.keyword → ansi.magenta)
- Platform-agnostic color assignments
- Hierarchical organization (syntax, typescript, jsx, editor, etc.)

**colors/vscode-tokens.json**: VS Code token groupings
- Groups VS Code scopes by semantic meaning
- Enables swappable color assignments
- Supports multiple theme variants

**colors/color-assignments.json**: Swappable semantic roles
- Maps token groups to semantic roles (callable → accent)
- Enables easy theme variants (high_contrast, minimal)
- Maintains consistency across all platforms

### Generated Components (AUTO-GENERATED - DO NOT EDIT)

**lua/aardvark-blue/palette.lua**: Generated Neovim color palette
- Auto-generated from colors/palette.json
- Includes computed semantic colors
- Contains auto-generated header warning

**lua/aardvark-blue/highlights.lua**: Generated highlight definitions
- **Ghostty 1:1 Matching**: Identical color distribution as terminal
- TreeSitter support for modern syntax highlighting
- LSP integration (diagnostics, reference highlights)
- Plugin compatibility (telescope, nvim-tree, etc.)
- Generated from colors/semantic.json mappings

### Build System Components

**build/generate.ts**: TypeScript theme generator
- Type-safe color resolution and validation
- Multi-platform theme generation (Neovim + VS Code)
- Comprehensive error handling with detailed messages
- Supports multiple VS Code theme variants

**build/validate.ts**: JSON configuration validator
- Validates all JSON color configuration files
- Checks color reference integrity
- Ensures consistent structure across files

**build/validate-generated.ts**: Generated file validator  
- Validates auto-generated theme files
- Ensures proper headers and structure
- Checks for completeness and accuracy

### Special Keyword Handling

- `pub`, `if`, `else`, `while`, `try`: Magenta `#c43ac3`
- `fn`: Bright blue `#60a4ec`
- Function names: Yellow `#dbba00`
- Variable names: White `#dddddd`
- Strings: Bright green `#95dc55`
- Numbers: Bright blue `#60a4ec`
- Types: Bright cyan `#60b6cb`

### TypeScript/TSX Specific Highlighting

- **TypeScript Modifiers**: `public`, `private`, `protected`, `readonly` - Yellow `#dbba00`
- **TypeScript Keywords**: `interface`, `type`, `enum`, `namespace` - Magenta `#c43ac3`
- **TypeScript Operators**: `keyof`, `satisfies`, `as`, `is` - Cyan `#008eb0`
- **Decorators**: `@Component`, `@Injectable` - Cyan `#008eb0`
- **React Components**: JSX/TSX component tags - Bright blue `#60a4ec`
- **HTML Tags in JSX**: Built-in HTML tags - Blue `#1370d3`
- **JSX Attributes**: Component and HTML attributes - Bright Yellow `#ffe763`
- **JSX Delimiters**: Tag opening/closing brackets - White `#dddddd`

### TreeSitter Group Implementation

The colorscheme leverages specific TreeSitter capture groups for precise syntax highlighting:

**Core Language Support:**

- `@keyword.function` → Bright blue `#60a4ec` (for `fn` keyword)
- `@keyword.operator` → Magenta `#c43ac3` (for `pub` keyword)
- `@keyword.conditional` → Magenta `#c43ac3` (for `if`, `else`)
- `@keyword.repeat` → Magenta `#c43ac3` (for `while`, `for`)
- `@keyword.exception` → Magenta `#c43ac3` (for `try`, `catch`)

**TypeScript Extensions:**

- `@keyword.modifier` → Yellow `#dbba00` (for access modifiers)
- `@keyword.type` → Magenta `#c43ac3` (for type declaration keywords)
- `@keyword.operator` → Cyan `#008eb0` (for type operators)
- `@attribute` → Cyan `#008eb0` (for decorators)

**JSX/TSX Extensions:**

- `@tag.tsx` → Bright blue `#60a4ec` (for React components)
- `@tag.builtin.tsx` → Blue `#1370d3` (for HTML elements)
- `@tag.attribute.tsx` → Bright Yellow `#ffe763` (for JSX attributes)
- `@tag.delimiter.tsx` → White `#bebebe` (for JSX brackets)

## Development Guidelines (v2.0.0)

### 🚨 **IMPORTANT: Auto-Generated Files**

**NEVER directly edit files in `lua/aardvark-blue/` or `extras/vscode/themes/`** - they are auto-generated and will be overwritten!

### When Changing Colors

1. **Edit JSON configuration**: Modify `colors/palette.json` for base colors
2. **Edit semantic mappings**: Update `colors/semantic.json` for color roles
3. **Regenerate themes**: Run `npm run generate` to update all platforms
4. **Validate changes**: Run `npm run validate` to ensure correctness
5. **Compare with Ghostty**: Ensure terminal consistency is maintained

### When Adding New Highlight Groups

1. **Add to semantic.json**: Define new semantic color mappings
2. **Update generator**: Modify `build/generate.ts` if new categories are needed
3. **Test both platforms**: Verify in both Neovim and VS Code
4. **Document purpose**: Add comments in JSON files explaining new mappings

### When Adding Configuration Options

1. **Modify config.lua**: Add new options (this file is manually maintained)
2. **Update generator**: Ensure `build/generate.ts` respects new options
3. **Update documentation**: README.md and Vim help documentation
4. **Regenerate**: Always run `npm run generate` after changes

### v2.0.0 Build System Workflow

```bash
# 1. Edit JSON configuration files
vim colors/palette.json        # Base colors
vim colors/semantic.json       # Semantic mappings
vim colors/color-assignments.json # Theme variants

# 2. Regenerate all themes
npm run generate               # Generate Neovim + VS Code themes

# 3. Validate everything
npm run validate              # Validate JSON + generated files
npm run typecheck            # TypeScript compilation check

# 4. Test changes
# - Test in Neovim with local directory
# - Test VS Code themes via F5 (Extension Development Host)
# - Compare with Ghostty terminal

# 5. Commit (automatic validation via pre-commit hooks)
git add colors/ lua/ extras/
git commit -m "feat: your changes"
```

## Testing Guide

### Local Testing

```lua
-- In Neovim configuration
{
  dir = "~/personal/aardvark-blue.nvim",
  priority = 1000,
  config = function()
    vim.cmd.colorscheme("aardvark-blue")
  end,
}
```

### Color Verification (v2.0.0)

1. **JSON Configuration**: Validate via `npm run validate:json`
2. **Generated Files**: Verify with `npm run validate:generated`  
3. **Multi-platform testing**:
   - Test Neovim with various language files (TypeScript, React, Rust, etc.)
   - Test all 3 VS Code variants (Default, High Contrast, Minimal)
   - Compare side-by-side with Ghostty terminal
4. **Feature verification**:
   - TreeSitter and default syntax highlighting
   - LSP features (errors, warnings, references, semantic tokens)
   - TypeScript-specific syntax (interfaces, generics, decorators) 
   - JSX/TSX component rendering and attribute highlighting
5. **Cross-platform consistency**: Ensure identical colors across Neovim and VS Code

## Plugin Distribution

### GitHub Release Preparation

**Versioning Scheme:**

- Neovim plugin: `nvim-v2.0.0`, `nvim-v2.1.0`, etc.
- VS Code theme: `vscode-v2.0.0`, `vscode-v2.1.0`, etc.

**v2.0.0 Release Process:**

1. **Validate and generate**: `npm run validate && npm run generate`
2. **Update VS Code package**: Update `extras/vscode/package.json` version
3. **Build VS Code extension**: `cd extras/vscode && npm run package`
4. **Create prefixed tags**: `git tag nvim-v2.0.0 && git tag vscode-v2.0.0`
5. **Push with tags**: `git push origin main --tags`
6. **Create GitHub releases** with appropriate assets:
   - Neovim: Platform-agnostic JSON system features
   - VS Code: Include `.vsix` file with all 3 variants
7. **Update documentation**: Ensure all docs reflect v2.0.0 features

### Plugin Manager Support

- lazy.nvim ✅
- packer.nvim ✅
- vim-plug ✅
- Default Vim packages ✅

## Future Plans

- [x] Add VS Code theme (extras/vscode/) - **Completed vscode-v1.0.1**
- [x] TypeScript and JSX/TSX syntax highlighting support
- [ ] Additional language-specific highlights (Go, Python, C++, etc.)
- [ ] Consider light mode variant
- [ ] Incorporate community feedback

## Contribution Guide

1. Always compare changes with Ghostty original
2. Consider both TreeSitter and default syntax highlighting
3. Test TypeScript/TSX files to ensure language-specific highlights work correctly
4. Documentation updates are mandatory
5. Specify reason for changes in commit messages
