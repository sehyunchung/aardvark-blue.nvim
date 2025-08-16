local M = {}

M.defaults = {
  transparent = false,
  terminal_colors = true,
  styles = {
    comments = { italic = true },
    keywords = { bold = true },
    functions = {},
    variables = {},
  },
  on_highlights = function(highlights, colors) end,
}

M.options = {}

function M.setup(options)
  M.options = vim.tbl_deep_extend("force", {}, M.defaults, options or {})
end

function M.extend(options)
  M.options = vim.tbl_deep_extend("force", {}, M.options or M.defaults, options or {})
end

return M