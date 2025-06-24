import { memo } from "react"
import { type NodeProps, type Node, Handle, Position } from "@xyflow/react"
import type { TableNodeData } from "@/types/type"
import { useAppDispatch } from "@/hook/useTypedSelector"
import { setSelectedNode } from "@/store/nodeSlice"

const arePropsEqual = (
  prevProps: NodeProps<Node<TableNodeData>>,
  nextProps: NodeProps<Node<TableNodeData>>
) => {
  return (
    prevProps.id === nextProps.id && prevProps.selected === nextProps.selected
  )
}

const TableNodeV4 = (props: NodeProps<Node<TableNodeData>>) => {
  const dispatch = useAppDispatch()
  if (props.selected) {
    dispatch(setSelectedNode(props.id))
  }
  return (
    <div
      className={`relative ${props.selected ? "outline-2 outline-blue-500" : ""}`}
    >
      <div className="relative w-[280px] bg-white">
        <div className="bg-black px-4 py-3">
          <h3 className="text-center text-[0.95rem] font-bold tracking-wide text-white">
            {props.data.name}
          </h3>
        </div>

        <div className="px-4">
          {props.data.columns?.map((column, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-between py-2.5 ${
                index !== (props.data.columns?.length ?? 0) - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <p className="text-[0.9rem] font-medium">
                  {column.name}
                  {column.isForeignKey && (
                    <span className="text-primary ml-1.5">FK</span>
                  )}
                </p>
              </div>

              <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                {column.type}
              </p>

              {column.name === "id" && (
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${props.data.name}-${column.name}`}
                  className="invisible right-10 h-2 w-2 rounded-full border-2 border-white !bg-black"
                  style={{
                    right: -16,
                    top: "50%",
                  }}
                />
              )}
              {column.isForeignKey && (
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${props.data.name}-${column.name}`}
                  className="invisible left-10 h-2 w-2 rounded-full border-2 border-white !bg-black"
                  style={{
                    left: -16,
                    top: "50%",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(TableNodeV4, arePropsEqual)
