import type { TableNodeData } from "@/types/type";
import type { Node } from "@xyflow/react";

export const initialNodes: Array<Node<TableNodeData>> = [
  {
    id: "1",
    type: "tableNode",
    position: { x: 0, y: 0 },
    data: {
      name: "users",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "email",
          type: "VARCHAR(255)",
          isUnique: true,
        },
        {
          name: "password",
          type: "VARCHAR(255)",
        },
        {
          name: "created_at",
          type: "TIMESTAMP",
          defaultValue: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          type: "TIMESTAMP",
        },
      ],
      description: "This table stores user.",
    },
  },
  {
    id: "2",
    type: "tableNode",
    position: { x: 350, y: 0 },
    data: {
      name: "information",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "user_id",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "users",
            column: "id",
            type: "ONE-TO-MANY",
          },
        },
        {
          name: "first_name",
          type: "VARCHAR",
          isNullable: false,
        },
        {
          name: "last_name",
          type: "VARCHAR",
          isNullable: false,
        },
        {
          name: "phone_number",
          type: "VARCHAR(15)",
          isNullable: true,
        },
        {
          name: "created_at",
          type: "TIMESTAMP",
          defaultValue: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          type: "TIMESTAMP",
        },
      ],
      description: "This table stores user information.",
    },
  },
];
