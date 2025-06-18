export type ToolNames =
  | "SELECT"
  | "HAND"
  | "TEXT"
  | "ADD_TABLE"
  | "SHAPE"
  | "CONNECT"
  | "DRAW"
  | "FRAME";

export type Tools = {
  id: number;
  icon: string;
  tooltip: string;
  shortcut: string;
  name: ToolNames;
};

export type ToolSliceInitialState = {
  selectedTool: ToolNames;
};
