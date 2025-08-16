local palette = {
  -- Base colors
  bg = "#102040",
  fg = "#dddddd",
  cursor = "#007acc",
  selection = "#bfdbfe",

  -- ANSI colors (normal)
  black = "#191919",
  red = "#aa342e",
  green = "#4b8c0f",
  yellow = "#dbba00",
  blue = "#1370d3",
  magenta = "#c43ac3",
  cyan = "#008eb0",
  white = "#bebebe",

  -- ANSI colors (bright)
  bright_black = "#454545",
  bright_red = "#f05b50",
  bright_green = "#95dc55",
  bright_yellow = "#ffe763",
  bright_blue = "#60a4ec",
  bright_magenta = "#e26be2",
  bright_cyan = "#60b6cb",
  bright_white = "#f7f7f7",

  -- UI colors (derived from palette)
  bg_dark = "#0a1530",
  bg_light = "#1a3050",
  border = "#2a4060",
  comment = "#6a7a8a",
  error = "#f05b50",
  warning = "#ffe763",
  info = "#60a4ec",
  hint = "#60b6cb",
}

-- Additional semantic colors
palette.none = "NONE"
palette.fold = palette.bg_light
palette.visual = palette.selection
palette.search = palette.bright_yellow
palette.line_number = palette.comment
palette.cursor_line = palette.bg_light

return palette