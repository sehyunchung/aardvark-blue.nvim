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
  highlights.Normal = { fg = "#dddddd", bg = options.transparent and palette.none or "#102040" }
  highlights.NormalFloat = { fg = "#dddddd", bg = options.transparent and palette.none or "#0a1530" }
  highlights.LineNr = { fg = "#6a7a8a" }
  highlights.CursorLine = { bg = "#1a3050" }
  highlights.Visual = { bg = "#bfdbfe" }
  highlights.Search = { fg = "#102040", bg = "#ffe763" }

  -- Syntax highlighting
  highlights.Comment = vim.tbl_extend("force", { fg = "#6a7a8a" }, styles.comments)
  highlights.String = { fg = "#95dc55" }
  highlights.Number = { fg = "#60a4ec" }
  highlights.Boolean = { fg = "#f05b50" }
  highlights.Function = vim.tbl_extend("force", { fg = "#ffe763" }, styles.functions)
  highlights.Identifier = vim.tbl_extend("force", { fg = "#dddddd" }, styles.variables)
  highlights.Keyword = vim.tbl_extend("force", { fg = "#c43ac3" }, styles.keywords)
  highlights.Type = { fg = "#60b6cb" }
  highlights.Operator = { fg = "#60b6cb" }

  -- TreeSitter highlights
  highlights["@variable"] = highlights.Identifier
  highlights["@string"] = { fg = "#95dc55" }
  highlights["@number"] = { fg = "#60a4ec" }
  highlights["@function"] = { fg = "#ffe763" }
  highlights["@keyword"] = highlights.Keyword
  highlights["@keyword.function"] = { fg = "#60a4ec" }
  highlights["@keyword.operator"] = { fg = "#c43ac3" }
  highlights["@type"] = { fg = "#60b6cb" }

  -- TypeScript specific highlights
  highlights["@keyword.modifier"] = { fg = "#dbba00" }
  highlights["@keyword.type"] = { fg = "#c43ac3" }
  highlights["@keyword.operator.typescript"] = { fg = "#008eb0" }
  highlights["@attribute"] = { fg = "#008eb0" }

  -- JSX/TSX specific highlights
  highlights["@tag.tsx"] = { fg = "#60a4ec" }
  highlights["@tag.builtin.tsx"] = { fg = "#1370d3" }
  highlights["@tag.attribute.tsx"] = { fg = "#ffe763" }
  highlights["@tag.delimiter.tsx"] = { fg = "#bebebe" }
  highlights["@variable.member.tsx"] = { fg = "#60a4ec" }

  return highlights
end

return M