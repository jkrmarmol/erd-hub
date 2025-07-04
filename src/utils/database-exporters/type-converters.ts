import type { ITypeConverter } from "./types"

/**
 * PostgreSQL Type Converter
 * Single Responsibility: Convert types specifically for PostgreSQL
 */
export class PostgreSQLTypeConverter implements ITypeConverter {
  private static readonly TYPE_MAP: Record<string, string> = {
    INT: "INTEGER",
    TINYINT: "SMALLINT",
    MEDIUMINT: "INTEGER",
    BIGINT: "BIGINT",
    FLOAT: "REAL",
    DOUBLE: "DOUBLE PRECISION",
    DECIMAL: "DECIMAL",
    NUMERIC: "NUMERIC",
    CHAR: "CHAR",
    VARCHAR: "VARCHAR",
    TEXT: "TEXT",
    TINYTEXT: "TEXT",
    MEDIUMTEXT: "TEXT",
    LONGTEXT: "TEXT",
    BLOB: "BYTEA",
    TINYBLOB: "BYTEA",
    MEDIUMBLOB: "BYTEA",
    LONGBLOB: "BYTEA",
    BINARY: "BYTEA",
    VARBINARY: "BYTEA",
    DATE: "DATE",
    TIME: "TIME",
    DATETIME: "TIMESTAMP",
    TIMESTAMP: "TIMESTAMP",
    BOOLEAN: "BOOLEAN",
    BOOL: "BOOLEAN",
    JSON: "JSON",
    UUID: "UUID",
    SERIAL: "SERIAL",
  }

  convert(type: string): string {
    if (type.includes("(")) {
      const baseType = type.split("(")[0]
      const params = type.match(/\(([^)]+)\)/)?.[1]

      if (baseType === "VARCHAR" || baseType === "CHAR") {
        return `${baseType}(${params})`
      } else if (baseType === "DECIMAL" || baseType === "NUMERIC") {
        return `${PostgreSQLTypeConverter.TYPE_MAP[baseType] || baseType}(${params})`
      }
    }

    return PostgreSQLTypeConverter.TYPE_MAP[type] || type
  }
}

/**
 * MySQL Type Converter
 * Single Responsibility: Convert types specifically for MySQL
 */
export class MySQLTypeConverter implements ITypeConverter {
  private static readonly TYPE_MAP: Record<string, string> = {
    INTEGER: "INT",
    SMALLINT: "SMALLINT",
    BIGINT: "BIGINT",
    REAL: "FLOAT",
    "DOUBLE PRECISION": "DOUBLE",
    DECIMAL: "DECIMAL",
    NUMERIC: "DECIMAL",
    CHAR: "CHAR",
    VARCHAR: "VARCHAR",
    TEXT: "TEXT",
    BYTEA: "BLOB",
    DATE: "DATE",
    TIME: "TIME",
    TIMESTAMP: "TIMESTAMP",
    DATETIME: "DATETIME",
    BOOLEAN: "BOOLEAN",
    BOOL: "BOOLEAN",
    JSON: "JSON",
    UUID: "VARCHAR(36)",
    SERIAL: "AUTO_INCREMENT",
  }

  convert(type: string): string {
    if (type.includes("(")) {
      const baseType = type.split("(")[0]
      const params = type.match(/\(([^)]+)\)/)?.[1]

      if (baseType === "VARCHAR" || baseType === "CHAR") {
        return `${baseType}(${params})`
      } else if (baseType === "DECIMAL" || baseType === "NUMERIC") {
        return `DECIMAL(${params})`
      }
    }

    return MySQLTypeConverter.TYPE_MAP[type] || type
  }
}

/**
 * SQLite Type Converter
 * Single Responsibility: Convert types specifically for SQLite
 */
export class SQLiteTypeConverter implements ITypeConverter {
  private static readonly TYPE_MAP: Record<string, string> = {
    INT: "INTEGER",
    INTEGER: "INTEGER",
    TINYINT: "INTEGER",
    SMALLINT: "INTEGER",
    MEDIUMINT: "INTEGER",
    BIGINT: "INTEGER",
    FLOAT: "REAL",
    DOUBLE: "REAL",
    "DOUBLE PRECISION": "REAL",
    DECIMAL: "REAL",
    NUMERIC: "REAL",
    CHAR: "TEXT",
    VARCHAR: "TEXT",
    TEXT: "TEXT",
    TINYTEXT: "TEXT",
    MEDIUMTEXT: "TEXT",
    LONGTEXT: "TEXT",
    BLOB: "BLOB",
    TINYBLOB: "BLOB",
    MEDIUMBLOB: "BLOB",
    LONGBLOB: "BLOB",
    BYTEA: "BLOB",
    BINARY: "BLOB",
    VARBINARY: "BLOB",
    DATE: "TEXT",
    TIME: "TEXT",
    DATETIME: "TEXT",
    TIMESTAMP: "TEXT",
    BOOLEAN: "INTEGER",
    BOOL: "INTEGER",
    JSON: "TEXT",
    UUID: "TEXT",
    SERIAL: "INTEGER",
  }

