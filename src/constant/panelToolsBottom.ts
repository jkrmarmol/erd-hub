import type { Tools } from "@/types/redux";

export const panelToolsBottom: Array<Tools> = [
  {
    id: 1,
    icon: "/svg/cursor.svg",
    tooltip: "Select",
    shortcut: "V",
    name: "SELECT",
  },
  {
    id: 2,
    icon: "/svg/pan.svg",
    tooltip: "Hand Tool",
    shortcut: "H",
    name: "HAND",
  },
  {
    id: 3,
    icon: "/svg/text.svg",
    tooltip: "Text",
    shortcut: "T",
    name: "TEXT",
  },
  {
    id: 4,
    icon: "/svg/file.svg",
    tooltip: "Add Table",
    shortcut: "",
    name: "ADD_TABLE",
  },
  {
    id: 5,
    icon: "/svg/shape.svg",
    tooltip: "Shapes",
    shortcut: "",
    name: "SHAPE",
  },
  {
    id: 6,
    icon: "/svg/arrow.svg",
    tooltip: "Connect",
    shortcut: "C",
    name: "CONNECT",
  },
  {
    id: 7,
    icon: "/svg/pen.svg",
    tooltip: "Draw",
    shortcut: "P",
    name: "DRAW",
  },
  {
    id: 8,
    icon: "/svg/frame.svg",
    tooltip: "Frame",
    shortcut: "F",
    name: "FRAME",
  },
];
