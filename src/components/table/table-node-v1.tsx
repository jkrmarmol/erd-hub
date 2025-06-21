import { type NodeProps, type Node, Handle, Position } from "@xyflow/react"
import type { TableNodeData } from "@/types/type"

export default function TableNodeV2(props: NodeProps<Node<TableNodeData>>) {
  return (
    <div className="w-72 overflow-hidden rounded-lg bg-white shadow-md">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <p className="text-sm font-medium text-gray-900">{props.data.name}</p>
      </div>

      <div className="px-4">
        {props.data.columns?.map((column, index) => (
          <div
            className={`relative flex items-center justify-between py-2.5 ${
              index !== (props.data.columns?.length ?? 0) - 1
                ? "border-b border-gray-100"
                : ""
            }`}
            key={index}
          >
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-1.5 text-sm text-gray-700">
                {column.name}
                {column.isForeignKey && (
                  <span className="text-blue-500">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </p>
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase">
              {column.type}
            </p>

            {column.name === "id" && (
              <Handle
                type="source"
                position={Position.Right}
                id={`${props.data.name}-${column.name}`}
                className="right-0 h-2 w-2 rounded-full border-2 border-white bg-blue-500"
                style={{
                  right: -4,
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
                className="left-0 h-2 w-2 rounded-full border-2 border-white bg-blue-500"
                style={{
                  left: -4,
                  top: "50%",
                }}
                isConnectable={true}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
