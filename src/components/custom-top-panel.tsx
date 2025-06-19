import { useState } from "react";
import { Panel } from "@xyflow/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { panelToolsTop } from "@/constant/panelToolsTop";

export default function CustomTopPanel() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  return (
    <Panel
      position="top-right"
      className="bg-white rounded-sm shadow-sm flex items-center justify-evenly gap-1 px-2 py-1.5 backdrop-blur-sm bg-opacity-90 border border-gray-100 relative"
    >
      {panelToolsTop.map((tool) => {
        return (
          <div
            key={tool.id}
            className="cursor-pointer h-9 w-9 flex items-center justify-center relative group"
            onMouseEnter={() => setHoveredTool(tool.name)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <Image src={tool.icon} alt={tool.name} height={20} width={20} />
            </div>

            <AnimatePresence>
              {hoveredTool === tool.name && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap shadow-lg z-50"
                >
                  <motion.div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                  {tool.tooltip}
                  {tool.shortcut && (
                    <span className="ml-1 text-white bg-gray-600 px-1 rounded-sm">
                      {tool.shortcut}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </Panel>
  );
}
