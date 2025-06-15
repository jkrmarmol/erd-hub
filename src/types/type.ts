export type ColumnDataType =
  // Numeric types
  | "INT"
  | "INTEGER"
  | "SMALLINT"
  | "BIGINT"
  | "TINYINT"
  | "MEDIUMINT"
  | "DECIMAL"
  | "NUMERIC"
  | "FLOAT"
  | "DOUBLE"
  | "REAL"
  // String types
  | "CHAR"
  | "VARCHAR"
  | "TEXT"
  | "TINYTEXT"
  | "MEDIUMTEXT"
  | "LONGTEXT"
  | "BINARY"
  | "VARBINARY"
  | "BLOB"
  | "TINYBLOB"
  | "MEDIUMBLOB"
  | "LONGBLOB"
  // Date and time types
  | "DATE"
  | "TIME"
  | "DATETIME"
  | "TIMESTAMP"
  | "YEAR"
  // Boolean type
  | "BOOLEAN"
  | "BOOL"
  // JSON type
  | "JSON"
  // Other common types
  | "UUID"
  | "ENUM"
  | "SET"
  | "SERIAL"
  // Allow for parameterized types like VARCHAR(255)
  | `VARCHAR(${number})`
  | `CHAR(${number})`
  | `DECIMAL(${number},${number})`
  | `NUMERIC(${number},${number})`
  | `ENUM(${string})`
  | `SET(${string})`;

export type ReferenceType = "ONE-TO-ONE" | "ONE-TO-MANY" | "MANY-TO-ONE" | "MANY-TO-MANY";

export type Column = {
  name: string;
  type?: ColumnDataType;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  defaultValue?: string | null;
  reference?: {
    table: string;
    column: string;
    type: ReferenceType;
  };
};

export type TableNodeData = {
  name: string;
  columns?: Column[];
  description?: string;
};
