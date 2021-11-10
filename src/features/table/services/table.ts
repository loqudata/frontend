import { Table } from "tableschema"
import { TableSchema } from "./tableSchema"
export interface ImportResult {
  /** The raw string content of the CSV file */
  content: string
  /** The inferred schema */
  schema: TableSchema
}

export async function inferSchema(
  url: string
): Promise<ImportResult> {
  const data = await fetch(url)

  const content = await data.text()

  const maxData = content.substring(0, 200)

  const t = await Table.load(maxData, { to_line: 50, delimiter: "," })
  const schema: any = await t.infer(50)
  return { schema, content }
}
