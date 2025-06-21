import { type NodeProps, type Node, Handle, Position } from "@xyflow/react";
import type { TableNodeData } from "@/types/type";

export default function TableNodeV4(props: NodeProps<Node<TableNodeData>>) {
  return (
    <div
      className={`relative ${props.selected ? "outline-2 outline-blue-500" : ""}`}
    >
      <div className="relative bg-white   w-[280px]">
        <div className="px-4 py-3  bg-black">
          <h3 className="text-center font-bold text-[0.95rem] tracking-wide text-white">
            {props.data.name}
          </h3>
        </div>

        <div className="px-4">
          {props.data.columns?.map((column, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-2.5 relative ${
                index !== (props.data.columns?.length ?? 0) - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <p className="text-[0.9rem] font-medium">
                  {column.name}
                  {column.isForeignKey && (
                    <span className="ml-1.5 text-primary">FK</span>
                  )}
                </p>
              </div>

              <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                {column.type}
              </p>

              {column.name === "id" && (
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${props.data.name}-${column.name}`}
                  className="w-2 h-2 !bg-black right-0 rounded-full border-2 border-white"
                  style={{ right: -5, top: "50%" }}
                />
              )}
              {column.isForeignKey && (
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${props.data.name}-${column.name}`}
                  className="w-2 h-2 !bg-black left-0 rounded-full border-2 border-white"
                  style={{ left: -5, top: "50%" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
