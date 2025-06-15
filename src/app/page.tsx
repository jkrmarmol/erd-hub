"use client";
import { Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TableNode from "@/components/table-node";
import { initialNodes } from "@/constant/initialNodes";
import { initialEdges } from "@/constant/initialEdges";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodeTypes={{
          tableNode: TableNode,
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        snapToGrid
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
