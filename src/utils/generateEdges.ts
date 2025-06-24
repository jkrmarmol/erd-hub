import type { Node, Edge } from "@xyflow/react"
import type { TableNodeData } from "@/types/type"

export function generateEdges(nodes: Array<Node<TableNodeData>>): Array<
  Edge<{
    name: string
    referenceType: string
  }>
> {
  const edges: Array<
    Edge<{
      name: string
      referenceType: string
    }>
  > = []

  nodes.forEach((targetNode) => {
    targetNode.data.columns?.forEach((column) => {
      if (column.isForeignKey && column.reference) {
        const sourceNode = nodes.find(
          (node) => node.data.name === column.reference?.table
        )

        if (sourceNode) {
          const sourceHandle = `${sourceNode.data.name}-${column.reference.column}`
          const targetHandle = `${targetNode.data.name}-${column.name}`

          if (column.reference.type === "MANY-TO-MANY") {
            edges.push({
              id: `${sourceNode.id}-${targetNode.id}-${column.name}`,
              source: sourceNode.id,
              target: targetNode.id,
              sourceHandle,
              targetHandle,
              type: "foreignKeyEdge",
              style: {
                strokeWidth: 2,
              },
              markerStart: "many-left",
              markerEnd: "many-right",
            })
          }

          if (column.reference.type === "ONE-TO-ONE") {
            edges.push({
              id: `${sourceNode.id}-${targetNode.id}-${column.name}`,
              source: sourceNode.id,
              target: targetNode.id,
              sourceHandle,
              targetHandle,
              type: "foreignKeyEdge",
              style: {
                strokeWidth: 2,
              },
              markerStart: "one-left",
              markerEnd: "circle",
            })
          }

          if (column.reference.type === "ONE-TO-MANY") {
            edges.push({
              id: `${sourceNode.id}-${targetNode.id}-${column.name}`,
              source: sourceNode.id,
              target: targetNode.id,
              sourceHandle,
              targetHandle,
              type: "foreignKeyEdge",

              style: {
                strokeWidth: 2,
              },
              markerStart: "many-left",
              markerEnd: "circle",
            })
          }

          if (column.reference.type === "MANY-TO-ONE") {
            edges.push({
              id: `${sourceNode.id}-${targetNode.id}-${column.name}`,
              source: sourceNode.id,
              target: targetNode.id,
              sourceHandle,
              targetHandle,
              type: "foreignKeyEdge",
              style: {
                strokeWidth: 2,
              },
              markerStart: "one-left",
              markerEnd: "many-right",
            })
          }

          return true
        }
      }
    })
  })

  return edges
}
