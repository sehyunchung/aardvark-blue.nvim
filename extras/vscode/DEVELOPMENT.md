# VS Code Theme Development Guide

This document provides instructions for developing, testing, and publishing the Aardvark Blue VS Code theme.

## 🛠️ Local Development

### Prerequisites

1. **Node.js** (v16 or higher)
2. **VS Code** (latest version)
3. **Visual Studio Code Extension Manager** (`vsce`)

### Setup

```bash
# Navigate to the VS Code extension directory
cd extras/vscode

# Install vsce globally
npm install -g @vscode/vsce

# Install dependencies (if any)
npm install
```

### Testing Locally

1. Open the `extras/vscode` folder in VS Code
2. Press `F5` to launch the Extension Development Host
3. In the new VS Code window:
   - Open Command Palette (`Ctrl/Cmd + Shift + P`)
   - Type "Preferences: Color Theme"
   - Select "Aardvark Blue"
4. Test with various file types (TypeScript, React, etc.)

### Making Changes

1. Edit `themes/aardvark-blue-color-theme.json`
2. Reload the Extension Development Host window (`Ctrl/Cmd + R`)
3. Changes should be applied immediately

## 📦 Packaging

### Create VSIX Package

```bash
cd extras/vscode
vsce package
```

This creates a `.vsix` file that can be installed manually in VS Code.

### Manual Installation

```bash
# Install the packaged extension
code --install-extension aardvark-blue-theme-1.0.0.vsix
```

## 🚀 Publishing to Marketplace

### Prerequisites

1. **Azure DevOps Account**
2. **Personal Access Token** with "Marketplace (Manage)" scope
3. **VS Code Publisher Account**

### Setup Publisher

```bash
# Login to marketplace (first time only)
vsce login your-publisher-name
```

### Publish Steps

```bash
cd extras/vscode

# Verify package.json settings
# Make sure version, publisher, etc. are correct

# Package and publish in one step
vsce publish

# Or publish specific version
vsce publish 1.0.1
```

### Pre-publish Checklist

- [ ] Icon file exists (`icon.png`, 128x128)
- [ ] README.md has screenshots
- [ ] CHANGELOG.md is updated
- [ ] Version number is incremented
- [ ] All links in package.json work
- [ ] Theme has been tested locally

## 🔍 Testing Guidelines

### Manual Testing

Test the theme with these file types:

- **TypeScript** (`.ts`) - Check interfaces, generics, modifiers
- **React** (`.tsx`) - Verify component vs HTML tag colors
- **JavaScript** (`.js`, `.jsx`) - Basic syntax highlighting
- **JSON** - Configuration files
- **Markdown** - Documentation files
- **Terminal** - ANSI color support

### Test Cases

1. **TypeScript Features**:

   ```typescript
   interface User {
     readonly id: number;
     name?: string;
   }
   
   export class UserService<T extends User> {
     private users: T[] = [];
     
     public async getUser(id: number): Promise<T | null> {
       return this.users.find(u => u.id === id) ?? null;
     }
   }
   ```

2. **React Components**:

   ```tsx
   const App: React.FC = () => {
     return (
       <div className="app">
         <UserCard user={user} />
         <button onClick={handleClick}>Click me</button>
       </div>
     );
   };
   ```

3. **Terminal Colors**: Open integrated terminal and run commands with colored output

## 📝 Updating the Theme

### Color Changes

1. Update `themes/aardvark-blue-color-theme.json`
2. Test changes in Extension Development Host
3. Update version in `package.json`
4. Update `CHANGELOG.md`
5. Package and publish

### Adding New Language Support

1. Research VS Code token scopes for the language
2. Add appropriate `tokenColors` entries
3. Test with sample files
4. Document in README.md

## 🐛 Troubleshooting

### Common Issues

1. **Theme not showing**: Check `package.json` contributes section
2. **Colors not applied**: Verify token scopes are correct
3. **Publishing fails**: Check publisher name and permissions
4. **VSIX creation fails**: Ensure all required files exist

### Debug Mode

Use VS Code's "Developer: Inspect Editor Tokens and Scopes" command to see what token scopes are being applied to specific text.

## 📚 Resources

- [VS Code Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [TextMate Grammar Scopes](https://macromates.com/manual/en/language_grammars)
