import { Panel } from "@xyflow/react";
import Image from "next/image";
import { panelToolsTop } from "@/constant/panelToolsTop";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

export default function CustomTopPanel() {
  return (
    <Panel
      position="top-right"
      className="bg-white rounded-sm shadow-sm flex items-center justify-evenly gap-1 p-1 backdrop-blur-sm bg-opacity-90 border border-gray-100 relative"
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
        );
      })}
    </Panel>
  );
}
