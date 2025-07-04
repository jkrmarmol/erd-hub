import type { Node } from "@xyflow/react"
import type { TableNodeData, Column, DBExportType } from "@/types/type"

/**
 * Interface for database-specific type converters
 * Single Responsibility: Handle type conversion for a specific database
 */
export interface ITypeConverter {
  convert(type: string): string
}

/**
 * Interface for database-specific column definition generators
 * Single Responsibility: Generate column definitions for a specific database
 */
export interface IColumnDefinitionGenerator {
  generateColumnDefinition(column: Column): string
}

/**
 * Interface for database-specific constraint generators
 * Single Responsibility: Generate constraints for a specific database
 */
export interface IConstraintGenerator {
  generatePrimaryKeyConstraints(tableName: string, columns: Column[]): string[]
  generateUniqueConstraints(tableName: string, columns: Column[]): string[]
  generateForeignKeyConstraints(tableName: string, columns: Column[]): string[]
}

/**
 * Interface for database exporters
 * Single Responsibility: Export schema to a specific database format
 * Open/Closed: Open for extension, closed for modification
 */
export interface IDatabaseExporter {
  export(nodes: Array<Node<TableNodeData>>): string
  getSupportedDatabaseType(): DBExportType
  getFileExtension(): string
}

/**
 * Base configuration for database exporters
 */
export interface DatabaseExportConfig {
  tableNameWrapper: string
  columnNameWrapper: string
  statementTerminator: string
  identifierCase: "upper" | "lower" | "preserve"
}

/**
 * Context for database export operations
 */
export interface ExportContext {
  nodes: Array<Node<TableNodeData>>
  config: DatabaseExportConfig
}

/**
 * Export result containing the generated content and metadata
 */
export interface ExportResult {
  content: string
  filename: string
  mimeType: string
  databaseType: DBExportType
}
