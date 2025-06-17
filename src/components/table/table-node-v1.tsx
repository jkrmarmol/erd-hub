import { type NodeProps, type Node, Handle, Position } from "@xyflow/react";
import type { TableNodeData } from "@/types/type";

export default function TableNodeV2(props: NodeProps<Node<TableNodeData>>) {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md w-72">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <p className="text-gray-900 font-medium text-sm">{props.data.name}</p>
      </div>

      <div className="px-4">
        {props.data.columns?.map((column, index) => (
          <div
            className={`flex items-center justify-between py-2.5 relative ${
              index !== (props.data.columns?.length ?? 0) - 1
                ? "border-b border-gray-100"
                : ""
            }`}
            key={index}
          >
            <div className="flex items-center gap-2">
              <p className="text-gray-700 text-sm flex items-center gap-1.5">
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
            <p className="text-gray-500 text-xs font-medium uppercase">
              {column.type}
            </p>

            {column.name === "id" && (
              <Handle
                type="source"
                position={Position.Right}
                id={`${props.data.name}-${column.name}`}
                className="w-2 h-2 bg-blue-500 right-0 rounded-full border-2 border-white"
                style={{ right: -4, top: "50%" }}
                isConnectable={true}
              />
            )}

            {column.isForeignKey && (
              <Handle
                type="target"
                position={Position.Left}
                id={`${props.data.name}-${column.name}`}
                className="w-2 h-2 bg-blue-500 left-0 rounded-full border-2 border-white"
                style={{ left: -4, top: "50%" }}
                isConnectable={true}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
