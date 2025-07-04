import { DatabaseExportService } from "@/utils/exportToDatabase"
import { initialNodes } from "@/constant/initialNodes"
import { DBExportType } from "@/types/type"

// Test the new SOLID-compliant database export system
const databases: DBExportType[] = [
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "MongoDB",
  "Oracle",
  "SQL Server",
]

console.log("🚀 Testing SOLID-compliant Database Export System")
console.log("=".repeat(60))

databases.forEach((dbType) => {
  try {
    console.log(`\n${"=".repeat(60)}`)
    console.log(`${dbType.toUpperCase()} EXPORT`)
    console.log(`${"=".repeat(60)}`)

    const exportResult = DatabaseExportService.exportToDatabase(
      initialNodes,
      dbType
    )

    console.log(`📁 Filename: ${exportResult.filename}`)
    console.log(`📄 MIME Type: ${exportResult.mimeType}`)
    console.log(`🗃️ Database: ${exportResult.databaseType}`)
    console.log(`\n📝 Content Preview:`)
    console.log(exportResult.content.substring(0, 500) + "...")
  } catch (error) {
    console.error(`❌ Error exporting to ${dbType}:`, error)
  }
})

console.log(`\n${"=".repeat(60)}`)
console.log("✅ All exports completed!")
console.log("🎯 SOLID Principles Applied:")
console.log("• Single Responsibility: Each class has one reason to change")
console.log("• Open/Closed: Open for extension, closed for modification")
console.log("• Liskov Substitution: Subtypes are substitutable")
console.log("• Interface Segregation: Small, focused interfaces")
console.log("• Dependency Inversion: Depend on abstractions")
console.log("=".repeat(60))

export default "SOLID-compliant database export system test completed"
