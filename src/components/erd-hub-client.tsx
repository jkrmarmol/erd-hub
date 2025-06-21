"use client"
import "@xyflow/react/dist/style.css"
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Connection,
  BackgroundVariant,
  PanOnScrollMode,
} from "@xyflow/react"
import TableNodeV4 from "@/components/table/table-node-v4"
import { initialNodes } from "@/constant/initialNodes"
import { initialEdges } from "@/constant/initialEdges"
import ForeignKeyEdge from "@/components/foreign-key-edge"
import CustomBottomPanel from "@/components/custom-bottom-panel"
import CustomLeftPanel from "@/components/custom-left-panel"
import { useAppSelector } from "@/hook/useTypedSelector"
import CustomTopPanel from "@/components/custom-top-panel"
import EditTableModal from "./edit-table-modal"
import "@xyflow/react/dist/style.css"

export default function ErdHubClient() {
  const selectSelectedTool = useAppSelector((state) => state.tool.selectedTool)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = (params: Connection) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "foreignKeyEdge",
        },
        eds
      )
    )
  }
  return (
    <ReactFlow
      nodeTypes={{
        tableNode: TableNodeV4,
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
      panOnDrag={selectSelectedTool === "HAND"}
      panOnScrollMode={PanOnScrollMode.Horizontal}
    >
      <EditTableModal />
      <Controls position="bottom-right" orientation="horizontal" />
      <Background
        color="#ccc"
        variant={BackgroundVariant.Lines}
        bgColor="#f2f2f2"
        lineWidth={0.3}
      />
      <CustomTopPanel />
      <CustomBottomPanel />
      <CustomLeftPanel />
    </ReactFlow>
  )
}
