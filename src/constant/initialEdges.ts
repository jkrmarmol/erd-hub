import type { Edge, MarkerType } from "@xyflow/react";

export const initialEdges: Array<Edge> = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "users-id",
    targetHandle: "information-user_id",
    type: "foreignKeyEdge",
    animated: true,
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed" as MarkerType,
      width: 90,
      height: 10,
      color: "#667",
    },
    markerStart: {
      type: "arrowclosed" as MarkerType,
      width: 90,
      height: 10,
      color: "red",
    },
    data: {
      name: "FK",
    },
  },
];
