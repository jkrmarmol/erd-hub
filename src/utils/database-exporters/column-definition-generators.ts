import type { Column } from "@/types/type"
import type { IColumnDefinitionGenerator, ITypeConverter } from "./types"

/**
 * Base column definition generator
 * Template Method Pattern: Defines the skeleton of column definition generation
 */
export abstract class BaseColumnDefinitionGenerator
  implements IColumnDefinitionGenerator
{
  constructor(protected typeConverter: ITypeConverter) {}

  protected abstract wrapColumnName(name: string): string
  protected abstract formatPrimaryKey(column: Column): string[]
  protected abstract formatAutoIncrement(column: Column): string[]
  protected abstract formatDefaultValue(defaultValue: string): string

  generateColumnDefinition(column: Column): string {
    const parts: string[] = []

    // Column name
    parts.push(this.wrapColumnName(column.name))

    // Column type
    if (column.type) {
      const convertedType = this.typeConverter.convert(column.type)
      parts.push(this.handleSpecialTypes(column, convertedType))
    }

    // Auto increment (if applicable)
    parts.push(...this.formatAutoIncrement(column))

    // Primary key (if handled inline)
    parts.push(...this.formatPrimaryKey(column))

    // Unique constraint
    if (column.isUnique && !column.isPrimaryKey) {
      parts.push("UNIQUE")
    }

    // Nullable
    if (column.isNullable === false || column.isPrimaryKey) {
      parts.push("NOT NULL")
    } else if (this.shouldExplicitlyMarkNullable()) {
      parts.push("NULL")
    }

    // Default value
    if (column.defaultValue) {
      parts.push("DEFAULT")
      parts.push(this.formatDefaultValue(column.defaultValue))
    }

    return parts.filter(Boolean).join(" ")
  }

  protected handleSpecialTypes(column: Column, convertedType: string): string {
    return convertedType
  }

  protected shouldExplicitlyMarkNullable(): boolean {
    return false
  }
}

/**
 * PostgreSQL Column Definition Generator
 */
export class PostgreSQLColumnDefinitionGenerator extends BaseColumnDefinitionGenerator {
  protected wrapColumnName(name: string): string {
    return `"${name}"`
  }

  protected formatPrimaryKey(column: Column): string[] {
    return column.isPrimaryKey ? ["PRIMARY KEY"] : []
  }

  protected formatAutoIncrement(): string[] {
    return [] // PostgreSQL uses SERIAL type for auto-increment
  }

  protected formatDefaultValue(defaultValue: string): string {
    return defaultValue === "CURRENT_TIMESTAMP"
      ? "CURRENT_TIMESTAMP"
      : `'${defaultValue}'`
  }
}

/**
 * MySQL Column Definition Generator
 */
export class MySQLColumnDefinitionGenerator extends BaseColumnDefinitionGenerator {
  protected wrapColumnName(name: string): string {
    return `\`${name}\``
  }

  protected formatPrimaryKey(column: Column): string[] {
    return column.isPrimaryKey ? ["PRIMARY KEY"] : []
  }

  protected formatAutoIncrement(column: Column): string[] {
    return column.isPrimaryKey && this.isIntegerType(column.type)
      ? ["AUTO_INCREMENT"]
      : []
  }

  protected formatDefaultValue(defaultValue: string): string {
    return defaultValue === "CURRENT_TIMESTAMP"
      ? "CURRENT_TIMESTAMP"
      : `'${defaultValue}'`
  }

  protected handleSpecialTypes(column: Column, convertedType: string): string {
    if (column.isPrimaryKey && convertedType === "INT") {
      return "INT"
    }
    return convertedType
  }

  private isIntegerType(type?: string): boolean {
    return type === "INT" || type === "INTEGER"
  }
}

/**
 * SQLite Column Definition Generator
 */
export class SQLiteColumnDefinitionGenerator extends BaseColumnDefinitionGenerator {
  protected wrapColumnName(name: string): string {
    return `"${name}"`
  }

  protected formatPrimaryKey(column: Column): string[] {
    return column.isPrimaryKey ? ["PRIMARY KEY"] : []
  }

  protected formatAutoIncrement(column: Column): string[] {
    return column.isPrimaryKey && this.isIntegerType(column.type)
      ? ["AUTOINCREMENT"]
      : []
  }

  protected formatDefaultValue(defaultValue: string): string {
    return defaultValue === "CURRENT_TIMESTAMP"
      ? "CURRENT_TIMESTAMP"
      : `'${defaultValue}'`
  }

  private isIntegerType(type?: string): boolean {
    return type === "INT" || type === "INTEGER"
  }
}

/**
 * Oracle Column Definition Generator
 */
export class OracleColumnDefinitionGenerator extends BaseColumnDefinitionGenerator {
  protected wrapColumnName(name: string): string {
    return `"${name.toUpperCase()}"`
  }

  protected formatPrimaryKey(): string[] {
    return [] // Oracle handles primary keys with ALTER TABLE
  }

  protected formatAutoIncrement(): string[] {
    return [] // Oracle uses sequences and triggers
  }

  protected formatDefaultValue(defaultValue: string): string {
    return defaultValue === "CURRENT_TIMESTAMP"
      ? "CURRENT_TIMESTAMP"
      : `'${defaultValue}'`
  }
}

/**
 * SQL Server Column Definition Generator
 */
export class SQLServerColumnDefinitionGenerator extends BaseColumnDefinitionGenerator {
  protected wrapColumnName(name: string): string {
    return `[${name}]`
  }

  protected formatPrimaryKey(): string[] {
    return [] // SQL Server handles primary keys with ALTER TABLE
  }

  protected formatAutoIncrement(column: Column): string[] {
    return column.isPrimaryKey && this.isIntegerType(column.type)
      ? ["IDENTITY(1,1)"]
      : []
  }

  protected formatDefaultValue(defaultValue: string): string {
    return defaultValue === "CURRENT_TIMESTAMP"
      ? "GETDATE()"
      : `'${defaultValue}'`
  }

  protected shouldExplicitlyMarkNullable(): boolean {
    return true
  }

  protected handleSpecialTypes(column: Column, convertedType: string): string {
    if (
      column.isPrimaryKey &&
      (column.type === "INT" || column.type === "INTEGER")
    ) {
      return "INT"
    }
    return convertedType
  }

  private isIntegerType(type?: string): boolean {
    return type === "INT" || type === "INTEGER"
  }
}
