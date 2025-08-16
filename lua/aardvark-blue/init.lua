local M = {}

local palette = require("aardvark-blue.palette")
local config = require("aardvark-blue.config")
local highlights = require("aardvark-blue.highlights")

function M.setup(options)
  config.setup(options)
end

function M.load()
  if vim.version().minor < 8 then
    vim.notify("aardvark-blue.nvim: Neovim 0.8+ is required", vim.log.levels.ERROR)
    return
  end

  -- Ensure config is initialized with defaults
  if not config.options then
    config.setup({})
  end

  -- Reset highlighting
  vim.cmd("hi clear")
  if vim.fn.exists("syntax_on") then
    vim.cmd("syntax reset")
  end

  -- Set colorscheme name
  vim.g.colors_name = "aardvark-blue"

  -- Apply highlights
  local hl = highlights.setup(palette, config.options)
  
  -- Apply user customizations
  if config.options.on_highlights then
    hl = vim.tbl_deep_extend("force", hl, config.options.on_highlights(hl, palette) or {})
  end

  -- Set highlights
  for group, settings in pairs(hl) do
    vim.api.nvim_set_hl(0, group, settings)
  end
end

function M.colorscheme()
  M.load()
end

return M