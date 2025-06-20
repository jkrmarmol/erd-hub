import type { TableNodeData } from "@/types/type";
import type { Node } from "@xyflow/react";

export const initialNodes: Array<Node<TableNodeData>> = [
  {
    id: "1",
    type: "tableNode",
    position: { x: -253.87778827622134, y: -135.71347207392478 },
    data: {
      name: "users",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "role",
          type: "VARCHAR(255)",
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
    position: { x: 814.2455283162707, y: 293.08814324392057 },
    data: {
      name: "user_information",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "firstName",
          type: "TEXT",
        },
        {
          name: "lastName",
          type: "TEXT",
        },
        {
          name: "userId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "users",
            column: "id",
            type: "ONE-TO-ONE",
          },
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
  {
    id: "3",
    type: "tableNode",
    position: { x: 129.24374999999995, y: 208.84999999999997 },
    data: {
      name: "activity_logs",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "value",
          type: "TEXT",
        },
        {
          name: "usersId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "users",
            column: "id",
            type: "ONE-TO-MANY",
          },
        },
        {
          name: "deviceSensorsId",
          type: "INT",
        },
        {
          name: "userId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "users",
            column: "id",
            type: "ONE-TO-ONE",
          },
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
  {
    id: "4",
    type: "tableNode",
    position: { x: 127.26071735313809, y: -397.89543415409184 },
    data: {
      name: "device_sensor",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "name",
          type: "TEXT",
        },
        {
          name: "type",
          type: "TEXT",
        },
        {
          name: "usersId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "users",
            column: "id",
            type: "MANY-TO-ONE",
          },
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
  {
    id: "5",
    type: "tableNode",
    position: { x: 634.8697308291621, y: -474.3091322417504 },
    data: {
      name: "rooms",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "image",
          type: "TEXT",
        },
        {
          name: "floorNo",
          type: "INT",
        },
        {
          name: "deviceSensorsId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "device_sensor",
            column: "id",
            type: "ONE-TO-ONE",
          },
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
  {
    id: "6",
    type: "tableNode",
    position: { x: 984.9842589141673, y: -61.008908800121695 },
    data: {
      name: "permissions",
      columns: [
        {
          name: "id",
          type: "INT",
        },
        {
          name: "roomId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "rooms",
            column: "id",
            type: "ONE-TO-ONE",
          },
        },
        {
          name: "deviceSensorId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "device_sensor",
            column: "id",
            type: "ONE-TO-ONE",
          },
        },
        {
          name: "usersId",
          type: "INT",
          isForeignKey: true,
          reference: {
            table: "users",
            column: "id",
            type: "ONE-TO-ONE",
          },
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
