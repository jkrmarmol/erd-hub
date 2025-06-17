import { useEffect, useState } from "react";
import { Panel } from "@xyflow/react";
import Image from "next/image";
import { Tooltip } from "./ui/tooltip";

export default function CustomPanel() {
  const [selectedTool, setSelectedTool] = useState("cursor");
  const tools = [
    { id: "cursor", icon: "/svg/cursor.svg", tooltip: "Select (V)" },
    { id: "pan", icon: "/svg/pan.svg", tooltip: "Hand Tool (H)" },
    { id: "text", icon: "/svg/text.svg", tooltip: "Text (T)" },
    { id: "file", icon: "/svg/file.svg", tooltip: "Add Table" },
    { id: "shape", icon: "/svg/shape.svg", tooltip: "Shapes" },
    { id: "arrow", icon: "/svg/arrow.svg", tooltip: "Connect (C)" },
    { id: "pen", icon: "/svg/pen.svg", tooltip: "Draw (P)" },
    { id: "frame", icon: "/svg/frame.svg", tooltip: "Frame (F)" },
  ];

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "v") setSelectedTool("cursor");
      else if (key === "h") setSelectedTool("pan");
      else if (key === "t") setSelectedTool("text");
      else if (key === "c") setSelectedTool("arrow");
      else if (key === "p") setSelectedTool("pen");
      else if (key === "f") setSelectedTool("frame");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Panel
      position="bottom-center"
      className="bg-white rounded-lg shadow-2xl flex items-center justify-evenly gap-1 px-2 py-1.5 backdrop-blur-sm bg-opacity-90 border border-gray-100"
    >
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="cursor-pointer h-9 w-9 flex items-center justify-center relative group"
          onClick={() => setSelectedTool(tool.id)}
        >
          <div
            className={`flex items-center justify-center w-full h-full rounded-md
              ${
                selectedTool === tool.id
                  ? "bg-gray-200 shadow-inner"
                  : "hover:bg-gray-100 active:scale-95"
              }
              transition-all duration-200 ease-out`}
          >
            <Image
              src={tool.icon}
              alt={tool.id}
              height={20}
              width={20}
              className={`transition-transform ${selectedTool === tool.id ? "" : "group-hover:scale-110"}`}
            />
          </div>

          {/* Simple tooltip */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {tool.tooltip}
          </div>
        </div>
      ))}
    </Panel>
  );
}