  convert(type: string): string {
    if (type.includes("(")) {
      const baseType = type.split("(")[0]
      return SQLiteTypeConverter.TYPE_MAP[baseType] || "TEXT"
    }

    return SQLiteTypeConverter.TYPE_MAP[type] || "TEXT"
  }
}

/**
 * Oracle Type Converter
 * Single Responsibility: Convert types specifically for Oracle
 */
export class OracleTypeConverter implements ITypeConverter {
  private static readonly TYPE_MAP: Record<string, string> = {
    INT: "NUMBER(10)",
    INTEGER: "NUMBER(10)",
    TINYINT: "NUMBER(3)",
    SMALLINT: "NUMBER(5)",
    MEDIUMINT: "NUMBER(7)",
    BIGINT: "NUMBER(19)",
    FLOAT: "BINARY_FLOAT",
    DOUBLE: "BINARY_DOUBLE",
    "DOUBLE PRECISION": "BINARY_DOUBLE",
    DECIMAL: "NUMBER",
    NUMERIC: "NUMBER",
    CHAR: "CHAR",
    VARCHAR: "VARCHAR2",
    TEXT: "CLOB",
    TINYTEXT: "VARCHAR2(255)",
    MEDIUMTEXT: "CLOB",
    LONGTEXT: "CLOB",
    BLOB: "BLOB",
    TINYBLOB: "BLOB",
    MEDIUMBLOB: "BLOB",
    LONGBLOB: "BLOB",
    BYTEA: "BLOB",
    BINARY: "RAW",
    VARBINARY: "RAW",
    DATE: "DATE",
    TIME: "TIMESTAMP",
    DATETIME: "TIMESTAMP",
    TIMESTAMP: "TIMESTAMP",
    BOOLEAN: "NUMBER(1)",
    BOOL: "NUMBER(1)",
    JSON: "CLOB",
    UUID: "VARCHAR2(36)",
    SERIAL: "NUMBER",
  }

  convert(type: string): string {
    if (type.includes("(")) {
      const baseType = type.split("(")[0]
      const params = type.match(/\(([^)]+)\)/)?.[1]

      if (baseType === "VARCHAR") {
        return `VARCHAR2(${params})`
      } else if (baseType === "CHAR") {
        return `CHAR(${params})`
      } else if (baseType === "DECIMAL" || baseType === "NUMERIC") {
        return `NUMBER(${params})`
      }
    }

    return OracleTypeConverter.TYPE_MAP[type] || "VARCHAR2(255)"
  }
}

/**
 * SQL Server Type Converter
 * Single Responsibility: Convert types specifically for SQL Server
 */
export class SQLServerTypeConverter implements ITypeConverter {
  private static readonly TYPE_MAP: Record<string, string> = {
    INT: "INT",
    INTEGER: "INT",
    TINYINT: "TINYINT",
    SMALLINT: "SMALLINT",
    MEDIUMINT: "INT",
    BIGINT: "BIGINT",
    FLOAT: "FLOAT",
    DOUBLE: "FLOAT",
    "DOUBLE PRECISION": "FLOAT",
    DECIMAL: "DECIMAL",
    NUMERIC: "NUMERIC",
    CHAR: "CHAR",
    VARCHAR: "VARCHAR",
    TEXT: "NVARCHAR(MAX)",
    TINYTEXT: "NVARCHAR(255)",
    MEDIUMTEXT: "NVARCHAR(MAX)",
    LONGTEXT: "NVARCHAR(MAX)",
    BLOB: "VARBINARY(MAX)",
    TINYBLOB: "VARBINARY(255)",
    MEDIUMBLOB: "VARBINARY(MAX)",
    LONGBLOB: "VARBINARY(MAX)",
    BYTEA: "VARBINARY(MAX)",
    BINARY: "BINARY",
    VARBINARY: "VARBINARY",
    DATE: "DATE",
    TIME: "TIME",
    DATETIME: "DATETIME2",
    TIMESTAMP: "DATETIME2",
    BOOLEAN: "BIT",
    BOOL: "BIT",
    JSON: "NVARCHAR(MAX)",
    UUID: "UNIQUEIDENTIFIER",
    SERIAL: "IDENTITY(1,1)",
  }

  convert(type: string): string {
    if (type.includes("(")) {
      const baseType = type.split("(")[0]
      const params = type.match(/\(([^)]+)\)/)?.[1]

      if (baseType === "VARCHAR" || baseType === "CHAR") {
        return `${baseType}(${params})`
      } else if (baseType === "DECIMAL" || baseType === "NUMERIC") {
        return `${SQLServerTypeConverter.TYPE_MAP[baseType] || baseType}(${params})`
      }
    }

    return SQLServerTypeConverter.TYPE_MAP[type] || "NVARCHAR(255)"
  }
}
