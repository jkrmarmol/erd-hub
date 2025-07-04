import type { Node } from "@xyflow/react"
import type { TableNodeData, Column, DBExportType } from "@/types/type"
import type {
  IDatabaseExporter,
  IColumnDefinitionGenerator,
  IConstraintGenerator,
  DatabaseExportConfig,
} from "./types"

/**
 * Abstract base class for SQL database exporters
 * Template Method Pattern: Defines the algorithm skeleton for SQL export
 * Single Responsibility: Handle common SQL export logic
 */
export abstract class BaseSQLExporter implements IDatabaseExporter {
  constructor(
    protected columnGenerator: IColumnDefinitionGenerator,
    protected constraintGenerator: IConstraintGenerator,
    protected config: DatabaseExportConfig
  ) {}

  abstract getSupportedDatabaseType(): DBExportType
  abstract getFileExtension(): string

  // Template Method: Main export algorithm
  export(nodes: Array<Node<TableNodeData>>): string {
    const sqlStatements: string[] = []

    // Add any database-specific headers
    sqlStatements.push(...this.generateHeaders())

    // Generate CREATE TABLE statements
    const { tableStatements, constraintStatements } =
      this.generateTableStatements(nodes)
    sqlStatements.push(...tableStatements)

    // Add any additional statements (sequences, triggers, etc.)
    sqlStatements.push(...this.generateAdditionalStatements(nodes))

    // Add constraints at the end
    if (constraintStatements.length > 0) {
      sqlStatements.push("\n-- Constraints")
      sqlStatements.push(...constraintStatements)
    }

    return sqlStatements.join("\n")
  }

  // Hook methods - can be overridden by subclasses
  protected generateHeaders(): string[] {
    return []
  }

  protected generateAdditionalStatements(
    nodes: Array<Node<TableNodeData>>
  ): string[] {
    return []
  }

  private generateTableStatements(nodes: Array<Node<TableNodeData>>): {
    tableStatements: string[]
    constraintStatements: string[]
  } {
    const tableStatements: string[] = []
    const constraintStatements: string[] = []

    nodes.forEach((node) => {
      if (!node.data.columns || node.data.columns.length === 0) return

      const tableName = this.formatTableName(node.data.name)
      const columns = node.data.columns

      // Add table comment
      if (node.data.description) {
        tableStatements.push(`-- ${node.data.description}`)
      }

      // Generate CREATE TABLE statement
      const createTableStatement = this.generateCreateTableStatement(
        tableName,
        columns
      )
      tableStatements.push(createTableStatement)

      // Generate constraints
      const primaryKeyConstraints =
        this.constraintGenerator.generatePrimaryKeyConstraints(
          tableName,
          columns
        )
      const uniqueConstraints =
        this.constraintGenerator.generateUniqueConstraints(tableName, columns)
      const foreignKeyConstraints =
        this.constraintGenerator.generateForeignKeyConstraints(
          tableName,
          columns
        )

      constraintStatements.push(
        ...primaryKeyConstraints,
        ...uniqueConstraints,
        ...foreignKeyConstraints
      )
    })

    return { tableStatements, constraintStatements }
  }

  private generateCreateTableStatement(
    tableName: string,
    columns: Column[]
  ): string {
    const wrappedTableName = this.wrapTableName(tableName)
    let createTable = `CREATE TABLE ${wrappedTableName} (\n`

    const columnDefinitions = columns.map(
      (col) => `  ${this.columnGenerator.generateColumnDefinition(col)}`
    )

    // Add inline constraints for databases that support them (like SQLite)
    const inlineConstraints = this.generateInlineConstraints(tableName, columns)

    const allDefinitions = [...columnDefinitions, ...inlineConstraints]
    createTable += allDefinitions.join(",\n")
    createTable += `\n)${this.getTableSuffix()};\n`

    return createTable
  }

