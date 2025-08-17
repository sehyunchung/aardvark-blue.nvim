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

## [1.0.1] - 2025-01-17

### Fixed
- Improved function name color contrast by changing from bright yellow (#ffe763) to regular yellow (#dbba00)
- Fixed type keyword vs type name distinction - `type`, `interface`, `enum` keywords now properly display in magenta while type names stay cyan
- Better color harmony between variables (white) and functions (yellow) for reduced eye strain

### Changed  
- Function names now use regular yellow (#dbba00) instead of bright yellow for better balance with white variables
- Type declaration keywords explicitly scoped to ensure proper magenta coloring

## [Unreleased]

### Planned

- Light variant consideration
- Additional language-specific optimizations
- Community feedback integration
