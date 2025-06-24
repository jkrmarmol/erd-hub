import React from "react"
import { type Edge, type EdgeProps, getBezierPath } from "@xyflow/react"
import type { TableNodeData } from "@/types/type"

export default function ForeignKeyEdge(props: EdgeProps<Edge<TableNodeData>>) {
  const [edgePath] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    curvature: 1,
  })

  return (
    <>
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

      <svg style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <marker
            id="many-right"
            viewBox="0 0 20 20"
            refX="8"
            refY="10"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <path
              d="M0 10 L10 0 M0 10 L10 10 M0 10 L10 20"
              stroke="#1A192B"
              strokeWidth="2"
              fill="none"
            />
          </marker>
        </defs>
      </svg>

      <svg style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <marker
            id="many-left"
            viewBox="0 0 20 20"
            refX="12"
            refY="10"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <path
              d="M20 10 L10 0 M20 10 L10 10 M20 10 L10 20"
              stroke="#1A192B"
              strokeWidth="2"
              fill="none"
            />
          </marker>
        </defs>
      </svg>

      <svg style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <marker
            id="one-left"
            viewBox="0 0 10 10"
            refX="2 "
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M10 0 L0 5 L10 10 Z" fill="#1A192B" />
          </marker>
        </defs>
      </svg>

      <svg style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <marker
            id="one-right"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill="#1A192B" />
          </marker>
        </defs>
      </svg>

      <svg style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <marker
            id="circle"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <circle cx="5" cy="5" r="4" fill="#000" />
          </marker>
        </defs>
      </svg>
    </>
  )
}
