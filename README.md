# 🦫 aardvark-blue.nvim

A modern Neovim colorscheme inspired by the Aardvark Blue terminal theme. Features a deep blue background with carefully balanced syntax highlighting for optimal readability and reduced eye strain.

## ✨ Features

- 🎨 **Beautiful color palette** - Deep blue background (#102040) with vibrant accent colors
- 🌳 **TreeSitter support** - Full semantic highlighting for modern syntax
- 🔧 **LSP integration** - Diagnostic and reference highlighting
- ⚙️ **Customizable** - Configure transparency, styles, and terminal colors
- 📦 **Plugin ready** - Easy installation with popular plugin managers

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

## 🎯 Supported Plugins

The colorscheme includes highlight groups for popular Neovim plugins:

- TreeSitter
- LSP (diagnostics, references)
- Telescope
- nvim-tree
- GitSigns
- And many more...

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

Inspired by the [Aardvark Blue](https://github.com/mbadolato/iTerm2-Color-Schemes) terminal theme from the iTerm2 Color Schemes collection.