import { Panel } from "@xyflow/react";
export default function CustomLeftPanel() {
  return (
    <Panel
      position="center-left"
      className="bg-white rounded-sm shadow-xs flex flex-col items-start justify-start gap-2 p-3 backdrop-blur-sm bg-opacity-100 w-[180px] overflow-hidden h-[90vh]"
    ></Panel>
  );
}
