import React from "react";
import { type Edge, type EdgeProps, getBezierPath } from "@xyflow/react";
import type { TableNodeData } from "@/types/type";

export default function ForeignKeyEdge(props: EdgeProps<Edge<TableNodeData>>) {
  // Calculate a smooth Bezier path between source and target
  const [edgePath] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    curvature: 0.5, // 0.5 is a good value for DBDesigner-like smoothness
  });

  return (
    <path
      id={props.id}
      d={edgePath}
      style={{
        ...props.style,
        stroke: "#000", // blue-500 for visibility
        strokeWidth: 2,
        fill: "none",
      }}
      className="react-flow__edge-path"
      markerEnd={props.markerEnd}
      markerStart={props.markerStart}
    />
  );
}
