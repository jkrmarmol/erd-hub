import { Panel } from "@xyflow/react"
import Image from "next/image"
import { panelToolsTop } from "@/constant/panelToolsTop"
import { Button } from "@heroui/button"
import { Tooltip } from "@heroui/tooltip"

export default function CustomTopPanel() {
  return (
    <Panel
      position="top-right"
      className="bg-opacity-90 relative flex items-center justify-evenly gap-1 rounded-sm border border-gray-100 bg-white p-1 shadow-sm backdrop-blur-sm"
    >
      {panelToolsTop.map((tool, index) => {
        return (
          <Tooltip
            key={index}
            content={tool.tooltip}
            showArrow={true}
            placement="bottom"
            color="foreground"
          >
            <Button
              variant="light"
              color="default"
              size="sm"
              isIconOnly
              className="h-9 w-9"
            >
              <Image src={tool.icon} alt={tool.name} height={20} width={20} />
            </Button>
          </Tooltip>
        )
      })}
    </Panel>
  )
}
