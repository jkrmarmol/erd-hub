import type { TableNodeData } from "@/types/type";
import type { NodeProps, Node } from "@xyflow/react";

export default function TableNode(props: NodeProps<Node<TableNodeData>>) {
  return (
    <div className="border border-black p-2 w-72 bg-white">
      <p className="text-center">{props.data.name}</p>
      {props.data.columns?.map((e, index) => (
        <div className="flex items-center justify-between" key={index}>
          <p>{e.name}</p>
          <p>{e.type}</p>
        </div>
      ))}
    </div>
  );
}
