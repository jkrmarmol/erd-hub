import React from "react";
import { type Edge, type EdgeProps, getBezierPath } from "@xyflow/react";
import type { TableNodeData } from "@/types/type";

export default function ForeignKeyEdge(props: EdgeProps<Edge<TableNodeData>>) {
  const [edgePath] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    curvature: 0.3,
  });

  return (
    <path
      id={props.id}
      style={{
        ...props.style,
        stroke: "#888",
        strokeWidth: 1.5,
      }}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={props.markerEnd}
      markerStart={props.markerStart}
    />
  );
}
