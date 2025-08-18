# 🦫 Aardvark Blue Theme for VS Code

A deep blue color theme for Visual Studio Code inspired by Ghostty's Aardvark Blue theme. Features carefully balanced syntax highlighting optimized for TypeScript, React, and modern web development.

## ✨ Features

- 🎨 **Deep blue background** (#102040) for comfortable coding sessions
- 🌟 **Optimized for TypeScript & React** - Enhanced syntax highlighting for modern web development
- 🎯 **Semantic highlighting** - Full support for VS Code's semantic token provider
- 💙 **Component distinction** - React components vs HTML tags use different blues
- 🔧 **Comprehensive coverage** - All UI elements themed consistently
- 📱 **Terminal integration** - Terminal colors match the theme palette

## 🎨 Color Philosophy

The theme uses a carefully curated palette based on Ghostty's Aardvark Blue:

- **Keywords** (`if`, `else`, `while`, `try`) → Magenta `#c43ac3`
- **Functions** → Yellow `#dbba00`
- **Strings** → Bright Green `#95dc55`
- **Numbers** → Bright Blue `#60a4ec`
- **Types** → Bright Cyan `#60b6cb`
- **Comments** → Gray `#6a7a8a` (italic)
- **Variables** → White `#dddddd`

### TypeScript Specific

- **Modifiers** (`public`, `private`, `protected`) → Yellow `#dbba00`
- **Type keywords** (`interface`, `type`, `enum`) → Magenta `#c43ac3`
- **Type operators** (`keyof`, `typeof`, `as`) → Cyan `#008eb0`
- **Decorators** (`@Component`) → Cyan `#008eb0`

### React/JSX Specific

- **React Components** (`<Button>`, `<MyComponent>`) → Bright Blue `#60a4ec`
- **HTML Tags** (`<div>`, `<span>`) → Blue `#1370d3`
- **JSX Attributes** (`className`, `onClick`) → Yellow `#ffe763`

## 📦 Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Aardvark Blue Theme"
4. Click Install
5. Go to File > Preferences > Color Theme and select "Aardvark Blue"

**Or install directly from the marketplace:** [Aardvark Blue Theme](https://marketplace.visualstudio.com/items?itemName=SehyunChung.aardvark-blue-theme)

### Manual Installation

1. Download the `.vsix` file from the [releases page](https://github.com/sehyunchung/aardvark-blue.nvim/releases)
2. Open VS Code
3. Run `Extensions: Install from VSIX...` from the Command Palette
4. Select the downloaded `.vsix` file

## 🖼️ Screenshots

### TypeScript

![TypeScript Example](../../assets/typescript-demo.png)

Features highlighted in this example:
- **Interface keywords** (`interface`) in magenta
- **Access modifiers** (`readonly`, `private`, `public`) in yellow  
- **Type annotations** (`User`, `number`, `string`) in bright cyan
- **Class keywords** (`class`, `constructor`) in magenta
- **Function names** (`createUser`, `validateUser`) in yellow
- **String literals** in bright green
- **Async/await** keywords in magenta

### React/JSX

![React TSX Example](../../assets/react-demo.png)

Features highlighted in this example:
- **React Components** (`UserCard`, custom components) in bright blue
- **HTML Tags** (`div`, `header`, `span`) in blue
- **JSX Attributes** (`className`, `onClick`, `data-testid`) in bright yellow
- **React Hooks** (`useState`, `useCallback`, `useEffect`) in yellow
- **TypeScript generics** and interfaces
- **Template literals** and expressions in JSX

### Additional Examples

```typescript
// Interface and type definitions
interface User {
  readonly id: number;        // readonly modifier in yellow
  name: string;              // types in bright cyan
  isActive: boolean;         // booleans in bright red
}

export class UserService {   // export/class keywords in magenta
  private users: User[] = [];  // private modifier in yellow
  
  public async getUser(id: number): Promise<User | null> {
    const user = this.users.find(u => u.id === id);  // functions in yellow
    return user ?? null;     // operators in bright cyan
  }
}
```

```jsx
// React component showing color distinction
const UserCard: React.FC<{user: User}> = ({user}) => {
  return (
    <div className="user-card">        {/* HTML tags in blue */}
      <UserAvatar user={user} />       {/* React components in bright blue */}
      <span>{user.name}</span>         {/* Strings in bright green */}
    </div>
  );
};
```

## 🔧 Configuration

### Enable Semantic Highlighting

For the best experience with TypeScript and other languages, enable semantic highlighting in your VS Code settings:

```json
{
  "editor.semanticHighlighting.enabled": true
}
```

### Font Recommendations

The theme works great with these programming fonts:

- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [Fira Code](https://github.com/tonsky/FiraCode)
- [Cascadia Code](https://github.com/microsoft/cascadia-code)

## 🚀 Related Projects

This theme is part of the **Aardvark Blue** ecosystem:

- **[aardvark-blue.nvim](https://github.com/sehyunchung/aardvark-blue.nvim)** - The original Neovim colorscheme
- **Cursor Theme** - Coming soon!

## 🤝 Contributing

Found an issue or have a suggestion? Please [open an issue](https://github.com/sehyunchung/aardvark-blue.nvim/issues) on GitHub.

### Development

1. Clone the repository
2. Open the `extras/vscode` folder in VS Code
3. Press F5 to launch the Extension Development Host
4. Select "Aardvark Blue" theme in the new window

## 📄 License

MIT License - see [LICENSE](../../LICENSE) file for details.

## 🙏 Credits

- Inspired by the [Aardvark Blue](https://github.com/mbadolato/iTerm2-Color-Schemes) terminal theme
- Originally created for [Ghostty](https://ghostty.org/) terminal
- Color palette carefully adapted from the Neovim version
