# 🦫 aardvark-blue.nvim

A **professional theme collection** for Neovim and VS Code inspired by Ghostty's Aardvark Blue terminal theme. Features a **platform-agnostic JSON color management system** that generates consistent themes across editors, with **3 VS Code variants** and enhanced TypeScript/JSX support.

> 🎯 **New in v2.0.0**: Platform-agnostic architecture with JSON-based color management, 3 VS Code theme variants, and comprehensive semantic token highlighting!

## ✨ Features

### 🚀 **Multi-Platform Support**
- **🦫 Neovim**: Full-featured colorscheme with TreeSitter and LSP integration
- **💙 VS Code**: 3 distinct variants (Default, High Contrast, Minimal)
- **🎨 Consistent colors**: Identical color mapping across all platforms via JSON configuration

### 🔧 **v2.0.0 Architecture**
- **📁 JSON-based configuration**: All colors defined in structured `colors/*.json` files
- **🤖 Auto-generated themes**: TypeScript build system with validation
- **🔄 Platform-agnostic**: Single source generates Neovim + VS Code themes
- **✅ Quality assured**: Pre-commit hooks with comprehensive validation

### 🎨 **Superior Syntax Highlighting**
- **🌳 Enhanced TreeSitter support** - Full semantic highlighting for modern syntax
- **💙 TypeScript & React mastery** - Complete TS/TSX/JSX with semantic tokens
- **🔧 LSP integration** - Diagnostic and reference highlighting
- **🎯 50+ languages** - Universal syntax highlighting excellence

### ⚙️ **Customization & Quality**
- **📝 Developer-friendly**: Easy color customization via JSON editing
- **🔒 Type-safe generation** - TypeScript with comprehensive error handling
- **📦 Plugin ready** - Compatible with all popular plugin managers
- **♿ Accessibility** - WCAG-compliant contrast ratios

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#102040` | Main background |
| Foreground | `#dddddd` | Main text |
| Cursor | `#007acc` | Cursor color |
| Red | `#aa342e` / `#f05b50` | Errors, constants |
| Green | `#4b8c0f` / `#95dc55` | Strings, success |
| Yellow | `#dbba00` / `#ffe763` | Types, warnings |
| Blue | `#1370d3` / `#60a4ec` | Functions, info |
| Magenta | `#c43ac3` / `#e26be2` | Keywords, statements |
| Cyan | `#008eb0` / `#60b6cb` | Operators, hints |

## 🚀 Language Support

### Enhanced Support

- **TypeScript/JavaScript** - Complete syntax highlighting with semantic tokens
- **React (TSX/JSX)** - Component vs HTML tag distinction, prop highlighting
- **Rust** - Keywords (`pub`, `fn`), types, and lifetime annotations
- **Lua** - Neovim configuration optimized highlighting
- **Python** - Modern syntax with decorator support
- **Go** - Interfaces, structs, and method highlighting

### Key Syntax Highlighting

- **Keywords** (`if`, `else`, `while`, `pub`, `try`) → Magenta `#c43ac3`
- **Functions** (`fn` keyword) → Bright Blue `#60a4ec`
- **Function names** → Yellow `#dbba00`
- **Variables** → White `#dddddd`
- **Strings** → Bright Green `#95dc55`
- **Numbers** → Bright Blue `#60a4ec`
- **Types** → Bright Cyan `#60b6cb`
- **Comments** → Gray `#6a7a8a`

### TypeScript Specific Features

- **Modifiers** (`public`, `private`, `protected`, `readonly`) → Yellow
- **Type keywords** (`interface`, `type`, `enum`, `namespace`) → Magenta
- **Operators** (`keyof`, `satisfies`, `as`, `is`) → Cyan
- **Decorators** (`@Component`, `@Injectable`) → Cyan

### React/JSX Features

- **React Components** → Bright Blue `#60a4ec`
- **HTML Tags** → Blue `#1370d3`
- **JSX Attributes** → Yellow `#ffe763`
- **Tag Delimiters** → White `#dddddd`

## 📦 Installation

## 🦫 Neovim Installation

### Using [lazy.nvim](https://github.com/folke/lazy.nvim)

```lua
{
  "sehyunchung/aardvark-blue.nvim",
  priority = 1000,
  config = function()
    vim.cmd.colorscheme("aardvark-blue")
  end,
}
```

### Using [packer.nvim](https://github.com/wbthomason/packer.nvim)

```lua
use {
  "sehyunchung/aardvark-blue.nvim",
  config = function()
    vim.cmd.colorscheme("aardvark-blue")
  end,
}
```

### Using [vim-plug](https://github.com/junegunn/vim-plug)

```vim
Plug 'sehyunchung/aardvark-blue.nvim'
```

Then in your `init.vim` or `init.lua`:

```lua
colorscheme aardvark-blue
```

## 💙 VS Code Installation

### Via VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search **"Aardvark Blue"**
4. Install the theme extension

