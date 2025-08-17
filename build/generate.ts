#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Type definitions
interface ColorPalette {
  name: string;
  description: string;
  author: string;
  version: string;
  base: {
    bg: string;
    fg: string;
    cursor: string;
    selection: string;
  };
  ansi: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
  };
  bright: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
  };
  ui: {
    bg_dark: string;
    bg_light: string;
    border: string;
    comment: string;
    error: string;
    warning: string;
    info: string;
    hint: string;
    fold: string;
    visual: string;
    search: string;
    line_number: string;
    cursor_line: string;
  };
}

interface SemanticColors {
  syntax: Record<string, string>;
  typescript: Record<string, string>;
  jsx: Record<string, string>;
  editor: Record<string, string>;
  ui_elements: Record<string, string>;
  diagnostics: Record<string, string>;
}

// Utility type for nested object traversal
type NestedValue = string | Record<string, any>;

// Load color definitions
const palette: ColorPalette = JSON.parse(fs.readFileSync(path.join(__dirname, '../colors/palette.json'), 'utf8'));
const semantic: SemanticColors = JSON.parse(fs.readFileSync(path.join(__dirname, '../colors/semantic.json'), 'utf8'));

// Color resolver - resolves semantic references to actual hex values
function resolveColor(colorRef: string): string {
  if (!colorRef || typeof colorRef !== 'string') {
    throw new Error(`Invalid color reference: ${colorRef}`);
  }
  
  if (colorRef.startsWith('#')) {
    return colorRef; // Already a hex color
  }
  
  const parts = colorRef.split('.');
  let value: NestedValue = palette;
  
  for (const part of parts) {
    if (typeof value !== 'object' || value[part] === undefined) {
      throw new Error(`Color reference '${colorRef}' not found in palette`);
    }
    value = value[part];
  }
  
  return value as string;
}

// Resolve semantic reference to color
function resolveSemantic(semanticRef: string): string {
  const parts = semanticRef.split('.');
  let value: NestedValue = semantic;
  
  for (const part of parts) {
    if (typeof value !== 'object' || value[part] === undefined) {
      throw new Error(`Semantic reference '${semanticRef}' not found`);
    }
    value = value[part];
  }
  
  return resolveColor(value as string);
}

// Generate Neovim palette.lua
function generateNeovimPalette(): string {
  const luaLines = [
    'local palette = {',
    '  -- Base colors',
    `  bg = "${palette.base.bg}",`,
    `  fg = "${palette.base.fg}",`,
    `  cursor = "${palette.base.cursor}",`,
    `  selection = "${palette.base.selection}",`,
    '',
    '  -- ANSI colors (normal)',
    `  black = "${palette.ansi.black}",`,
    `  red = "${palette.ansi.red}",`,
    `  green = "${palette.ansi.green}",`,
    `  yellow = "${palette.ansi.yellow}",`,
    `  blue = "${palette.ansi.blue}",`,
    `  magenta = "${palette.ansi.magenta}",`,
    `  cyan = "${palette.ansi.cyan}",`,
    `  white = "${palette.ansi.white}",`,
    '',
    '  -- ANSI colors (bright)',
    `  bright_black = "${palette.bright.black}",`,
    `  bright_red = "${palette.bright.red}",`,
    `  bright_green = "${palette.bright.green}",`,
    `  bright_yellow = "${palette.bright.yellow}",`,
    `  bright_blue = "${palette.bright.blue}",`,
    `  bright_magenta = "${palette.bright.magenta}",`,
    `  bright_cyan = "${palette.bright.cyan}",`,
    `  bright_white = "${palette.bright.white}",`,
    '',
    '  -- UI colors (derived from palette)',
    `  bg_dark = "${palette.ui.bg_dark}",`,
    `  bg_light = "${palette.ui.bg_light}",`,
    `  border = "${palette.ui.border}",`,
    `  comment = "${palette.ui.comment}",`,
    `  error = "${palette.ui.error}",`,
    `  warning = "${palette.ui.warning}",`,
    `  info = "${palette.ui.info}",`,
    `  hint = "${palette.ui.hint}",`,
    '}',
    '',
    '-- Additional semantic colors',
    'palette.none = "NONE"',
    `palette.fold = palette.bg_light`,
    `palette.visual = palette.selection`,
    `palette.search = palette.bright_yellow`,
    `palette.line_number = palette.comment`,
    `palette.cursor_line = palette.bg_light`,
    '',
    'return palette'
  ];
  
  return luaLines.join('\n');
}

