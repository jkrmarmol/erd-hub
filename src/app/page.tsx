"use client";
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Connection,
  BackgroundVariant,
} from "@xyflow/react";
import TableNode from "@/components/table-node";
import { initialNodes } from "@/constant/initialNodes";
import { initialEdges } from "@/constant/initialEdges";
import ForeignKeyEdge from "@/components/foreign-key-edge";
import CustomBottomPanel from "@/components/custom-bottom-panel";
import CustomLeftPanel from "@/components/custom-left-panel";
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
        panOnDrag={true}
      >
        <Controls position="bottom-right" orientation="horizontal" />
        <Background
          color="#ccc"
          variant={BackgroundVariant.Dots}
          bgColor="#f2f2f2"
        />
        <CustomBottomPanel />
        <CustomLeftPanel />
      </ReactFlow>
    </div>
  );
}
