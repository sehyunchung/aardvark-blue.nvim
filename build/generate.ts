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
    bold?: boolean;
    underline?: boolean;
    sp?: string;
  };
  
  const editorMappings: Record<string, EditorMapping> = {
    'Normal': { fg: 'editor.foreground', bg: 'editor.background' },
    'NormalFloat': { fg: 'editor.foreground', bg: 'ui_elements.menu_bg' },
    'NormalNC': { fg: 'editor.foreground', bg: 'editor.background' },
    'LineNr': { fg: 'editor.line_number' },
    'CursorLine': { bg: 'editor.cursor_line' },
    'CursorLineNr': { fg: 'editor.cursor_line_nr', bold: true },
    'CursorColumn': { bg: 'editor.cursor_column' },
    'ColorColumn': { bg: 'editor.color_column' },
    'Cursor': { fg: 'editor.background', bg: 'editor.cursor' },
    'Visual': { bg: 'editor.visual' },
    'VisualNOS': { bg: 'editor.visual_nos' },
    'Search': { fg: 'editor.background', bg: 'editor.search' },
    'IncSearch': { fg: 'editor.background', bg: 'editor.inc_search' },
    'CurSearch': { fg: 'editor.background', bg: 'editor.cur_search' },
    'MatchParen': { fg: 'editor.match_paren', bold: true }
  };

  for (const [group, colors] of Object.entries(editorMappings)) {
    let highlight = `  highlights.${group} = { `;
    const parts: string[] = [];
    
    if (colors.fg) {
      parts.push(`fg = "${resolveSemantic(colors.fg)}"`);
    }
    if (colors.bg) {
      if (group === 'Normal' || group === 'NormalFloat' || group === 'NormalNC') {
        parts.push(`bg = options.transparent and palette.none or "${resolveSemantic(colors.bg)}"`);
      } else {
        parts.push(`bg = "${resolveSemantic(colors.bg)}"`);
      }
    }
    if (colors.bold) {
      parts.push('bold = true');
    }
    if (colors.underline) {
      parts.push('underline = true');
    }
    if (colors.sp) {
      parts.push(`sp = "${resolveSemantic(colors.sp)}"`);
    }
    
    highlight += parts.join(', ') + ' }';
    luaLines.push(highlight);
  }

  luaLines.push('');
  luaLines.push('  -- Syntax highlighting');
  
  // Add syntax highlights using semantic mappings
  type SyntaxMapping = {
    fg?: string;
    bg?: string;
    style?: string;
    bold?: boolean;
    underline?: boolean;
  };
  
  const syntaxMappings: Record<string, SyntaxMapping> = {
    'Comment': { fg: 'syntax.comment', style: 'styles.comments' },
    'Constant': { fg: 'syntax.constant' },
    'String': { fg: 'syntax.string' },
    'Character': { fg: 'syntax.character' },
    'Number': { fg: 'syntax.number' },
    'Boolean': { fg: 'syntax.boolean' },
    'Float': { fg: 'syntax.float' },
    'Identifier': { fg: 'syntax.identifier', style: 'styles.variables' },
    'Function': { fg: 'syntax.function', style: 'styles.functions' },
    'Statement': { fg: 'syntax.statement', style: 'styles.keywords' },
    'Conditional': { fg: 'syntax.conditional', style: 'styles.keywords' },
    'Repeat': { fg: 'syntax.repeat', style: 'styles.keywords' },
    'Label': { fg: 'syntax.label', style: 'styles.keywords' },
    'Operator': { fg: 'syntax.operator' },
    'Keyword': { fg: 'syntax.keyword', style: 'styles.keywords' },
    'Exception': { fg: 'syntax.exception', style: 'styles.keywords' },
    'PreProc': { fg: 'syntax.preproc' },
    'Include': { fg: 'syntax.include' },
    'Define': { fg: 'syntax.define' },
    'Macro': { fg: 'syntax.macro' },
    'PreCondit': { fg: 'syntax.precondit' },
    'Type': { fg: 'syntax.type' },
    'StorageClass': { fg: 'syntax.storage_class' },
    'Structure': { fg: 'syntax.structure' },
    'Typedef': { fg: 'syntax.typedef' },
    'Special': { fg: 'syntax.special' },
    'SpecialChar': { fg: 'syntax.special_char' },
    'Tag': { fg: 'syntax.tag' },
    'Delimiter': { fg: 'syntax.delimiter' },
    'SpecialComment': { fg: 'syntax.special_comment' },
    'Debug': { fg: 'syntax.debug' },
    'Underlined': { underline: true },
    'Ignore': { fg: 'syntax.comment' },
    'Error': { fg: 'syntax.error' },
    'Todo': { fg: 'editor.background', bg: 'syntax.todo', bold: true }
  };

  for (const [group, config] of Object.entries(syntaxMappings)) {
    let highlight = `  highlights.${group} = `;
    
    if (config.style) {
      const parts: string[] = [];
      if (config.fg) parts.push(`fg = "${resolveSemantic(config.fg)}"`);
      if (config.bg) parts.push(`bg = "${resolveSemantic(config.bg)}"`);
      if (config.bold) parts.push('bold = true');
      if (config.underline) parts.push('underline = true');
      
      highlight += `vim.tbl_extend("force", { ${parts.join(', ')} }, ${config.style})`;
    } else {
      const parts: string[] = [];
      if (config.fg) parts.push(`fg = "${resolveSemantic(config.fg)}"`);
      if (config.bg) parts.push(`bg = "${resolveSemantic(config.bg)}"`);
      if (config.bold) parts.push('bold = true');
      if (config.underline) parts.push('underline = true');
      
      highlight += `{ ${parts.join(', ')} }`;
    }
    
    luaLines.push(highlight);
  }

  luaLines.push('');
  luaLines.push('  -- TreeSitter highlights');
  
  // TreeSitter mappings
  const treesitterMappings = [
    ['@variable', 'highlights.Identifier'],
    ['@variable.builtin', `{ fg = "${resolveSemantic('treesitter.variable_builtin')}" }`],
    ['@variable.parameter', `{ fg = "${resolveSemantic('treesitter.variable_parameter')}" }`],
    ['@variable.member', `{ fg = "${resolveSemantic('treesitter.variable_member')}" }`],
    ['@constant', 'highlights.Constant'],
    ['@constant.builtin', `{ fg = "${resolveSemantic('treesitter.constant_builtin')}" }`],
    ['@constant.macro', `{ fg = "${resolveSemantic('treesitter.constant_macro')}" }`],
    ['@module', `{ fg = "${resolveSemantic('treesitter.module')}" }`],
    ['@label', 'highlights.Label'],
    ['@string', `{ fg = "${resolveSemantic('treesitter.string')}" }`],
    ['@string.escape', `{ fg = "${resolveSemantic('treesitter.string_escape')}" }`],
    ['@string.special', `{ fg = "${resolveSemantic('treesitter.string_special')}" }`],
    ['@character', 'highlights.Character'],
    ['@number', `{ fg = "${resolveSemantic('treesitter.number')}" }`],
    ['@boolean', 'highlights.Boolean'],
    ['@float', `{ fg = "${resolveSemantic('treesitter.float')}" }`],
    ['@function', `{ fg = "${resolveSemantic('treesitter.function')}" }`],
    ['@function.builtin', `{ fg = "${resolveSemantic('treesitter.function_builtin')}" }`],
    ['@function.macro', `{ fg = "${resolveSemantic('treesitter.function_macro')}" }`],
    ['@function.method', `{ fg = "${resolveSemantic('treesitter.function_method')}" }`],
    ['@constructor', `{ fg = "${resolveSemantic('treesitter.constructor')}" }`],
    ['@operator', `{ fg = "${resolveSemantic('treesitter.operator')}" }`],
    ['@keyword', 'highlights.Keyword'],
    ['@keyword.function', `{ fg = "${resolveSemantic('treesitter.keyword_function')}" }`],
    ['@keyword.operator', `{ fg = "${resolveSemantic('treesitter.keyword_operator')}" }`],
    ['@keyword.return', `{ fg = "${resolveSemantic('treesitter.keyword_return')}" }`],
    ['@keyword.conditional', `{ fg = "${resolveSemantic('treesitter.keyword_conditional')}" }`],
    ['@keyword.repeat', `{ fg = "${resolveSemantic('treesitter.keyword_repeat')}" }`],
    ['@keyword.import', `{ fg = "${resolveSemantic('treesitter.keyword_import')}" }`],
    ['@keyword.exception', `{ fg = "${resolveSemantic('treesitter.keyword_exception')}" }`],
    ['@type', `{ fg = "${resolveSemantic('treesitter.type')}" }`],
    ['@type.builtin', `{ fg = "${resolveSemantic('treesitter.type_builtin')}" }`],
    ['@type.definition', `{ fg = "${resolveSemantic('treesitter.type_definition')}" }`],
    ['@attribute', `{ fg = "${resolveSemantic('treesitter.attribute')}" }`],
    ['@property', `{ fg = "${resolveSemantic('treesitter.property')}" }`],
    ['@comment', 'highlights.Comment'],
    ['@comment.todo', 'highlights.Todo'],
    ['@comment.warning', `{ fg = "${resolveSemantic('treesitter.comment_warning')}" }`],
    ['@comment.note', `{ fg = "${resolveSemantic('treesitter.comment_note')}" }`],
    ['@comment.error', `{ fg = "${resolveSemantic('treesitter.comment_error')}" }`],
    ['@punctuation.delimiter', 'highlights.Delimiter'],
    ['@punctuation.bracket', `{ fg = "${resolveSemantic('treesitter.punctuation_bracket')}" }`],
    ['@punctuation.special', `{ fg = "${resolveSemantic('treesitter.punctuation_special')}" }`],
    ['@tag', 'highlights.Tag'],
    ['@tag.attribute', `{ fg = "${resolveSemantic('treesitter.tag_attribute')}" }`],
    ['@tag.delimiter', `{ fg = "${resolveSemantic('treesitter.tag_delimiter')}" }`]
  ];

  for (const [group, value] of treesitterMappings) {
    luaLines.push(`  highlights["${group}"] = ${value}`);
  }
  
  luaLines.push('');
  luaLines.push('  -- TypeScript specific highlights');
  luaLines.push(`  highlights["@keyword.modifier"] = { fg = "${resolveSemantic('typescript.modifier')}" }`);
  luaLines.push(`  highlights["@keyword.type"] = { fg = "${resolveSemantic('typescript.type_keyword')}" }`);
  luaLines.push(`  highlights["@keyword.operator.typescript"] = { fg = "${resolveSemantic('typescript.type_operator')}" }`);
  luaLines.push(`  highlights["@attribute"] = { fg = "${resolveSemantic('typescript.decorator')}" }`);
  
  luaLines.push('');
  luaLines.push('  -- JSX/TSX specific highlights (override general @tag for JSX)');
  luaLines.push(`  highlights["@tag.tsx"] = { fg = "${resolveSemantic('jsx.component')}" }`);
  luaLines.push(`  highlights["@tag.builtin.tsx"] = { fg = "${resolveSemantic('jsx.html_tag')}" }`);
  luaLines.push(`  highlights["@tag.attribute.tsx"] = { fg = "${resolveSemantic('jsx.attribute')}" }`);
  luaLines.push(`  highlights["@tag.delimiter.tsx"] = { fg = "${resolveSemantic('jsx.delimiter')}" }`);
  luaLines.push('');
  luaLines.push('  -- JSX member expression components (Tabs.Root, UI.Form.Field, etc.)');
  luaLines.push(`  highlights["@variable.member.tsx"] = { fg = "${resolveSemantic('jsx.member_component')}" }`);
  luaLines.push(`  highlights["@property.tsx"] = { fg = "${resolveSemantic('jsx.member_component')}" }`);

  luaLines.push('');
  luaLines.push('  -- LSP highlights');
  luaLines.push(`  highlights.LspReferenceText = { bg = "${resolveSemantic('lsp.reference_text')}" }`);
  luaLines.push(`  highlights.LspReferenceRead = { bg = "${resolveSemantic('lsp.reference_read')}" }`);
  luaLines.push(`  highlights.LspReferenceWrite = { bg = "${resolveSemantic('lsp.reference_write')}" }`);
  luaLines.push(`  highlights.DiagnosticError = { fg = "${resolveSemantic('lsp.diagnostic_error')}" }`);
  luaLines.push(`  highlights.DiagnosticWarn = { fg = "${resolveSemantic('lsp.diagnostic_warn')}" }`);
  luaLines.push(`  highlights.DiagnosticInfo = { fg = "${resolveSemantic('lsp.diagnostic_info')}" }`);
  luaLines.push(`  highlights.DiagnosticHint = { fg = "${resolveSemantic('lsp.diagnostic_hint')}" }`);
  luaLines.push(`  highlights.DiagnosticSignError = { fg = "${resolveSemantic('lsp.diagnostic_error')}" }`);
  luaLines.push(`  highlights.DiagnosticSignWarn = { fg = "${resolveSemantic('lsp.diagnostic_warn')}" }`);
  luaLines.push(`  highlights.DiagnosticSignInfo = { fg = "${resolveSemantic('lsp.diagnostic_info')}" }`);
  luaLines.push(`  highlights.DiagnosticSignHint = { fg = "${resolveSemantic('lsp.diagnostic_hint')}" }`);
  luaLines.push(`  highlights.DiagnosticUnderlineError = { underline = true, sp = "${resolveSemantic('lsp.diagnostic_error')}" }`);
  luaLines.push(`  highlights.DiagnosticUnderlineWarn = { underline = true, sp = "${resolveSemantic('lsp.diagnostic_warn')}" }`);
  luaLines.push(`  highlights.DiagnosticUnderlineInfo = { underline = true, sp = "${resolveSemantic('lsp.diagnostic_info')}" }`);
  luaLines.push(`  highlights.DiagnosticUnderlineHint = { underline = true, sp = "${resolveSemantic('lsp.diagnostic_hint')}" }`);

  luaLines.push('');
  luaLines.push('  -- UI elements');
  luaLines.push(`  highlights.Pmenu = { fg = "${resolveSemantic('ui_elements.menu_fg')}", bg = "${resolveSemantic('ui_elements.menu_bg')}" }`);
  luaLines.push(`  highlights.PmenuSel = { fg = "${resolveSemantic('editor.background')}", bg = "${resolveSemantic('ui_elements.menu_selection')}" }`);
  luaLines.push(`  highlights.PmenuSbar = { bg = "${resolveSemantic('ui_elements.menu_sbar')}" }`);
  luaLines.push(`  highlights.PmenuThumb = { bg = "${resolveSemantic('ui_elements.menu_thumb')}" }`);
  luaLines.push(`  highlights.StatusLine = { fg = "${resolveSemantic('ui_elements.menu_fg')}", bg = "${resolveSemantic('ui_elements.status_line')}" }`);
  luaLines.push(`  highlights.StatusLineNC = { fg = "${resolveSemantic('syntax.comment')}", bg = "${resolveSemantic('ui_elements.status_line_nc')}" }`);
  luaLines.push(`  highlights.TabLine = { fg = "${resolveSemantic('syntax.comment')}", bg = "${resolveSemantic('ui_elements.tab_line')}" }`);
  luaLines.push(`  highlights.TabLineFill = { bg = "${resolveSemantic('ui_elements.tab_line_fill')}" }`);
  luaLines.push(`  highlights.TabLineSel = { fg = "${resolveSemantic('editor.foreground')}", bg = "${resolveSemantic('ui_elements.tab_line_sel')}" }`);
  luaLines.push(`  highlights.WinSeparator = { fg = "${resolveSemantic('ui_elements.window_separator')}" }`);
  luaLines.push(`  highlights.VertSplit = { fg = "${resolveSemantic('ui_elements.vert_split')}" }`);
  luaLines.push(`  highlights.Folded = { fg = "${resolveSemantic('syntax.comment')}", bg = "${resolveSemantic('ui_elements.folded')}" }`);
  luaLines.push(`  highlights.FoldColumn = { fg = "${resolveSemantic('ui_elements.fold_column')}" }`);
  luaLines.push(`  highlights.SignColumn = { fg = "${resolveSemantic('ui_elements.sign_column')}", bg = options.transparent and palette.none or "${resolveSemantic('editor.background')}" }`);
  luaLines.push(`  highlights.Directory = { fg = "${resolveSemantic('ui_elements.directory')}" }`);
  luaLines.push(`  highlights.Title = { fg = "${resolveSemantic('ui_elements.title')}", bold = true }`);
  luaLines.push(`  highlights.ErrorMsg = { fg = "${resolveSemantic('ui_elements.error_msg')}" }`);
  luaLines.push(`  highlights.WarningMsg = { fg = "${resolveSemantic('ui_elements.warning_msg')}" }`);
  luaLines.push(`  highlights.Question = { fg = "${resolveSemantic('ui_elements.question')}" }`);
  luaLines.push(`  highlights.MoreMsg = { fg = "${resolveSemantic('ui_elements.more_msg')}" }`);
  luaLines.push(`  highlights.ModeMsg = { fg = "${resolveSemantic('ui_elements.mode_msg')}" }`);

  luaLines.push('');
  luaLines.push('  -- Terminal colors');
  luaLines.push('  if options.terminal_colors then');
  luaLines.push(`    vim.g.terminal_color_0 = "${resolveColor('ansi.black')}"`);
  luaLines.push(`    vim.g.terminal_color_1 = "${resolveColor('ansi.red')}"`);
  luaLines.push(`    vim.g.terminal_color_2 = "${resolveColor('ansi.green')}"`);
  luaLines.push(`    vim.g.terminal_color_3 = "${resolveColor('ansi.yellow')}"`);
  luaLines.push(`    vim.g.terminal_color_4 = "${resolveColor('ansi.blue')}"`);
  luaLines.push(`    vim.g.terminal_color_5 = "${resolveColor('ansi.magenta')}"`);
  luaLines.push(`    vim.g.terminal_color_6 = "${resolveColor('ansi.cyan')}"`);
  luaLines.push(`    vim.g.terminal_color_7 = "${resolveColor('ansi.white')}"`);
  luaLines.push(`    vim.g.terminal_color_8 = "${resolveColor('bright.black')}"`);
  luaLines.push(`    vim.g.terminal_color_9 = "${resolveColor('bright.red')}"`);
  luaLines.push(`    vim.g.terminal_color_10 = "${resolveColor('bright.green')}"`);
  luaLines.push(`    vim.g.terminal_color_11 = "${resolveColor('bright.yellow')}"`);
  luaLines.push(`    vim.g.terminal_color_12 = "${resolveColor('bright.blue')}"`);
  luaLines.push(`    vim.g.terminal_color_13 = "${resolveColor('bright.magenta')}"`);
  luaLines.push(`    vim.g.terminal_color_14 = "${resolveColor('bright.cyan')}"`);
  luaLines.push(`    vim.g.terminal_color_15 = "${resolveColor('bright.white')}"`);
  luaLines.push('  end');

  luaLines.push('');
  luaLines.push('  return highlights');
  luaLines.push('end');
  luaLines.push('');
  luaLines.push('return M');
  
  return luaLines.join('\n');
}