// Generate Neovim highlights with semantic mapping
function generateNeovimHighlights(): string {
  const luaLines = [
    'local M = {}',
    '',
    'function M.setup(palette, options)',
    '  local highlights = {}',
    '  ',
    '  -- Ensure styles exist with defaults',
    '  local styles = options.styles or {',
    '    comments = {},',
    '    keywords = {},',
    '    functions = {},',
    '    variables = {},',
    '  }',
    '',
    '  -- Editor highlights'
  ];

  // Add editor highlights using semantic mappings
  type EditorMapping = {
    fg?: string;
    bg?: string;
  };
  
  const editorMappings: Record<string, EditorMapping> = {
    'Normal': { fg: 'editor.foreground', bg: 'editor.background' },
    'NormalFloat': { fg: 'editor.foreground', bg: 'ui_elements.menu_bg' },
    'LineNr': { fg: 'editor.line_number' },
    'CursorLine': { bg: 'editor.cursor_line' },
    'Visual': { bg: 'editor.visual' },
    'Search': { fg: 'editor.background', bg: 'editor.search' }
  };

  for (const [group, colors] of Object.entries(editorMappings)) {
    let highlight = `  highlights.${group} = { `;
    const parts: string[] = [];
    
    if (colors.fg) {
      parts.push(`fg = "${resolveSemantic(colors.fg)}"`);
    }
    if (colors.bg) {
      if (group === 'Normal' || group === 'NormalFloat') {
        parts.push(`bg = options.transparent and palette.none or "${resolveSemantic(colors.bg)}"`);
      } else {
        parts.push(`bg = "${resolveSemantic(colors.bg)}"`);
      }
    }
    
    highlight += parts.join(', ') + ' }';
    luaLines.push(highlight);
  }

  luaLines.push('');
  luaLines.push('  -- Syntax highlighting');
  
  // Add syntax highlights using semantic mappings
  type SyntaxMapping = {
    fg: string;
    style?: string;
  };
  
  const syntaxMappings: Record<string, SyntaxMapping> = {
    'Comment': { fg: 'syntax.comment', style: 'styles.comments' },
    'String': { fg: 'syntax.string' },
    'Number': { fg: 'syntax.number' },
    'Boolean': { fg: 'syntax.boolean' },
    'Function': { fg: 'syntax.function', style: 'styles.functions' },
    'Identifier': { fg: 'syntax.variable', style: 'styles.variables' },
    'Keyword': { fg: 'syntax.keyword', style: 'styles.keywords' },
    'Type': { fg: 'syntax.type' },
    'Operator': { fg: 'syntax.operator' }
  };

  for (const [group, config] of Object.entries(syntaxMappings)) {
    let highlight = `  highlights.${group} = `;
    
    if (config.style) {
      highlight += `vim.tbl_extend("force", { fg = "${resolveSemantic(config.fg)}" }, ${config.style})`;
    } else {
      highlight += `{ fg = "${resolveSemantic(config.fg)}" }`;
    }
    
    luaLines.push(highlight);
  }

  luaLines.push('');
  luaLines.push('  -- TreeSitter highlights');
  luaLines.push('  highlights["@variable"] = highlights.Identifier');
  luaLines.push(`  highlights["@string"] = { fg = "${resolveSemantic('syntax.string')}" }`);
  luaLines.push(`  highlights["@number"] = { fg = "${resolveSemantic('syntax.number')}" }`);
  luaLines.push(`  highlights["@function"] = { fg = "${resolveSemantic('syntax.function')}" }`);
  luaLines.push(`  highlights["@keyword"] = highlights.Keyword`);
  luaLines.push(`  highlights["@keyword.function"] = { fg = "${resolveSemantic('syntax.keyword_function')}" }`);
  luaLines.push(`  highlights["@keyword.operator"] = { fg = "${resolveSemantic('syntax.keyword_operator')}" }`);
  luaLines.push(`  highlights["@type"] = { fg = "${resolveSemantic('syntax.type')}" }`);
  
  luaLines.push('');
  luaLines.push('  -- TypeScript specific highlights');
  luaLines.push(`  highlights["@keyword.modifier"] = { fg = "${resolveSemantic('typescript.modifier')}" }`);
  luaLines.push(`  highlights["@keyword.type"] = { fg = "${resolveSemantic('typescript.type_keyword')}" }`);
  luaLines.push(`  highlights["@keyword.operator.typescript"] = { fg = "${resolveSemantic('typescript.type_operator')}" }`);
  luaLines.push(`  highlights["@attribute"] = { fg = "${resolveSemantic('typescript.decorator')}" }`);
  
  luaLines.push('');
  luaLines.push('  -- JSX/TSX specific highlights');
  luaLines.push(`  highlights["@tag.tsx"] = { fg = "${resolveSemantic('jsx.component')}" }`);
  luaLines.push(`  highlights["@tag.builtin.tsx"] = { fg = "${resolveSemantic('jsx.html_tag')}" }`);
  luaLines.push(`  highlights["@tag.attribute.tsx"] = { fg = "${resolveSemantic('jsx.attribute')}" }`);
  luaLines.push(`  highlights["@tag.delimiter.tsx"] = { fg = "${resolveSemantic('jsx.delimiter')}" }`);
  luaLines.push(`  highlights["@variable.member.tsx"] = { fg = "${resolveSemantic('jsx.member_component')}" }`);

  luaLines.push('');
  luaLines.push('  return highlights');
  luaLines.push('end');
  luaLines.push('');
  luaLines.push('return M');
  
  return luaLines.join('\n');
}

// Ensure output directories exist
const outputDir = path.join(__dirname, '../generated/lua/aardvark-blue');
fs.mkdirSync(outputDir, { recursive: true });

// Generate files
console.log('Generating Neovim color files...');

const paletteContent = generateNeovimPalette();
fs.writeFileSync(path.join(outputDir, 'palette.lua'), paletteContent);
console.log('✓ Generated palette.lua');

const highlightsContent = generateNeovimHighlights();
fs.writeFileSync(path.join(outputDir, 'highlights.lua'), highlightsContent);
console.log('✓ Generated highlights.lua');

console.log('\\nGeneration complete! Files written to generated/lua/aardvark-blue/');