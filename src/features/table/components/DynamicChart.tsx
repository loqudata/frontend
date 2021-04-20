import { Box, Flex } from "@chakra-ui/react"
import React, { useState } from "react"
import { useDrop } from "react-dnd"
import { timeseriesWrapper } from "../../visualization/services/timeseries"
import { VegaDataSpec } from "../../visualization/services/vegaData"
import { FieldDragItem, ItemTypes } from "./ItemTypes"
import { SimpleVega } from "../../visualization/components/VegaView"
import { TableSchemaField } from "../services/tableSchema"
import { TableSchemaTypeMap } from "../services/TableSchemaTypeMap"
import { bar } from "src/features/visualization/services/histogram"

const DroppableAxis = ({
  a,
  onChange,
  title,
}: {
  a: "x" | "y"
  onChange: (fieldName: string) => void
  title?: string
}) => {
  const name = title || a + " axis"

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FIELD,
    drop: (dragObject: FieldDragItem) => {
      console.log(name, dragObject)
      if (!dragObject.id) {
        console.log("No ID?")
      } else {
        onChange(dragObject.id)
      }

      return dragObject
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  return (
    <Box
      m={2}
      //   mb={a == "y" ? 0 : undefined}
      mt={a == "y" ? 0 : undefined}
      p={6}
      ref={drop}
      backgroundColor={isOver ? "gray.100" : "gray.50"}
    >
      {name}
    </Box>
  )
}

/** These can be optional b/c easiest way to handle when getField doesn't return anything, aka default */
function makeChart(
  data: VegaDataSpec,
  xField?: TableSchemaField,
  yField?: TableSchemaField,
  title?: string
) {
  if (!xField || !yField) {
    return timeseriesWrapper(data, "Unitled", undefined, undefined)
  }

  if (!xField.type || !yField.type) {
    throw new Error("No type for x or y axis")
  }
  const xdt = TableSchemaTypeMap[xField.type]?.vegaType
  const ydt = TableSchemaTypeMap[yField.type]?.vegaType

  console.log(xdt, ydt)

  const realTitle =
    title ||
    `${yField.title || yField.name} vs. ${
      xField.title || xField.name
    }`

  if (xdt == "temporal" && ydt == "quantitative") {
    return timeseriesWrapper(
      data,
      realTitle,
      xField.name,
      yField.name
    )
  }
  if (xdt == "nominal" && ydt == "quantitative") {
    // TODO: add chart title here
    return bar(data, xField.name, yField.name)
  }

  return timeseriesWrapper(
    data,
    `Cannot make chart for the ${xField.name} (${xdt}) and ${yField.name} (${ydt}) fields`,
    undefined,
    undefined
  )
}

function getField(fields: TableSchemaField[], fieldName: string) {
  return fields.filter((f) => f.name == fieldName)[0]
}

function fieldType(field: TableSchemaField) {
  if (!field.type) {
    throw new Error(`No type for field ${field.name}`)
  }
  return TableSchemaTypeMap[field.type]?.vegaType
}

/** Guesses the X and Y fields just from the list.
 * Right now, if there are 2 fields, one is temporal, the other quantitative,
 * then we chart a time-series
 */
function inferFields(fields: TableSchemaField[]): string[] {
  if (fields.length == 2) {
    const typs = fields.map((f) => fieldType(f))
    if (typs.includes("temporal") && typs.includes("quantitative")) {
      return [
        fields
          .filter((f) => fieldType(f) == "temporal")
          .map((f) => f.name)[0],
        fields
          .filter((f) => fieldType(f) == "quantitative")
          .map((f) => f.name)[0],
      ]
    }
  }
  return []
}

export default function DynamicChart({
  data,
  fields,
  title,
}: {
  data: VegaDataSpec
  fields: TableSchemaField[]
  title?: string
}) {
  const inf = inferFields(fields)
  const [xField, setXField] = useState<string>(inf[0] || "")
  const [yField, setYField] = useState<string>(inf[1] || "")

  const spec = makeChart(
    data,
    getField(fields, xField),
    getField(fields, yField),
    title
  )
  console.log(spec)

  return (
    <Box>
      <Flex>
        <DroppableAxis
          a="y"
          title={yField}
          onChange={(f) => setYField(f)}
        ></DroppableAxis>
        <SimpleVega spec={spec}></SimpleVega>
      </Flex>
      <DroppableAxis
        a="x"
        title={xField}
        onChange={(f) => setXField(f)}
      ></DroppableAxis>
    </Box>
  )
}
