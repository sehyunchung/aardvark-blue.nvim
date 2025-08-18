local M = {}

function M.setup(palette, options)
  local highlights = {}
  
  -- Ensure styles exist with defaults
  local styles = options.styles or {
    comments = {},
    keywords = {},
    functions = {},
    variables = {},
  }

  -- Editor highlights
  highlights.Normal = { fg = palette.fg, bg = options.transparent and palette.none or palette.bg }
  highlights.NormalFloat = { fg = palette.fg, bg = palette.bg_dark }
  highlights.NormalNC = { fg = palette.fg, bg = options.transparent and palette.none or palette.bg }
  highlights.LineNr = { fg = palette.line_number }
  highlights.CursorLine = { bg = palette.cursor_line }
  highlights.CursorLineNr = { fg = palette.bright_blue, bold = true }
  highlights.CursorColumn = { bg = palette.cursor_line }
  highlights.ColorColumn = { bg = palette.bg_light }
  highlights.Cursor = { fg = palette.bg, bg = palette.cursor }
  highlights.Visual = { fg = palette.bright_white, bg = palette.visual }
  highlights.VisualNOS = { fg = palette.bright_white, bg = palette.visual }
  highlights.Search = { fg = palette.bg, bg = palette.search }
  highlights.IncSearch = { fg = palette.bg, bg = palette.bright_yellow }
  highlights.CurSearch = { fg = palette.bg, bg = palette.bright_yellow }
  highlights.MatchParen = { fg = palette.bright_cyan, bold = true }

  -- Syntax highlighting
  highlights.Comment = vim.tbl_extend("force", { fg = palette.comment }, styles.comments)
  highlights.Constant = { fg = palette.bright_red }
  highlights.String = { fg = palette.bright_green }  -- Match Ghostty green strings
  highlights.Character = { fg = palette.bright_green }
  highlights.Number = { fg = palette.bright_blue }  -- Match Ghostty blue numbers
  highlights.Boolean = { fg = palette.bright_red }
  highlights.Float = { fg = palette.bright_blue }  -- Match Ghostty blue numbers
  highlights.Identifier = vim.tbl_extend("force", { fg = palette.fg }, styles.variables)  -- White variables
  highlights.Function = vim.tbl_extend("force", { fg = palette.bright_yellow }, styles.functions)  -- Yellow functions
  highlights.Statement = vim.tbl_extend("force", { fg = palette.magenta }, styles.keywords)
  highlights.Conditional = vim.tbl_extend("force", { fg = palette.magenta }, styles.keywords)
  highlights.Repeat = vim.tbl_extend("force", { fg = palette.magenta }, styles.keywords)
  highlights.Label = vim.tbl_extend("force", { fg = palette.magenta }, styles.keywords)
  highlights.Operator = { fg = palette.bright_cyan }  -- Match Ghostty cyan operators
  highlights.Keyword = vim.tbl_extend("force", { fg = palette.magenta }, styles.keywords)
  highlights.Exception = vim.tbl_extend("force", { fg = palette.red }, styles.keywords)
  highlights.PreProc = { fg = palette.yellow }
  highlights.Include = { fg = palette.magenta }
  highlights.Define = { fg = palette.magenta }
  highlights.Macro = { fg = palette.yellow }
  highlights.PreCondit = { fg = palette.yellow }
  highlights.Type = { fg = palette.bright_cyan }  -- Match Ghostty cyan types
  highlights.StorageClass = { fg = palette.yellow }
  highlights.Structure = { fg = palette.yellow }
  highlights.Typedef = { fg = palette.yellow }
  highlights.Special = { fg = palette.cyan }
  highlights.SpecialChar = { fg = palette.bright_cyan }
  highlights.Tag = { fg = palette.blue }
  highlights.Delimiter = { fg = palette.white }
  highlights.SpecialComment = { fg = palette.bright_cyan }
  highlights.Debug = { fg = palette.red }
  highlights.Underlined = { underline = true }
  highlights.Ignore = { fg = palette.comment }
  highlights.Error = { fg = palette.error }
  highlights.Todo = { fg = palette.bg, bg = palette.yellow, bold = true }

  -- TreeSitter highlights
  highlights["@variable"] = highlights.Identifier
  highlights["@variable.builtin"] = { fg = palette.red }
  highlights["@variable.parameter"] = { fg = palette.bright_white }
  highlights["@variable.member"] = { fg = palette.blue }
  highlights["@constant"] = highlights.Constant
  highlights["@constant.builtin"] = { fg = palette.red }
  highlights["@constant.macro"] = { fg = palette.yellow }
  highlights["@module"] = { fg = palette.yellow }
  highlights["@label"] = highlights.Label
  highlights["@string"] = { fg = palette.bright_green }  -- Match Ghostty green strings
  highlights["@string.escape"] = { fg = palette.cyan }
  highlights["@string.special"] = { fg = palette.cyan }
  highlights["@character"] = highlights.Character
  highlights["@number"] = { fg = palette.bright_blue }  -- Match Ghostty blue numbers
  highlights["@boolean"] = highlights.Boolean
  highlights["@float"] = { fg = palette.bright_blue }  -- Match Ghostty blue numbers
  highlights["@function"] = { fg = palette.bright_yellow }  -- Match Ghostty yellow functions
  highlights["@function.builtin"] = { fg = palette.bright_yellow }
  highlights["@function.macro"] = { fg = palette.bright_yellow }
  highlights["@function.method"] = { fg = palette.bright_yellow }
  highlights["@constructor"] = { fg = palette.bright_yellow }
  highlights["@operator"] = { fg = palette.bright_cyan }  -- Match Ghostty cyan operators
  highlights["@keyword"] = highlights.Keyword
  highlights["@keyword.function"] = { fg = palette.bright_blue }  -- `fn` in bright blue
  highlights["@keyword.operator"] = { fg = palette.magenta }  -- `pub` stays magenta
  highlights["@keyword.return"] = { fg = palette.magenta }
  highlights["@keyword.conditional"] = { fg = palette.magenta }  -- `if`, `else`
  highlights["@keyword.repeat"] = { fg = palette.magenta }  -- `while`
  highlights["@keyword.import"] = { fg = palette.magenta }
  highlights["@keyword.exception"] = { fg = palette.magenta }  -- `try`
  highlights["@type"] = { fg = palette.bright_cyan }  -- Match Ghostty cyan types
  highlights["@type.builtin"] = { fg = palette.bright_cyan }  -- usize, void, etc.
  highlights["@type.definition"] = { fg = palette.bright_cyan }
  highlights["@attribute"] = { fg = palette.cyan }
  highlights["@property"] = { fg = palette.blue }
  highlights["@comment"] = highlights.Comment
  highlights["@comment.todo"] = highlights.Todo
  highlights["@comment.warning"] = { fg = palette.warning }
  highlights["@comment.note"] = { fg = palette.info }
  highlights["@comment.error"] = { fg = palette.error }
  highlights["@punctuation.delimiter"] = highlights.Delimiter
  highlights["@punctuation.bracket"] = { fg = palette.white }
  highlights["@punctuation.special"] = { fg = palette.cyan }
  highlights["@tag"] = highlights.Tag
  highlights["@tag.attribute"] = { fg = palette.yellow }
  highlights["@tag.delimiter"] = { fg = palette.white }

  -- TypeScript specific highlights
  highlights["@keyword.modifier"] = { fg = palette.yellow }     -- public, private, protected, readonly
  highlights["@keyword.type"] = { fg = palette.magenta }        -- interface, type, enum, namespace  
  highlights["@keyword.operator.typescript"] = { fg = palette.cyan }  -- keyof, satisfies, as, is (TypeScript only)
  highlights["@attribute"] = { fg = palette.cyan }              -- @Component, @Injectable decorators
  
  -- JSX/TSX specific highlights (override general @tag for JSX)
  highlights["@tag.tsx"] = { fg = palette.bright_blue }         -- React Components in TSX
  highlights["@tag.builtin.tsx"] = { fg = palette.blue }        -- HTML tags in TSX
  highlights["@tag.attribute.tsx"] = { fg = palette.bright_yellow }    -- JSX attributes
  highlights["@tag.delimiter.tsx"] = { fg = palette.white }     -- JSX tag delimiters
  
  -- JSX member expression components (Tabs.Root, UI.Form.Field, etc.)
  highlights["@variable.member.tsx"] = { fg = palette.bright_blue }  -- Member components should match @tag.tsx
  highlights["@property.tsx"] = { fg = palette.bright_blue }         -- Property access in components

  -- LSP highlights
  highlights.LspReferenceText = { bg = palette.bg_light }
  highlights.LspReferenceRead = { bg = palette.bg_light }
  highlights.LspReferenceWrite = { bg = palette.bg_light }
  highlights.DiagnosticError = { fg = palette.error }
  highlights.DiagnosticWarn = { fg = palette.warning }
  highlights.DiagnosticInfo = { fg = palette.info }
  highlights.DiagnosticHint = { fg = palette.hint }
  highlights.DiagnosticSignError = { fg = palette.error }
  highlights.DiagnosticSignWarn = { fg = palette.warning }
  highlights.DiagnosticSignInfo = { fg = palette.info }
  highlights.DiagnosticSignHint = { fg = palette.hint }
  highlights.DiagnosticUnderlineError = { underline = true, sp = palette.error }
  highlights.DiagnosticUnderlineWarn = { underline = true, sp = palette.warning }
  highlights.DiagnosticUnderlineInfo = { underline = true, sp = palette.info }
  highlights.DiagnosticUnderlineHint = { underline = true, sp = palette.hint }

  -- UI elements
  highlights.Pmenu = { fg = palette.fg, bg = palette.bg_dark }
  highlights.PmenuSel = { fg = palette.bg, bg = palette.blue }
  highlights.PmenuSbar = { bg = palette.bg_light }
  highlights.PmenuThumb = { bg = palette.border }
  highlights.StatusLine = { fg = palette.fg, bg = palette.bg_light }
  highlights.StatusLineNC = { fg = palette.comment, bg = palette.bg_dark }
  highlights.TabLine = { fg = palette.comment, bg = palette.bg_dark }
  highlights.TabLineFill = { bg = palette.bg_dark }
  highlights.TabLineSel = { fg = palette.fg, bg = palette.bg }
  highlights.WinSeparator = { fg = palette.border }
  highlights.VertSplit = { fg = palette.border }
  highlights.Folded = { fg = palette.comment, bg = palette.fold }
  highlights.FoldColumn = { fg = palette.comment }
  highlights.SignColumn = { fg = palette.fg, bg = options.transparent and palette.none or palette.bg }
  highlights.Directory = { fg = palette.blue }
  highlights.Title = { fg = palette.bright_blue, bold = true }
  highlights.ErrorMsg = { fg = palette.error }
  highlights.WarningMsg = { fg = palette.warning }
  highlights.Question = { fg = palette.cyan }
  highlights.MoreMsg = { fg = palette.cyan }
  highlights.ModeMsg = { fg = palette.cyan }

  -- Telescope
  highlights.TelescopeNormal = { fg = palette.fg, bg = palette.bg }
  highlights.TelescopeBorder = { fg = palette.border, bg = palette.bg }
  highlights.TelescopeTitle = { fg = palette.bright_cyan, bold = true }
  highlights.TelescopePromptTitle = { fg = palette.bright_yellow, bold = true }
  highlights.TelescopeResultsTitle = { fg = palette.bright_blue, bold = true }
  highlights.TelescopePreviewTitle = { fg = palette.bright_green, bold = true }
  highlights.TelescopePromptNormal = { fg = palette.fg, bg = palette.bg_dark }
  highlights.TelescopePromptBorder = { fg = palette.border, bg = palette.bg_dark }
  highlights.TelescopePromptPrefix = { fg = palette.bright_cyan }
  highlights.TelescopeSelection = { fg = palette.bright_white, bg = palette.bg_light }
  highlights.TelescopeSelectionCaret = { fg = palette.bright_yellow, bg = palette.bg_light }
  highlights.TelescopeMultiSelection = { fg = palette.bright_yellow, bg = palette.bg_light }
  highlights.TelescopeMatching = { fg = palette.bright_yellow, bold = true }

  -- Terminal colors
  if options.terminal_colors then
    vim.g.terminal_color_0 = palette.black
    vim.g.terminal_color_1 = palette.red
    vim.g.terminal_color_2 = palette.green
    vim.g.terminal_color_3 = palette.yellow
    vim.g.terminal_color_4 = palette.blue
    vim.g.terminal_color_5 = palette.magenta
    vim.g.terminal_color_6 = palette.cyan
    vim.g.terminal_color_7 = palette.white
    vim.g.terminal_color_8 = palette.bright_black
    vim.g.terminal_color_9 = palette.bright_red
    vim.g.terminal_color_10 = palette.bright_green
    vim.g.terminal_color_11 = palette.bright_yellow
    vim.g.terminal_color_12 = palette.bright_blue
    vim.g.terminal_color_13 = palette.bright_magenta
    vim.g.terminal_color_14 = palette.bright_cyan
    vim.g.terminal_color_15 = palette.bright_white
  end

  return highlights
end

return M