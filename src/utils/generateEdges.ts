import type { Node, Edge } from "@xyflow/react";
import type { TableNodeData } from "@/types/type";
import { MarkerType } from "@xyflow/react";

export function generateEdges(nodes: Array<Node<TableNodeData>>): Array<Edge<{ name: string; referenceType: string }>> {
  const edges: Array<Edge<{ name: string; referenceType: string }>> = [];

  nodes.forEach((targetNode) => {
    targetNode.data.columns?.forEach((column) => {
      if (column.isForeignKey && column.reference) {
        const sourceNode = nodes.find((node) => node.data.name === column.reference?.table);

        if (sourceNode) {
          const sourceHandle = `${sourceNode.data.name}-${column.reference.column}`;
          const targetHandle = `${targetNode.data.name}-${column.name}`;

          switch (column.reference.type) {
            case "ONE-TO-ONE":
              edges.push({
                id: `${sourceNode.id}-${targetNode.id}-${column.name}`,
                source: sourceNode.id,
                target: targetNode.id,
                sourceHandle,
                targetHandle,
                type: "foreignKeyEdge",
                style: { strokeWidth: 2 },
                data: {
                  name: "FK",
                  referenceType: column.reference.type,
                },
              });
              break;

            case "ONE-TO-MANY":
              edges.push({
                id: `${sourceNode.id}-${targetNode.id}-${column.name}`,
                source: sourceNode.id,
                target: targetNode.id,
                sourceHandle,
                targetHandle,
                type: "foreignKeyEdge",
                style: { strokeWidth: 2 },
                markerEnd: {
                  type: MarkerType.Arrow,
                  width: 10,
                  height: 10,
                  color: "#667",
                },
                data: {
                  name: "FK",
                  referenceType: column.reference.type,
                },
              });
              break;

            case "MANY-TO-ONE":
              edges.push({
                id: `${targetNode.id}-${sourceNode.id}-${column.name}`,
                source: targetNode.id,
                target: sourceNode.id,
                sourceHandle: targetHandle,
                targetHandle: sourceHandle,
                type: "foreignKeyEdge",
                style: { strokeWidth: 2 },
                markerEnd: {
                  type: MarkerType.Arrow,
                  width: 10,
                  height: 10,
                  color: "#667",
                },
                data: {
                  name: "FK",
                  referenceType: column.reference.type,
                },
              });
              break;

            case "MANY-TO-MANY":
              edges.push({
                id: `${sourceNode.id}-${targetNode.id}-${column.name}-forward`,
                source: sourceNode.id,
                target: targetNode.id,
                sourceHandle,
                targetHandle,
                type: "foreignKeyEdge",
                style: { strokeWidth: 2 },
                markerStart: {
                  type: MarkerType.Arrow,
                  width: 10,
                  height: 10,
                  color: "#667",
                },
                markerEnd: {
                  type: MarkerType.Arrow,
                  width: 10,
                  height: 10,
                  color: "#667",
                },
                data: {
                  name: "FK",
                  referenceType: column.reference.type,
                },
              });

              edges.push({
                id: `${targetNode.id}-${sourceNode.id}-${column.name}-backward`,
                source: targetNode.id,
                target: sourceNode.id,
                sourceHandle: targetHandle,
                targetHandle: sourceHandle,
                type: "foreignKeyEdge",
                style: { strokeWidth: 2 },
                markerStart: {
                  type: MarkerType.Arrow,
                  width: 10,
                  height: 10,
                  color: "#667",
                },
                markerEnd: {
                  type: MarkerType.Arrow,
                  width: 10,
                  height: 10,
                  color: "#667",
                },
                data: {
                  name: "FK",
                  referenceType: column.reference.type,
                },
              });
              break;

            default:
              console.error("Unknown reference type:", column.reference.type);
              break;
          }
        }
      }
    });
  });

  return edges;
}
