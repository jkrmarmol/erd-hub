export type BottomToolNames =
  | "SELECT"
  | "HAND"
  | "TEXT"
  | "ADD_TABLE"
  | "SHAPE"
  | "CONNECT"
  | "DRAW"
  | "FRAME"

export type BottomTools = {
  id: number
  icon: string
  tooltip: string
  shortcut: string
  name: BottomToolNames
}

export type ToolSliceInitialState = {
  selectedTool: BottomToolNames
}

export type TopToolNames = "EXPORT"

export type TopTools = {
  id: number
  icon: string
  tooltip: string
  shortcut: string
  name: TopToolNames
}
