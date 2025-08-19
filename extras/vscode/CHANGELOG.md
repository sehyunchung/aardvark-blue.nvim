# Change Log

All notable changes to the "Aardvark Blue Theme" extension will be documented in this file.

## [1.0.0] - 2025-01-17

### Added

- Initial release of Aardvark Blue theme for VS Code
- Deep blue background (#102040) with carefully balanced syntax highlighting
- Full TypeScript support with semantic highlighting
- Enhanced React/JSX component distinction
- Complete UI theming for all VS Code elements
- Terminal color integration matching the theme palette
- Support for the following syntax elements:
  - Keywords, functions, variables, strings, numbers, types
  - TypeScript modifiers, interfaces, decorators
  - React component vs HTML tag distinction
  - JSX attributes and expressions
- Semantic highlighting support for modern language servers
- Comprehensive token scope coverage for popular languages

### Features

- **TypeScript Optimized**: Special highlighting for TS-specific syntax
- **React/JSX Enhanced**: Component names distinguished from HTML tags
- **Semantic Tokens**: Full support for VS Code's semantic highlighting
- **Terminal Integration**: ANSI colors matching the theme
- **Complete UI**: All VS Code interface elements themed consistently

## [1.0.2] - 2025-01-17

### Fixed
- Add missing icon reference in package.json for marketplace display
- Icon should now appear correctly on VS Code Marketplace

## [1.0.1] - 2025-01-17

### Fixed
- Improved function name color contrast by changing from bright yellow (#ffe763) to regular yellow (#dbba00)
- Fixed type keyword vs type name distinction - `type`, `interface`, `enum` keywords now properly display in magenta while type names stay cyan
- Better color harmony between variables (white) and functions (yellow) for reduced eye strain

### Changed  
- Function names now use regular yellow (#dbba00) instead of bright yellow for better balance with white variables
- Type declaration keywords explicitly scoped to ensure proper magenta coloring

## [2.0.0] - 2025-08-19

### 🚀 Major Release: Multi-Variant Collection with Platform-Agnostic Architecture

#### Added
- **3 distinct theme variants**: Default, High Contrast, and Minimal
- **Platform-agnostic JSON color management**: All colors defined in structured JSON files
- **Auto-generated consistency**: TypeScript build system with comprehensive validation
- **Cross-platform sync**: Identical color mapping with Neovim version
- **Enhanced TypeScript/React support**: Improved semantic token highlighting
- **Pre-commit validation**: Git hooks ensuring theme consistency

#### New Theme Variants
- **Aardvark Blue** (Default) - Perfect balance for daily coding
- **Aardvark Blue High Contrast** - Enhanced contrast for accessibility 
- **Aardvark Blue Minimal** - Subtle colors for distraction-free coding

#### Enhanced Features
- **Semantic token support**: Intelligent context-aware highlighting
- **Advanced TypeScript highlighting**: Complete support for interfaces, generics, decorators
- **React/JSX mastery**: Component tags, HTML elements, attributes perfectly distinguished
- **50+ language support**: Universal syntax highlighting coverage
- **WCAG-compliant accessibility**: Proper contrast ratios across all variants

#### Technical Improvements
- **JSON-based configuration**: colors/palette.json, colors/semantic.json, etc.
- **Type-safe generation**: Comprehensive error handling with TypeScript
- **Validation system**: JSON schema validation with build-time checks
- **Auto-generated headers**: All theme files include generation timestamps and warnings

#### Breaking Changes
- Package now contains 3 separate theme files instead of 1
- Theme selection requires choosing specific variant from VS Code theme picker

### Migration Guide
After updating, you'll see 3 theme options in VS Code:
1. Select "Aardvark Blue" for the default experience
2. Choose "Aardvark Blue High Contrast" for enhanced accessibility
3. Pick "Aardvark Blue Minimal" for subtle syntax highlighting

## [Unreleased]

### Planned

- Light variant consideration
- Additional language-specific optimizations
- Community feedback integration
