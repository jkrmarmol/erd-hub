import type { Column } from "@/types/type"
import type { IConstraintGenerator } from "./types"

/**
 * Base constraint generator with common functionality
 * Template Method Pattern: Defines the skeleton of constraint generation
 */
export abstract class BaseConstraintGenerator implements IConstraintGenerator {
  protected abstract getTableNameWrapper(): string
  protected abstract getColumnNameWrapper(): string
  protected abstract getConstraintNameFormat(): string

  protected wrapTableName(tableName: string): string {
    const wrapper = this.getTableNameWrapper()
    return `${wrapper}${tableName}${wrapper}`
  }

  protected wrapColumnName(columnName: string): string {
    const wrapper = this.getColumnNameWrapper()
    return `${wrapper}${columnName}${wrapper}`
  }

  protected formatConstraintName(
    tableName: string,
    columnName: string,
    type: string
  ): string {
    const format = this.getConstraintNameFormat()
    return format
      .replace("{type}", type)
      .replace("{table}", tableName)
      .replace("{column}", columnName)
  }

  generatePrimaryKeyConstraints(
    tableName: string,
    columns: Column[]
  ): string[] {
    const primaryKeyColumns = columns.filter((col) => col.isPrimaryKey)
    if (primaryKeyColumns.length === 0) return []

    const constraintName = this.formatConstraintName(tableName, "", "PK")
    const pkColumns = primaryKeyColumns
      .map((col) => this.wrapColumnName(col.name))
      .join(", ")

    return [
      `ALTER TABLE ${this.wrapTableName(tableName)} ADD CONSTRAINT ${this.wrapColumnName(constraintName)} PRIMARY KEY (${pkColumns});`,
    ]
  }

  generateUniqueConstraints(tableName: string, columns: Column[]): string[] {
    const constraints: string[] = []

    columns.forEach((column) => {
      if (column.isUnique && !column.isPrimaryKey) {
        const constraintName = this.formatConstraintName(
          tableName,
          column.name,
          "UK"
        )
        constraints.push(
          `ALTER TABLE ${this.wrapTableName(tableName)} ADD CONSTRAINT ${this.wrapColumnName(constraintName)} UNIQUE (${this.wrapColumnName(column.name)});`
        )
      }
    })

    return constraints
  }

  generateForeignKeyConstraints(
    tableName: string,
    columns: Column[]
  ): string[] {
    const constraints: string[] = []

    columns.forEach((column) => {
      if (column.isForeignKey && column.reference) {
        const constraintName = this.formatConstraintName(
          tableName,
          column.name,
          "FK"
        )
        const constraint = `ALTER TABLE ${this.wrapTableName(tableName)} ADD CONSTRAINT ${this.wrapColumnName(constraintName)} FOREIGN KEY (${this.wrapColumnName(column.name)}) REFERENCES ${this.wrapTableName(column.reference.table)}(${this.wrapColumnName(column.reference.column)});`
        constraints.push(constraint)
      }
    })

    return constraints
  }
}

/**
 * PostgreSQL Constraint Generator
 */
export class PostgreSQLConstraintGenerator extends BaseConstraintGenerator {
  protected getTableNameWrapper(): string {
    return '"'
  }
  protected getColumnNameWrapper(): string {
    return '"'
  }
  protected getConstraintNameFormat(): string {
    return "{type}_{table}_{column}"
  }
}

/**
 * MySQL Constraint Generator
 */
export class MySQLConstraintGenerator extends BaseConstraintGenerator {
  protected getTableNameWrapper(): string {
    return "`"
  }
  protected getColumnNameWrapper(): string {
    return "`"
  }
  protected getConstraintNameFormat(): string {
    return "{type}_{table}_{column}"
  }
}

/**
 * SQLite Constraint Generator
 */
export class SQLiteConstraintGenerator extends BaseConstraintGenerator {
  protected getTableNameWrapper(): string {
    return '"'
  }
  protected getColumnNameWrapper(): string {
    return '"'
  }
  protected getConstraintNameFormat(): string {
    return "{type}_{table}_{column}"
  }

  // SQLite handles constraints differently - inline with CREATE TABLE
  generatePrimaryKeyConstraints(): string[] {
    return []
  }
  generateUniqueConstraints(): string[] {
    return []
  }
  generateForeignKeyConstraints(): string[] {
    return []
  }
}

/**
 * Oracle Constraint Generator
 */
export class OracleConstraintGenerator extends BaseConstraintGenerator {
  protected getTableNameWrapper(): string {
    return '"'
  }
  protected getColumnNameWrapper(): string {
    return '"'
  }
  protected getConstraintNameFormat(): string {
    return "{type}_{table}_{column}"
  }

  protected wrapTableName(tableName: string): string {
    return super.wrapTableName(tableName.toUpperCase())
  }

  protected wrapColumnName(columnName: string): string {
    return super.wrapColumnName(columnName.toUpperCase())
  }
}

/**
 * SQL Server Constraint Generator
 */
export class SQLServerConstraintGenerator extends BaseConstraintGenerator {
  protected getTableNameWrapper(): string {
    return "["
  }
  protected getColumnNameWrapper(): string {
    return "["
  }
  protected getConstraintNameFormat(): string {
    return "{type}_{table}_{column}"
  }

  protected wrapTableName(tableName: string): string {
    return `[${tableName}]`
  }

  protected wrapColumnName(columnName: string): string {
    return `[${columnName}]`
  }
}
