import { type NodeProps, type Node, Handle, Position } from "@xyflow/react"
import type { TableNodeData } from "@/types/type"

export default function TableNodeV2(props: NodeProps<Node<TableNodeData>>) {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-black/90" />

      <div className="relative w-[280px] border-2 border-black bg-white">
        <div className="border-b-2 border-black bg-gray-50 px-4 py-3">
          <h3 className="text-center text-[0.95rem] font-bold tracking-wide">
            {props.data.name}
          </h3>
        </div>

        <div className="px-4">
          {props.data.columns?.map((column, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-between py-2.5 ${
                index !== (props.data.columns?.length ?? 0) - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <p className="text-[0.9rem] font-medium">
                  {column.name}
                  {column.isForeignKey && (
                    <span className="ml-1.5 text-blue-600">FK</span>
                  )}
                </p>
              </div>

              <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                {column.type}
              </p>

              {column.name === "id" && (
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${props.data.name}-${column.name}`}
                  className="right-0 h-2 w-2 rounded-full border-2 border-white !bg-blue-500"
                  style={{
                    right: -5,
                    top: "50%",
                  }}
                  isConnectable={true}
                />
              )}
              {column.isForeignKey && (
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${props.data.name}-${column.name}`}
                  className="left-0 h-2 w-2 rounded-full border-2 border-white !bg-blue-500"
                  style={{
                    left: -5,
                    top: "50%",
                  }}
                  isConnectable={true}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
