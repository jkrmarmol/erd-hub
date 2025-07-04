import type { Node } from "@xyflow/react"
import type { TableNodeData, DBExportType } from "@/types/type"
import type { ExportResult } from "./types"
import { DatabaseExporterFactory } from "./factory"

/**
 * Main service for database schema export operations
 * Facade Pattern: Provides a simplified interface to the complex database export subsystem
 * Single Responsibility: Coordinate the export process and provide a clean API
 */
export class DatabaseExportService {
  /**
   * Exports the given nodes to the specified database format
   * @param nodes The table nodes to export
   * @param dbType The target database type
   * @returns The export result with content and metadata
   * @throws Error if the database type is not supported or export fails
   */
  static exportToDatabase(
    nodes: Array<Node<TableNodeData>>,
    dbType: DBExportType
  ): ExportResult {
    try {
      // Validate inputs
      this.validateInputs(nodes, dbType)

      // Create the appropriate exporter
      const exporter = DatabaseExporterFactory.createExporter(dbType)

      // Perform the export
      const content = exporter.export(nodes)

      // Generate metadata
      const filename = this.generateFilename(
        dbType,
        exporter.getFileExtension()
      )
      const mimeType = this.getMimeType(exporter.getFileExtension())

      return {
        content,
        filename,
        mimeType,
        databaseType: dbType,
      }
    } catch (error) {
      throw new Error(
        `Export failed for ${dbType}: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
  }

  /**
   * Gets the file extension for a specific database type
   * @param dbType The database type
   * @returns The file extension (including the dot)
   */
  static getFileExtension(dbType: DBExportType): string {
    const exporter = DatabaseExporterFactory.createExporter(dbType)
    return exporter.getFileExtension()
  }

  /**
   * Gets all supported database types
   * @returns Array of supported database types
   */
  static getSupportedDatabaseTypes(): DBExportType[] {
    return DatabaseExporterFactory.getSupportedDatabaseTypes()
  }

  /**
   * Checks if a database type is supported
   * @param dbType The database type to check
   * @returns True if supported, false otherwise
   */
  static isSupported(dbType: string): dbType is DBExportType {
    return DatabaseExporterFactory.isSupported(dbType)
  }

  private static validateInputs(
    nodes: Array<Node<TableNodeData>>,
    dbType: DBExportType
  ): void {
    if (!nodes || nodes.length === 0) {
      throw new Error("No table nodes provided for export")
    }

    if (!this.isSupported(dbType)) {
      throw new Error(`Unsupported database type: ${dbType}`)
    }

    // Validate that at least one node has columns
    const hasValidNodes = nodes.some(
      (node) => node.data.columns && node.data.columns.length > 0
    )

    if (!hasValidNodes) {
      throw new Error("No valid table nodes with columns found")
    }
  }

  private static generateFilename(
    dbType: DBExportType,
    extension: string
  ): string {
    const sanitizedDbType = dbType.toLowerCase().replace(/\s+/g, "_")
    const timestamp = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    return `schema_${sanitizedDbType}_${timestamp}${extension}`
  }

  private static getMimeType(extension: string): string {
    const mimeTypeMap: Record<string, string> = {
      ".sql": "application/sql",
      ".js": "application/javascript",
      ".json": "application/json",
    }

    return mimeTypeMap[extension] || "text/plain"
  }
}

/**
 * File download utility
 * Single Responsibility: Handle file download operations
 */
export class FileDownloadService {
  /**
   * Downloads the export result as a file
   * @param exportResult The export result to download
   */
  static downloadExportResult(exportResult: ExportResult): void {
    this.downloadContent(
      exportResult.content,
      exportResult.filename,
      exportResult.mimeType
    )
  }

  /**
   * Downloads content as a file
   * @param content The content to download
   * @param filename The filename for the download
   * @param mimeType The MIME type of the content
   */
  static downloadContent(
    content: string,
    filename: string,
    mimeType: string = "text/plain"
  ): void {
    try {
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.href = url
      link.download = filename

      // Temporarily add to DOM and click
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      throw new Error(
        `Failed to download file: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
  }
}