// Generate VS Code theme JSON
function generateVSCodeTheme(): string {
  const theme = {
    name: "Aardvark Blue",
    type: "dark",
    semanticHighlighting: true,
    colors: {
      // Editor core
      "editor.background": resolveSemantic('editor.background'),
      "editor.foreground": resolveSemantic('editor.foreground'),
      "editorLineNumber.foreground": resolveSemantic('editor.line_number'),
      "editorLineNumber.activeForeground": resolveSemantic('editor.foreground'),
      "editor.lineHighlightBackground": resolveSemantic('editor.cursor_line') + "20",
      "editor.selectionBackground": resolveSemantic('editor.selection') + "30",
      "editor.selectionHighlightBackground": resolveSemantic('editor.selection') + "20",
      "editor.findMatchBackground": resolveSemantic('editor.search') + "50",
      "editor.findMatchHighlightBackground": resolveSemantic('editor.search') + "30",
      "editorCursor.foreground": resolveSemantic('editor.cursor'),
      "editorWhitespace.foreground": resolveSemantic('syntax.comment') + "40",
      "editorIndentGuide.background1": resolveSemantic('syntax.comment') + "30",
      "editorIndentGuide.activeBackground1": resolveSemantic('syntax.comment') + "60",
      "editorRuler.foreground": resolveSemantic('syntax.comment') + "40",
      
      // Editor widgets
      "editorWidget.background": resolveSemantic('ui_elements.menu_bg'),
      "editorWidget.border": resolveSemantic('ui_elements.window_separator'),
      "editorSuggestWidget.background": resolveSemantic('ui_elements.menu_bg'),
      "editorSuggestWidget.border": resolveSemantic('ui_elements.window_separator'),
      "editorSuggestWidget.selectedBackground": resolveSemantic('editor.cursor_line'),
      "editorHoverWidget.background": resolveSemantic('ui_elements.menu_bg'),
      "editorHoverWidget.border": resolveSemantic('ui_elements.window_separator'),
      
      // Activity bar
      "activityBar.background": resolveSemantic('editor.background'),
      "activityBar.foreground": resolveSemantic('editor.foreground'),
      "activityBar.inactiveForeground": resolveSemantic('syntax.comment'),
      "activityBar.border": resolveSemantic('ui_elements.window_separator'),
      "activityBarBadge.background": resolveSemantic('syntax.number'),
      "activityBarBadge.foreground": resolveSemantic('editor.background'),
      
      // Sidebar
      "sideBar.background": resolveSemantic('ui_elements.menu_bg'),
      "sideBar.foreground": resolveSemantic('editor.foreground'),
      "sideBar.border": resolveSemantic('ui_elements.window_separator'),
      "sideBarTitle.foreground": resolveSemantic('editor.foreground'),
      "sideBarSectionHeader.background": resolveSemantic('editor.cursor_line'),
      "sideBarSectionHeader.foreground": resolveSemantic('editor.foreground'),
      
      // Lists
      "list.activeSelectionBackground": resolveSemantic('editor.cursor_line'),
      "list.activeSelectionForeground": resolveSemantic('editor.foreground'),
      "list.hoverBackground": resolveSemantic('editor.cursor_line') + "50",
      "list.inactiveSelectionBackground": resolveSemantic('editor.cursor_line') + "30",
      "list.dropBackground": resolveSemantic('syntax.number') + "30",
      
      // Title bar
      "titleBar.activeBackground": resolveSemantic('editor.background'),
      "titleBar.activeForeground": resolveSemantic('editor.foreground'),
      "titleBar.inactiveBackground": resolveSemantic('ui_elements.menu_bg'),
      "titleBar.inactiveForeground": resolveSemantic('syntax.comment'),
      "titleBar.border": resolveSemantic('ui_elements.window_separator'),
      
      // Status bar
      "statusBar.background": resolveSemantic('editor.background'),
      "statusBar.foreground": resolveSemantic('editor.foreground'),
      "statusBar.border": resolveSemantic('ui_elements.window_separator'),
      "statusBar.debuggingBackground": resolveSemantic('syntax.keyword'),
      "statusBar.debuggingForeground": resolveSemantic('editor.foreground'),
      "statusBar.noFolderBackground": resolveSemantic('editor.background'),
      
      // Panel
      "panel.background": resolveSemantic('ui_elements.menu_bg'),
      "panel.border": resolveSemantic('ui_elements.window_separator'),
      "panelTitle.activeForeground": resolveSemantic('editor.foreground'),
      "panelTitle.inactiveForeground": resolveSemantic('syntax.comment'),
      
      // Tabs
      "tab.activeBackground": resolveSemantic('editor.background'),
      "tab.activeForeground": resolveSemantic('editor.foreground'),
      "tab.inactiveBackground": resolveSemantic('ui_elements.menu_bg'),
      "tab.inactiveForeground": resolveSemantic('syntax.comment'),
      "tab.border": resolveSemantic('ui_elements.window_separator'),
      "editorGroupHeader.tabsBackground": resolveSemantic('ui_elements.menu_bg'),
      
      // Breadcrumb
      "breadcrumb.background": resolveSemantic('editor.background'),
      "breadcrumb.foreground": resolveSemantic('syntax.comment'),
      "breadcrumb.focusForeground": resolveSemantic('editor.foreground'),
      
      // Git decorations
      "gitDecoration.modifiedResourceForeground": resolveSemantic('syntax.warning'),
      "gitDecoration.deletedResourceForeground": resolveSemantic('syntax.error'),
      "gitDecoration.untrackedResourceForeground": resolveSemantic('syntax.string'),
      "gitDecoration.ignoredResourceForeground": resolveSemantic('syntax.comment'),
      "gitDecoration.conflictingResourceForeground": resolveSemantic('typescript.type_keyword'),
      
      // Scrollbar
      "scrollbar.shadow": resolveSemantic('ui_elements.menu_bg') + "80",
      "scrollbarSlider.background": resolveSemantic('syntax.comment') + "30",
      "scrollbarSlider.hoverBackground": resolveSemantic('syntax.comment') + "50",
      "scrollbarSlider.activeBackground": resolveSemantic('syntax.comment') + "70",
      
      // Badge and progress
      "badge.background": resolveSemantic('syntax.number'),
      "badge.foreground": resolveSemantic('editor.background'),
      "progressBar.background": resolveSemantic('syntax.number'),
      
      // Notifications
      "notificationCenter.border": resolveSemantic('ui_elements.window_separator'),
      "notificationCenterHeader.foreground": resolveSemantic('editor.foreground'),
      "notificationCenterHeader.background": resolveSemantic('ui_elements.menu_bg'),
      "notificationToast.border": resolveSemantic('ui_elements.window_separator'),
      "notifications.foreground": resolveSemantic('editor.foreground'),
      "notifications.background": resolveSemantic('ui_elements.menu_bg'),
      "notifications.border": resolveSemantic('ui_elements.window_separator'),
      "notificationLink.foreground": resolveSemantic('syntax.number'),
      
      // Terminal colors
      "terminal.background": resolveSemantic('editor.background'),
      "terminal.foreground": resolveSemantic('editor.foreground'),
      "terminal.ansiBlack": resolveColor('ansi.black'),
      "terminal.ansiRed": resolveColor('ansi.red'),
      "terminal.ansiGreen": resolveColor('ansi.green'),
      "terminal.ansiYellow": resolveColor('ansi.yellow'),
      "terminal.ansiBlue": resolveColor('ansi.blue'),
      "terminal.ansiMagenta": resolveColor('ansi.magenta'),
      "terminal.ansiCyan": resolveColor('ansi.cyan'),
      "terminal.ansiWhite": resolveColor('ansi.white'),
      "terminal.ansiBrightBlack": resolveColor('bright.black'),
      "terminal.ansiBrightRed": resolveColor('bright.red'),
      "terminal.ansiBrightGreen": resolveColor('bright.green'),
      "terminal.ansiBrightYellow": resolveColor('bright.yellow'),
      "terminal.ansiBrightBlue": resolveColor('bright.blue'),
      "terminal.ansiBrightMagenta": resolveColor('bright.magenta'),
      "terminal.ansiBrightCyan": resolveColor('bright.cyan'),
      "terminal.ansiBrightWhite": resolveColor('bright.white')
    },
    tokenColors: [
      {
        settings: {
          foreground: resolveSemantic('editor.foreground')
        }
      },
      {
        name: "Comments",
        scope: ["comment", "punctuation.definition.comment"],
        settings: {
          foreground: resolveSemantic('syntax.comment'),
          fontStyle: "italic"
        }
      },
      {
        name: "Keywords (if, else, while, try, pub)",
        scope: [
          "keyword.control",
          "keyword.control.conditional", 
          "keyword.control.loop",
          "keyword.control.exception",
          "keyword.other.pub",
          "storage.modifier"
        ],
        settings: {
          foreground: resolveSemantic('syntax.keyword')
        }
      },
      {
        name: "Function keyword (fn)",
        scope: [
          "storage.type.function",
          "keyword.other.fn",
          "keyword.control.def"
        ],
        settings: {
          foreground: resolveSemantic('syntax.keyword_function')
        }
      },
      {
        name: "Function names",
        scope: [
          "entity.name.function",
          "meta.function-call.generic",
          "support.function"
        ],
        settings: {
          foreground: resolveSemantic('syntax.function')
        }
      },
      {
        name: "Variables",
        scope: [
          "variable",
          "variable.other",
          "variable.parameter"
        ],
        settings: {
          foreground: resolveSemantic('syntax.identifier')
        }
      },
      {
        name: "Strings",
        scope: [
          "string",
          "string.quoted",
          "string.template"
        ],
        settings: {
          foreground: resolveSemantic('syntax.string')
        }
      },
      {
        name: "Numbers",
        scope: [
          "constant.numeric",
          "constant.numeric.integer",
          "constant.numeric.float"
        ],
        settings: {
          foreground: resolveSemantic('syntax.number')
        }
      },
      {
        name: "Booleans and Constants",
        scope: [
          "constant.language.boolean",
          "constant.language",
          "constant.other"
        ],
        settings: {
          foreground: resolveSemantic('syntax.boolean')
        }
      },
      {
        name: "Types",
        scope: [
          "support.type",
          "entity.name.type",
          "storage.type",
          "entity.name.class"
        ],
        settings: {
          foreground: resolveSemantic('syntax.type')
        }
      },
      {
        name: "TypeScript Modifiers",
        scope: [
          "storage.modifier.public.ts",
          "storage.modifier.private.ts",
          "storage.modifier.protected.ts",
          "storage.modifier.readonly.ts"
        ],
        settings: {
          foreground: resolveSemantic('typescript.modifier')
        }
      },
      {
        name: "TypeScript Type Keywords",
        scope: [
          "storage.type.interface.ts",
          "storage.type.type.ts",
          "storage.type.enum.ts"
        ],
        settings: {
          foreground: resolveSemantic('typescript.type_keyword')
        }
      },
      {
        name: "TypeScript Operators",
        scope: [
          "keyword.operator.type.ts",
          "keyword.operator.expression.keyof.ts",
          "keyword.control.as.ts"
        ],
        settings: {
          foreground: resolveSemantic('typescript.type_operator')
        }
      },
      {
        name: "JSX Components",
        scope: [
          "support.class.component.tsx",
          "entity.name.tag.tsx"
        ],
        settings: {
          foreground: resolveSemantic('jsx.component')
        }
      },
      {
        name: "JSX HTML Tags",
        scope: [
          "entity.name.tag.html.tsx"
        ],
        settings: {
          foreground: resolveSemantic('jsx.html_tag')
        }
      },
      {
        name: "JSX Attributes",
        scope: [
          "entity.other.attribute-name.tsx"
        ],
        settings: {
          foreground: resolveSemantic('jsx.attribute')
        }
      },
      {
        name: "Decorators",
        scope: [
          "meta.decorator",
          "punctuation.decorator"
        ],
        settings: {
          foreground: resolveSemantic('typescript.decorator')
        }
      },
      {
        name: "Punctuation",
        scope: [
          "punctuation.separator",
          "punctuation.terminator",
          "punctuation.definition"
        ],
        settings: {
          foreground: resolveSemantic('syntax.delimiter')
        }
      }
    ]
  };
  
  return JSON.stringify(theme, null, 2);
}

// Ensure output directories exist  
const outputDir = path.join(__dirname, '../lua/aardvark-blue');
const vscodeOutputDir = path.join(__dirname, '../extras/vscode/themes');
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(vscodeOutputDir, { recursive: true });

// Generate files
console.log('Generating color themes from JSON...');

// Neovim files
const paletteContent = generateNeovimPalette();
fs.writeFileSync(path.join(outputDir, 'palette.lua'), paletteContent);
console.log('✓ Generated palette.lua');

const highlightsContent = generateNeovimHighlights();
fs.writeFileSync(path.join(outputDir, 'highlights.lua'), highlightsContent);
console.log('✓ Generated highlights.lua');

// VS Code theme
const vscodeThemeContent = generateVSCodeTheme();
fs.writeFileSync(path.join(vscodeOutputDir, 'aardvark-blue-color-theme.json'), vscodeThemeContent);
console.log('✓ Generated aardvark-blue-color-theme.json');

console.log('\\nGeneration complete! Files written to:');
console.log('  - lua/aardvark-blue/ (Neovim)');
console.log('  - extras/vscode/themes/ (VS Code)');