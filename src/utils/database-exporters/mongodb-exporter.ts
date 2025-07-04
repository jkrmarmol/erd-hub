import type { Node } from "@xyflow/react"
import type { TableNodeData, Column, DBExportType } from "@/types/type"
import type { IDatabaseExporter } from "./types"

/**
 * MongoDB Schema Interface
 */
interface MongoDBSchema {
  bsonType: string
  title: string
  description: string
  required: string[]
  properties: Record<string, any>
  references?: Array<{
    field: string
    collection: string
    foreignField: string
    relationship: string
  }>
}

/**
 * MongoDB Exporter
 * Single Responsibility: Handle MongoDB-specific export logic
 */
export class MongoDBExporter implements IDatabaseExporter {
  getSupportedDatabaseType(): DBExportType {
    return "MongoDB"
  }

  getFileExtension(): string {
    return ".js"
  }

  export(nodes: Array<Node<TableNodeData>>): string {
    const schemas = this.convertToMongoDBSchemas(nodes)
    return this.generateMongoDBScript(schemas)
  }

  private convertToMongoDBSchemas(
    nodes: Array<Node<TableNodeData>>
  ): Record<string, MongoDBSchema> {
    const collections: Record<string, MongoDBSchema> = {}

    nodes.forEach((node) => {
      if (!node.data.columns || node.data.columns.length === 0) return

      const collectionName = node.data.name
      const schema = this.createSchemaForCollection(node)
      collections[collectionName] = schema
    })

    return collections
  }

  private createSchemaForCollection(node: Node<TableNodeData>): MongoDBSchema {
    const schema: MongoDBSchema = {
      bsonType: "object",
      title: node.data.name,
      description: node.data.description || `${node.data.name} collection`,
      required: [],
      properties: {},
    }

    // Process regular columns
    this.addPropertiesToSchema(schema, node.data.columns || [])

    // Process foreign key references
    this.addReferencesToSchema(schema, node.data.columns || [])

    return schema
  }

  private addPropertiesToSchema(
    schema: MongoDBSchema,
    columns: Column[]
  ): void {
    columns.forEach((column) => {
      if (column.isForeignKey) return // Handle separately as references

      const bsonType = this.mapSQLTypeToBSONType(column.type)
      const property: any = {
        bsonType,
        description: `${column.name} field`,
      }

      // Add default value if present
      if (column.defaultValue) {
        property.default = column.defaultValue
      }

      schema.properties[column.name] = property

      // Add to required array if not nullable
      if (column.isNullable === false || column.isPrimaryKey) {
        schema.required.push(column.name)
      }
    })
  }

  private addReferencesToSchema(
    schema: MongoDBSchema,
    columns: Column[]
  ): void {
    const references: MongoDBSchema["references"] = []

    columns.forEach((column) => {
      if (column.isForeignKey && column.reference) {
        references.push({
          field: column.name,
          collection: column.reference.table,
          foreignField: column.reference.column,
          relationship: column.reference.type,
        })
      }
    })

    if (references.length > 0) {
      schema.references = references
    }
  }

  private mapSQLTypeToBSONType(type?: string): string {
    if (!type) return "string"

    const lowerType = type.toLowerCase()

    if (lowerType.includes("int") || lowerType.includes("serial")) {
      return "int"
    } else if (
      lowerType.includes("float") ||
      lowerType.includes("double") ||
      lowerType.includes("decimal") ||
      lowerType.includes("numeric")
    ) {
      return "double"
    } else if (lowerType.includes("bool")) {
      return "bool"
    } else if (lowerType.includes("date") || lowerType.includes("time")) {
      return "date"
    } else if (lowerType.includes("json")) {
      return "object"
    }

    return "string"
  }

  private generateMongoDBScript(
    schemas: Record<string, MongoDBSchema>
  ): string {
    const scriptLines: string[] = []

    scriptLines.push("// MongoDB Schema Validation and Collection Creation")
    scriptLines.push(
      "// Run these commands in MongoDB shell or MongoDB Compass\n"
    )

    Object.entries(schemas).forEach(([collectionName, schema]) => {
      // Collection creation
      scriptLines.push(`// Create collection: ${collectionName}`)
      if (schema.description) {
        scriptLines.push(`// ${schema.description}`)
      }

      scriptLines.push(`db.createCollection("${collectionName}", {`)
      scriptLines.push(`  validator: ${JSON.stringify(schema, null, 2)}`)
      scriptLines.push("});\n")

      // Sample document
      const sampleDoc = this.generateSampleDocument(schema)
      scriptLines.push(`// Sample document for ${collectionName}:`)
      scriptLines.push(
        `db.${collectionName}.insertOne(${JSON.stringify(sampleDoc, null, 2)});\n`
      )

      // Indexes for references
      if (schema.references) {
        schema.references.forEach((ref) => {
          scriptLines.push(
            `// Index for ${ref.field} (references ${ref.collection}.${ref.foreignField})`
          )
          scriptLines.push(
            `db.${collectionName}.createIndex({ "${ref.field}": 1 });`
          )
        })
        scriptLines.push("")
      }
    })

    return scriptLines.join("\n")
  }

  private generateSampleDocument(schema: MongoDBSchema): Record<string, any> {
    const sampleDoc: Record<string, any> = {}

    Object.entries(schema.properties).forEach(([fieldName, fieldSchema]) => {
      switch (fieldSchema.bsonType) {
        case "int":
          sampleDoc[fieldName] = 1
          break
        case "double":
          sampleDoc[fieldName] = 1.0
          break
        case "bool":
          sampleDoc[fieldName] = true
          break
        case "date":
          sampleDoc[fieldName] = "ISODate()"
          break
        case "object":
          sampleDoc[fieldName] = {}
          break
        default:
          sampleDoc[fieldName] = `"${fieldName}_value"`
      }
    })

    return sampleDoc
  }
}
