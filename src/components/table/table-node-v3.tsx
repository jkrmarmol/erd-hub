import { type NodeProps, type Node, Handle, Position } from "@xyflow/react";
import type { TableNodeData } from "@/types/type";
import { motion } from "framer-motion";

export default function TableNodeV3(props: NodeProps<Node<TableNodeData>>) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <motion.div
        className="px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-t-2xl"
        whileHover={{ backgroundColor: "#ec4899" }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-white font-semibold text-[0.95rem] tracking-wide">
          {props.data.name}
        </p>
      </motion.div>

      <div className="px-4 py-2">
        {props.data.columns?.map((column, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between py-2.5 relative group ${
              index !== (props.data.columns?.length ?? 0) - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <p className="text-gray-800 text-[0.9rem] font-medium group-hover:text-pink-600 transition-colors">
                {column.name}
              </p>
              {column.isForeignKey && (
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  className="text-pink-500 text-xs"
                >
                  🔗
                </motion.span>
              )}
            </div>
            <p className="text-gray-500 text-[0.8rem] font-medium uppercase tracking-wider">
              {column.type}
            </p>

            {column.name === "id" && (
              <motion.div
                whileHover={{ scale: 1.5 }}
                className="absolute right-0"
              >
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${props.data.name}-${column.name}`}
                  className="w-2 h-2 bg-pink-500 right-0 rounded-full border-2 border-white shadow-md"
                  style={{ right: -4, top: "50%" }}
                  isConnectable={true}
                />
              </motion.div>
            )}

            {column.isForeignKey && (
              <motion.div
                whileHover={{ scale: 1.5 }}
                className="absolute left-0"
              >
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${props.data.name}-${column.name}`}
                  className="w-2 h-2 bg-pink-500 left-0 rounded-full border-2 border-white shadow-md"
                  style={{ left: -4, top: "50%" }}
                  isConnectable={true}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