  protected generateInlineConstraints(
    tableName: string,
    columns: Column[]
  ): string[] {
    return [] // Most databases don't use inline constraints
  }

  protected getTableSuffix(): string {
    return ""
  }

  protected formatTableName(tableName: string): string {
    switch (this.config.identifierCase) {
      case "upper":
        return tableName.toUpperCase()
      case "lower":
        return tableName.toLowerCase()
      default:
        return tableName
    }
  }

  private wrapTableName(tableName: string): string {
    return `${this.config.tableNameWrapper}${tableName}${this.config.tableNameWrapper}`
  }
}

/**
 * PostgreSQL Exporter
 */
export class PostgreSQLExporter extends BaseSQLExporter {
  getSupportedDatabaseType(): DBExportType {
    return "PostgreSQL"
  }

  getFileExtension(): string {
    return ".sql"
  }
}

/**
 * MySQL Exporter
 */
export class MySQLExporter extends BaseSQLExporter {
  getSupportedDatabaseType(): DBExportType {
    return "MySQL"
  }

  getFileExtension(): string {
    return ".sql"
  }

  protected getTableSuffix(): string {
    return " ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
  }
}

/**
 * SQLite Exporter
 */
export class SQLiteExporter extends BaseSQLExporter {
  getSupportedDatabaseType(): DBExportType {
    return "SQLite"
  }

  getFileExtension(): string {
    return ".sql"
  }

  protected generateHeaders(): string[] {
    return ["PRAGMA foreign_keys = ON;\n"]
  }

  protected generateInlineConstraints(
    tableName: string,
    columns: Column[]
  ): string[] {
    const constraints: string[] = []

    columns.forEach((column) => {
      if (column.isForeignKey && column.reference) {
        constraints.push(
          `  FOREIGN KEY ("${column.name}") REFERENCES "${column.reference.table}"("${column.reference.column}")`
        )
      }
    })

    return constraints
  }
}

/**
 * Oracle Exporter
 */
export class OracleExporter extends BaseSQLExporter {
  getSupportedDatabaseType(): DBExportType {
    return "Oracle"
  }

  getFileExtension(): string {
    return ".sql"
  }

  protected generateAdditionalStatements(
    nodes: Array<Node<TableNodeData>>
  ): string[] {
    const statements: string[] = []
    const sequences: string[] = []
    const triggers: string[] = []

    nodes.forEach((node) => {
      if (!node.data.columns || node.data.columns.length === 0) return

      const tableName = this.formatTableName(node.data.name)
      const columns = node.data.columns

      columns.forEach((column) => {
        if (
          column.isPrimaryKey &&
          (column.type === "INT" || column.type === "INTEGER")
        ) {
          const seqName = `${tableName}_${column.name.toUpperCase()}_SEQ`
          const triggerName = `${tableName}_${column.name.toUpperCase()}_TRG`

          sequences.push(
            `CREATE SEQUENCE "${seqName}" START WITH 1 INCREMENT BY 1;`
          )

          const trigger = `CREATE OR REPLACE TRIGGER "${triggerName}"
BEFORE INSERT ON "${tableName}"
FOR EACH ROW
BEGIN
  IF :NEW."${column.name.toUpperCase()}" IS NULL THEN
    SELECT "${seqName}".NEXTVAL INTO :NEW."${column.name.toUpperCase()}" FROM DUAL;
  END IF;
END;
/`
          triggers.push(trigger)
        }
      })
    })

    if (sequences.length > 0) {
      statements.push("\n-- Sequences")
      statements.push(...sequences)
    }

    if (triggers.length > 0) {
      statements.push("\n-- Triggers")
      statements.push(...triggers)
    }

    return statements
  }
}

/**
 * SQL Server Exporter
 */
export class SQLServerExporter extends BaseSQLExporter {
  getSupportedDatabaseType(): DBExportType {
    return "SQL Server"
  }

  getFileExtension(): string {
    return ".sql"
  }
}
