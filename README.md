# 🦫 aardvark-blue.nvim

A modern Neovim colorscheme inspired by the Aardvark Blue terminal theme. Features a deep blue background with carefully balanced syntax highlighting for optimal readability and reduced eye strain. Enhanced with specialized TypeScript/React support and comprehensive TreeSitter integration.

## ✨ Features

- 🎨 **Beautiful color palette** - Deep blue background (#102040) with vibrant accent colors
- 🌳 **Enhanced TreeSitter support** - Full semantic highlighting for modern syntax
- 💙 **TypeScript & React optimized** - Specialized highlighting for TS/TSX/JSX with component distinction
- 🔧 **LSP integration** - Diagnostic and reference highlighting with semantic tokens
- ⚙️ **Customizable** - Configure transparency, styles, and terminal colors
- 📦 **Plugin ready** - Easy installation with popular plugin managers
- 🎯 **Language-aware** - Optimized syntax highlighting for multiple programming languages

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
- **Function names** → Bright Yellow `#ffe763`
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
    const user = this.users.find(u => u.id === id);  // functions in bright yellow
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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

Inspired by the [Aardvark Blue](https://github.com/mbadolato/iTerm2-Color-Schemes) terminal theme from the iTerm2 Color Schemes collection.