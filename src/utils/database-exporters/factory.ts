import type { DBExportType } from "@/types/type"
import type { IDatabaseExporter, DatabaseExportConfig } from "./types"

// Import all type converters
import {
  PostgreSQLTypeConverter,
  MySQLTypeConverter,
  SQLiteTypeConverter,
  OracleTypeConverter,
  SQLServerTypeConverter,
} from "./type-converters"

// Import all column definition generators
import {
  PostgreSQLColumnDefinitionGenerator,
  MySQLColumnDefinitionGenerator,
  SQLiteColumnDefinitionGenerator,
  OracleColumnDefinitionGenerator,
  SQLServerColumnDefinitionGenerator,
} from "./column-definition-generators"

// Import all constraint generators
import {
  PostgreSQLConstraintGenerator,
  MySQLConstraintGenerator,
  SQLiteConstraintGenerator,
  OracleConstraintGenerator,
  SQLServerConstraintGenerator,
} from "./constraint-generators"

// Import all exporters
import {
  PostgreSQLExporter,
  MySQLExporter,
  SQLiteExporter,
  OracleExporter,
  SQLServerExporter,
} from "./sql-exporters"
import { MongoDBExporter } from "./mongodb-exporter"

/**
 * Factory for creating database exporters
 * Factory Pattern: Centralized creation of database-specific exporters
 * Single Responsibility: Handle the creation logic for different database exporters
 */
export class DatabaseExporterFactory {
  private static readonly DATABASE_CONFIGS: Record<
    DBExportType,
    DatabaseExportConfig
  > = {
    PostgreSQL: {
      tableNameWrapper: '"',
      columnNameWrapper: '"',
      statementTerminator: ";",
      identifierCase: "preserve",
    },
    MySQL: {
      tableNameWrapper: "`",
      columnNameWrapper: "`",
      statementTerminator: ";",
      identifierCase: "preserve",
    },
    SQLite: {
      tableNameWrapper: '"',
      columnNameWrapper: '"',
      statementTerminator: ";",
      identifierCase: "preserve",
    },
    Oracle: {
      tableNameWrapper: '"',
      columnNameWrapper: '"',
      statementTerminator: ";",
      identifierCase: "upper",
    },
    "SQL Server": {
      tableNameWrapper: "[",
      columnNameWrapper: "[",
      statementTerminator: ";",
      identifierCase: "preserve",
    },
    MongoDB: {
      tableNameWrapper: "",
      columnNameWrapper: "",
      statementTerminator: "",
      identifierCase: "preserve",
    },
  }

  /**
   * Creates an exporter for the specified database type
   * @param dbType The database type to create an exporter for
   * @returns The appropriate database exporter
   * @throws Error if the database type is not supported
   */
  static createExporter(dbType: DBExportType): IDatabaseExporter {
    const config = this.DATABASE_CONFIGS[dbType]
    if (!config) {
      throw new Error(`Unsupported database type: ${dbType}`)
    }

    switch (dbType) {
      case "PostgreSQL":
        return this.createPostgreSQLExporter(config)
      case "MySQL":
        return this.createMySQLExporter(config)
      case "SQLite":
        return this.createSQLiteExporter(config)
      case "Oracle":
        return this.createOracleExporter(config)
      case "SQL Server":
        return this.createSQLServerExporter(config)
      case "MongoDB":
        return this.createMongoDBExporter()
      default:
        throw new Error(`Unsupported database type: ${dbType}`)
    }
  }

  private static createPostgreSQLExporter(
    config: DatabaseExportConfig
  ): PostgreSQLExporter {
    const typeConverter = new PostgreSQLTypeConverter()
    const columnGenerator = new PostgreSQLColumnDefinitionGenerator(
      typeConverter
    )
    const constraintGenerator = new PostgreSQLConstraintGenerator()
    return new PostgreSQLExporter(columnGenerator, constraintGenerator, config)
  }

  private static createMySQLExporter(
    config: DatabaseExportConfig
  ): MySQLExporter {
    const typeConverter = new MySQLTypeConverter()
    const columnGenerator = new MySQLColumnDefinitionGenerator(typeConverter)
    const constraintGenerator = new MySQLConstraintGenerator()
    return new MySQLExporter(columnGenerator, constraintGenerator, config)
  }

  private static createSQLiteExporter(
    config: DatabaseExportConfig
  ): SQLiteExporter {
    const typeConverter = new SQLiteTypeConverter()
    const columnGenerator = new SQLiteColumnDefinitionGenerator(typeConverter)
    const constraintGenerator = new SQLiteConstraintGenerator()
    return new SQLiteExporter(columnGenerator, constraintGenerator, config)
  }

  private static createOracleExporter(
    config: DatabaseExportConfig
  ): OracleExporter {
    const typeConverter = new OracleTypeConverter()
    const columnGenerator = new OracleColumnDefinitionGenerator(typeConverter)
    const constraintGenerator = new OracleConstraintGenerator()
    return new OracleExporter(columnGenerator, constraintGenerator, config)
  }

  private static createSQLServerExporter(
    config: DatabaseExportConfig
  ): SQLServerExporter {
    const typeConverter = new SQLServerTypeConverter()
    const columnGenerator = new SQLServerColumnDefinitionGenerator(
      typeConverter
    )
    const constraintGenerator = new SQLServerConstraintGenerator()
    return new SQLServerExporter(columnGenerator, constraintGenerator, config)
  }

  private static createMongoDBExporter(): MongoDBExporter {
    return new MongoDBExporter()
  }

  /**
   * Gets all supported database types
   * @returns Array of supported database types
   */
  static getSupportedDatabaseTypes(): DBExportType[] {
    return Object.keys(this.DATABASE_CONFIGS) as DBExportType[]
  }

  /**
   * Checks if a database type is supported
   * @param dbType The database type to check
   * @returns True if supported, false otherwise
   */
  static isSupported(dbType: string): dbType is DBExportType {
    return dbType in this.DATABASE_CONFIGS
  }
}
