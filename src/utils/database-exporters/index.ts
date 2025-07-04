// Main exports for the database export system
export { DatabaseExportService, FileDownloadService } from "./service"
export { DatabaseExporterFactory } from "./factory"
export type {
  IDatabaseExporter,
  ITypeConverter,
  IColumnDefinitionGenerator,
  IConstraintGenerator,
  ExportResult,
  DatabaseExportConfig,
} from "./types"

// Re-export service methods for backward compatibility
import { DatabaseExportService, FileDownloadService } from "./service"

export const exportToDatabase = (nodes: any, dbType: any) => {
  const result = DatabaseExportService.exportToDatabase(nodes, dbType)
  return result.content
}

export const downloadSQL = (content: string, filename: string) => {
  FileDownloadService.downloadContent(content, filename)
}

export const getFileExtension = DatabaseExportService.getFileExtension
