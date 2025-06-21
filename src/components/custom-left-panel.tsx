import { Panel } from "@xyflow/react"
export default function CustomLeftPanel() {
  return (
    <Panel
      position="center-left"
      className="bg-opacity-100 flex h-[90vh] w-[180px] flex-col items-start justify-start gap-2 overflow-hidden rounded-sm bg-white p-3 shadow-xs backdrop-blur-sm"
    ></Panel>
  )
}
