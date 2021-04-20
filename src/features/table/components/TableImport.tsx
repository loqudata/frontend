import { Box, Flex, Heading } from "@chakra-ui/layout"
import React, { useCallback, useState } from "react"
import { useAsync } from "react-async-hook"
import { inferSchema } from "../services/table"

import Field from "./Field"
import { VegaDataSpec } from "../../visualization/services/vegaData"
import { InternalTableSchema } from "../services/internalTableSchema"
// import { TableSchemaField } from "../services/tableSchema"

import update from "immutability-helper"
import DynamicChart from "./DynamicChart"
// import { TableSchemaField } from "../services/tableSchema"

const TableImport = ({
  dataSpec,
  initialSchema,
}: {
  dataSpec: VegaDataSpec
  initialSchema: InternalTableSchema
}) => {
  console.log(initialSchema)

  // const [schema, setSchema] = useState(initialSchema)

  const [fields, setFields] = useState(
    initialSchema.fields.map((f, i) => ({ ...f, index: i }))
  )

  // Kind of hacky
  const setField = (f: any) => {
    setFields((prev) =>
      update(prev, { $splice: [[f.index, 1, f as any]] })
    )
  }

  const moveField = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = fields[dragIndex]
      setFields(
        update(fields, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      )
    },
    [fields]
  )
  return (
    <Flex>
      <Box minW="xl" mr={6}>
        <Heading size="md" color="gray.600">
          Fields
        </Heading>

        {/* <Text>The title and description of each field is editable.</Text> */}

        {fields.map((f) => (
          <Field
            key={f.name}
            moveField={moveField}
            index={f.index}
            id={f.name}
            value={f}
            onChange={setField}
            // key={f.name}
            data={dataSpec}
          ></Field>
        ))}
      </Box>
      <Box mx={4} flexGrow={1} maxW="70%">
        <DynamicChart data={dataSpec} fields={fields}></DynamicChart>
      </Box>
    </Flex>
  )
}

export function RemoteTableImport({ url }: { url: string }) {
  const status = useAsync(inferSchema, [url])
  const dataSpec = {
    values: status.result ? status.result.content : "",
    format: { type: "csv" },
  } as VegaDataSpec

  return (
    <div>
      {status.loading && <div>Loading</div>}
      {status.error && <div>Error: {status.error.message}</div>}
      {status.result && (
        <TableImport
          {...{ dataSpec, initialSchema: status.result.schema }}
        ></TableImport>
      )}
    </div>
  )
}
