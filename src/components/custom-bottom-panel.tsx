import { useEffect, useState } from "react";
import Image from "next/image";
import { Panel } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { panelToolsBottom } from "@/constant/panelToolsBottom";
import { useAppDispatch, useAppSelector } from "@/hook/useTypedSelector";
import { setSelectedTool } from "@/store/toolSlice";

export default function CustomBottomPanel() {
  const dispatch = useAppDispatch();
  const selectSelectedTool = useAppSelector((state) => state.tool.selectedTool);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "v") dispatch(setSelectedTool("SELECT"));
      else if (key === "h") dispatch(setSelectedTool("HAND"));
      else if (key === "t") dispatch(setSelectedTool("TEXT"));
      else if (key === "c") dispatch(setSelectedTool("CONNECT"));
      else if (key === "p") dispatch(setSelectedTool("DRAW"));
      else if (key === "f") dispatch(setSelectedTool("FRAME"));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <Panel
      position="bottom-center"
      className="bg-white rounded-sm shadow-sm flex items-center justify-evenly gap-1 px-2 py-1.5 backdrop-blur-sm bg-opacity-90 border border-gray-100 relative"
    >
      {panelToolsBottom.map((tool) => {
        const isSelected = selectSelectedTool === tool.name;
        return (
          <div
            key={tool.id}
            className="cursor-pointer h-9 w-9 flex items-center justify-center relative group"
            onClick={() => dispatch(setSelectedTool(tool.name))}
            onMouseEnter={() => setHoveredTool(tool.name)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            {isSelected && (
              <motion.div
                layoutId="selectedToolBackground"
                className="absolute inset-0 bg-gray-100 rounded-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)]"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <Image
                src={tool.icon}
                alt={tool.name}
                height={20}
                width={20}
                className={`transition-transform ${isSelected ? "" : "group-hover:scale-110"}`}
              />
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
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap shadow-lg z-50"
                >
                  <motion.div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
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
