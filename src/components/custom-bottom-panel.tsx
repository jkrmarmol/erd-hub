import { useEffect } from "react"
import Image from "next/image"
import { Panel } from "@xyflow/react"
import { motion } from "framer-motion"
import { panelToolsBottom } from "@/constant/panelToolsBottom"
import { useAppDispatch, useAppSelector } from "@/hook/useTypedSelector"
import { setSelectedTool } from "@/store/toolSlice"
import { Tooltip } from "@heroui/tooltip"
import { Button } from "@heroui/button"

export default function CustomBottomPanel() {
  const dispatch = useAppDispatch()
  const selectSelectedTool = useAppSelector((state) => state.tool.selectedTool)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key === "v") dispatch(setSelectedTool("SELECT"))
      else if (key === "h") dispatch(setSelectedTool("HAND"))
      else if (key === "t") dispatch(setSelectedTool("TEXT"))
      else if (key === "c") dispatch(setSelectedTool("CONNECT"))
      else if (key === "p") dispatch(setSelectedTool("DRAW"))
      else if (key === "f") dispatch(setSelectedTool("FRAME"))
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [dispatch])

  return (
    <Panel
      position="bottom-center"
      className="bg-opacity-90 relative flex items-center justify-evenly gap-1 rounded-sm border border-gray-100 bg-white px-2 py-1.5 shadow-sm backdrop-blur-sm"
    >
      {panelToolsBottom.map((tool, index) => {
        const isSelected = selectSelectedTool === tool.name
        return (
          <Tooltip
            key={index}
            content={
              <span className="flex items-center gap-1">
                {tool.tooltip}
                {tool.shortcut && (
                  <span className="rounded bg-gray-800 px-1 text-sm font-bold">
                    {tool.shortcut}
                  </span>
                )}
              </span>
            }
            showArrow={true}
            placement="bottom"
            color="foreground"
          >
            <Button
              size="sm"
              isIconOnly
              variant="light"
              className="group relative flex h-9 w-9 cursor-pointer items-center justify-center data-[hover=true]:bg-inherit"
              onPress={() => dispatch(setSelectedTool(tool.name))}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedToolBackground"
                  className="absolute inset-0 rounded-md bg-gray-100 shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)]"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  height={20}
                  width={20}
                  className={`transition-transform ${isSelected ? "" : "group-hover:scale-110"}`}
                />
              </div>
            </Button>
          </Tooltip>
        )
      })}
    </Panel>
  )
}
