import { Table } from "tableschema"
import { TableSchema } from "./tableSchema"
// TODO: maybe replace stream-browserify with readable-stream
import { Readable } from "stream"
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

  console.log(content.substring(0, 200))

  const stream = new Readable()
  for (const line of content.split("\n")) {
    stream.push(line + "\n")
  }
  stream.push(null)

  const t = await Table.load(stream, { to_line: 50, delimiter: "," })
  const schema: any = await t.infer(50)
  return { schema, content }
}
