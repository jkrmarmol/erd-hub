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
    curvature: 0.8,
  });

  return (
    <>
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
      />
      {props.data?.name && (
        <text>
          <textPath
            href={`#${props.id}`}
            style={{ fontSize: "11px", fill: "#555", fontWeight: 500 }}
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="text-before-edge"
          >
            {props.data.name}
          </textPath>
        </text>
      )}
    </>
  );
}
