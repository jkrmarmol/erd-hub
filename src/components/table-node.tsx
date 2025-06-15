import { type NodeProps, type Node, Handle, Position } from "@xyflow/react";
import type { TableNodeData } from "@/types/type";

export default function TableNode(props: NodeProps<Node<TableNodeData>>) {
  return (
    <div className="border border-black p-2 w-72 bg-white relative">
      <p className="text-center font-bold border-b pb-2">{props.data.name}</p>
      {props.data.columns?.map((column, index) => (
        <div className="flex items-center justify-between border-t py-1 relative" key={index}>
          <p className="flex items-center">
            {column.name}
            {column.isForeignKey && " 🔗"}
          </p>
          <p className="text-gray-600 text-sm">{column.type}</p>

          {column.name === "id" && (
            <Handle
              type="source"
              position={Position.Right}
              id={`${props.data.name}-${column.name}`}
              className="w-3 h-3 bg-blue-500 right-0"
              style={{ right: -5, top: "50%" }}
              isConnectable={true}
            />
          )}

          {column.isForeignKey && (
            <Handle
              type="target"
              position={Position.Left}
              id={`${props.data.name}-${column.name}`}
              className="w-3 h-3 bg-green-500 left-0"
              style={{ left: -5, top: "50%" }}
              isConnectable={true}
            />
          )}
        </div>
      ))}
    </div>
  );
}