### Manual Installation
1. Download `aardvark-blue-theme-2.0.0.vsix` from [releases](https://github.com/sehyunchung/aardvark-blue.nvim/releases)
2. Install via command: `code --install-extension aardvark-blue-theme-2.0.0.vsix`
3. Restart VS Code

### 🎨 Theme Selection
After installation, choose your preferred variant:
- **Aardvark Blue** (default) - Perfect balance for daily coding
- **Aardvark Blue High Contrast** - Enhanced contrast for accessibility  
- **Aardvark Blue Minimal** - Subtle colors for distraction-free coding

Access via: `Preferences → Color Theme` or `Ctrl+K Ctrl+T`

## 🖼️ Preview

The colorscheme provides distinct, readable syntax highlighting across all supported languages:

```typescript
// TypeScript example showcasing syntax highlighting
interface User {
  readonly id: number;        // readonly modifier in yellow
  name: string;              // types in bright cyan
  isActive: boolean;         // booleans in bright red
}

export class UserService {   // class/export keywords in magenta
  private users: User[] = [];  // private modifier in yellow
  
  public async getUser(id: number): Promise<User | null> {
    const user = this.users.find(u => u.id === id);  // functions in yellow
    return user ?? null;     // operators in bright cyan
  }
}
```

```jsx
// React TSX example showing component distinction
const UserCard: React.FC<{user: User}> = ({user}) => {
  return (
    <div className="user-card">        {/* HTML tags in blue */}
      <UserAvatar user={user} />       {/* React components in bright blue */}
      <span>{user.name}</span>         {/* Strings in bright green */}
    </div>
  );
};
```

## ⚙️ Configuration

```lua
require("aardvark-blue").setup({
  transparent = false,           -- Enable transparent background
  terminal_colors = true,        -- Configure terminal colors
  styles = {
    comments = { italic = true },
    keywords = { bold = true },
    functions = {},
    variables = {},
  },
  -- Custom highlight overrides
  on_highlights = function(highlights, colors)
    -- Example: make comments more transparent
    highlights.Comment = { fg = colors.comment, italic = true }
  end,
})

vim.cmd.colorscheme("aardvark-blue")
```

### Configuration Options

- `transparent`: Enable transparent background (default: `false`)
- `terminal_colors`: Set terminal colors to match theme (default: `true`)
- `styles`: Customize text styles for different syntax elements
- `on_highlights`: Function to override or extend highlight groups

## 🚀 Usage

### Basic Usage

```lua
-- Load the colorscheme
vim.cmd.colorscheme("aardvark-blue")
```

### With Configuration

```lua
require("aardvark-blue").setup({
  transparent = true,
  styles = {
    comments = { italic = true },
    keywords = { bold = true },
  },
})
vim.cmd.colorscheme("aardvark-blue")
```

## 🔧 Requirements

- Neovim 0.8+
- True color support (`set termguicolors`)

## 🎯 Plugin & Tool Support

### Core Integrations

- **TreeSitter** - Full semantic highlighting with language-specific optimizations
- **LSP** - Diagnostics, references, semantic tokens, and hover highlights
- **Native Vim** - Complete fallback support for environments without TreeSitter

### Popular Plugin Support

- **Telescope** - Beautiful fuzzy finder integration
- **nvim-tree / neo-tree** - File explorer highlighting
- **GitSigns** - Git diff and blame highlighting  
- **Completion engines** - nvim-cmp, completion-nvim styling
- **Status lines** - lualine, galaxyline compatible colors
- **Terminal** - Full 16-color terminal palette support

### Language Server Features

- **Diagnostic highlighting** - Errors, warnings, info, hints with underlines
- **Reference highlighting** - Symbol references and definitions
- **Semantic tokens** - Enhanced syntax from language servers
- **Hover highlights** - Documentation and signature help styling

## 🖼️ Screenshots

### TypeScript Development
![TypeScript Demo](./assets/typescript-demo.png)

### React/JSX Development  
![React Demo](./assets/react-demo.png)

## 🔧 Development & Customization

### v2.0.0 JSON Color System

This theme uses a **platform-agnostic JSON color management system**. All colors are defined in structured JSON files:

```
colors/
├── palette.json           # Base color definitions
├── semantic.json          # Semantic color mappings  
├── vscode-tokens.json     # Token group definitions
└── color-assignments.json # Swappable semantic roles
```

### Customizing Colors

1. **Edit JSON configuration**:
   ```bash
   # Edit base colors
   vim colors/palette.json
   
   # Edit semantic mappings  
   vim colors/semantic.json
   
   # Modify token assignments
   vim colors/color-assignments.json
   ```

2. **Regenerate themes**:
   ```bash
   npm run generate
   ```

3. **Validate changes**:
   ```bash
   npm run validate
   ```

### Build System

The theme uses a **TypeScript build system** with:
- 🔒 **Type safety** - Comprehensive error handling
- ✅ **Validation** - JSON schema validation  
- 🔄 **Auto-generation** - Consistent cross-platform output
- 🪝 **Git hooks** - Pre-commit validation

```bash
# Available commands
npm run generate        # Generate all themes
npm run validate       # Validate JSON + generated files  
npm run typecheck      # TypeScript compilation check
npm run setup-hooks    # Install git hooks
```

## 🤝 Contributing

Contributions are welcome! The new JSON-based system makes it easy to contribute color improvements:

1. Fork the repository
2. Edit JSON files in `colors/` directory
3. Run `npm run generate` to build themes
4. Test in both Neovim and VS Code
5. Submit a pull request

For bug reports and feature requests, please use [GitHub Issues](https://github.com/sehyunchung/aardvark-blue.nvim/issues).

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

Inspired by the [Aardvark Blue](https://github.com/mbadolato/iTerm2-Color-Schemes) terminal theme from the iTerm2 Color Schemes collection.
