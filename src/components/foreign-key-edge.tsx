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
    curvature: 0.5,
  });

  return (
    <path
      id={props.id}
      d={edgePath}
      style={{
        ...props.style,
        stroke: "#000",
        strokeWidth: 2,
        fill: "none",
      }}
      className="react-flow__edge-path"
      markerEnd={props.markerEnd}
      markerStart={props.markerStart}
    />
  );
}
