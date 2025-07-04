// Legacy file - maintained for backward compatibility
// The new implementation follows SOLID principles and is located in ./database-exporters/

import type { Node } from "@xyflow/react"
import type { TableNodeData, DBExportType } from "@/types/type"
import {
  DatabaseExportService,
  FileDownloadService,
  exportToDatabase as newExportToDatabase,
  downloadSQL as newDownloadSQL,
  getFileExtension as newGetFileExtension,
} from "./database-exporters"

/**
 * @deprecated Use DatabaseExportService.exportToDatabase instead
 * Legacy wrapper function for backward compatibility
 */
export function exportToDatabase(
  nodes: Array<Node<TableNodeData>>,
  dbType: DBExportType
): string {
  console.warn(
    "exportToDatabase is deprecated. Use DatabaseExportService.exportToDatabase instead."
  )
  return newExportToDatabase(nodes, dbType)
}

/**
 * @deprecated Use FileDownloadService.downloadContent instead
 * Legacy wrapper function for backward compatibility
 */
export function downloadSQL(
  content: string,
  filename: string = "schema.sql"
): void {
  console.warn(
    "downloadSQL is deprecated. Use FileDownloadService.downloadContent instead."
  )
  newDownloadSQL(content, filename)
}

/**
 * @deprecated Use DatabaseExportService.getFileExtension instead
 * Legacy wrapper function for backward compatibility
 */
export function getFileExtension(dbType: DBExportType): string {
  console.warn(
    "getFileExtension is deprecated. Use DatabaseExportService.getFileExtension instead."
  )
  return newGetFileExtension(dbType)
}

// Re-export the new services for those who want to use the modern API
export {
  DatabaseExportService,
  FileDownloadService,
  DatabaseExporterFactory,
} from "./database-exporters"

export type { ExportResult, IDatabaseExporter } from "./database-exporters"
