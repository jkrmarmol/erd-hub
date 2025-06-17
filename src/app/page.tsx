"use client";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Connection,
} from "@xyflow/react";
import TableNode from "@/components/table-node";
import { initialNodes } from "@/constant/initialNodes";
import { initialEdges } from "@/constant/initialEdges";
import ForeignKeyEdge from "@/components/foreign-key-edge";
import "@xyflow/react/dist/style.css";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge({ ...params, type: "foreignKeyEdge" }, eds));
  };

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodeTypes={{
          tableNode: TableNode,
        }}
        edgeTypes={{
          foreignKeyEdge: ForeignKeyEdge,
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
