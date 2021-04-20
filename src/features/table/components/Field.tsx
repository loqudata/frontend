import React from "react"
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout"
import {
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  useBoolean,
  useControllableState,
  UseControllableStateProps,
} from "@chakra-ui/react"
import { SimpleVega } from "../../visualization/components/VegaView"

import TypeIcon from "./TypeIcon"
import { FiEdit2 } from "react-icons/fi"

import { TableSchemaField, TableType } from "../services/tableSchema"
import { histogram } from "../../visualization/services/histogram"
import { VegaDataSpec } from "../../visualization/services/vegaData"
import { TableSchemaTypeMap } from "../services/TableSchemaTypeMap"

import { useRef } from "react"
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd"
import { FieldDragItem, ItemTypes } from "./ItemTypes"
import { XYCoord } from "dnd-core"

/** Makes a mini Vega visualization for each field.
 * A histogram or distribution of the field values that makes sense
 * for the data type */
function makeVis(dataSpec: any, field: TableSchemaField) {
  switch (field.type) {
    case TableType.Date:
    case TableType.Datetime:
    case TableType.Time:
    case TableType.Yearmonth:
    case TableType.Year:
      // console.log(field.type)

      return {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",

        width: "container",
        data: dataSpec,
        mark: "tick",
        encoding: {
          x: {
            field: field.name,
            timeUnit: TableSchemaTypeMap[field.type]?.vegaTimeUnit,
            type: "temporal",
          },
        },
      }
      break

    case TableType.Number:
    case TableType.Integer:
      return histogram(dataSpec, field.name)

    case TableType.Geojson:
      // TODO: if number of values is above certain number (20?)
      // Then simply show top ones with count
      // or via histogram/barchart
      return {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",

        width: "container",
        data: dataSpec,
        mark: "bar",
        encoding: {
          x: {
            field: field.name,
            // type: "nominal",
            // bin: true,
          },
          y: { aggregate: "count" },
          tooltip: [
            {
              field: field.name,
              // type: "nominal",
              // bin: true,
            },
            { aggregate: "count" },
          ],
        },
      }

    default:
      break
  }
}

interface FieldProps {
  id: any
  index: number
  moveField: (dragIndex: number, hoverIndex: number) => void
  // field: TableSchemaField
  data: VegaDataSpec
}

export default function Field({
  // field,
  data,
  moveField,
  index,
  id,
  ...stateProps
}: FieldProps &
  UseControllableStateProps<TableSchemaField>): React.ReactElement {
  // GENERAL STATE
  const [field, setField] = useControllableState<TableSchemaField>(
    stateProps
  )
  const visSpec = makeVis(data, field)
  const title = field.title || field.name
  const description =
    field.description || `The ${field.title || field.name} field.`

  const setTitle = (t: string) => {
    setField((prev) => ({ ...prev, title: t }))
  }

  const setDescription = (d: string) => {
    setField((prev) => ({ ...prev, description: d }))
  }

  // DRAG N DROP

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.FIELD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: FieldDragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY =
        (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveField(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FIELD,
    item: (): FieldDragItem => {
      return { id, index, type: ItemTypes.FIELD }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  // const [title, setTitle] = useState(field.title || field.name)
  // const [description, setDescription] = useState(

  // )
  const [hoverTitle, setHoverTitle] = useBoolean(false)
  const [hoverDescription, setHoverDescription] = useBoolean(false)
  // TODO: when click in Flex are but not editor area, start editing

  drag(drop(ref))
  return (
    <Box
      borderRadius={4}
      my={2}
      p={4}
      shadow="base"
      _hover={{ shadow: "md" }}
      cursor="pointer"
      opacity={opacity}
      // Didn't work great before this:
      display={opacity == 0 ? "none" : ""}
      ref={ref}
      data-handler-id={handlerId}
    >
      <Flex
        onMouseEnter={setHoverTitle.on}
        onMouseLeave={setHoverTitle.off}
      >
        <Editable value={title} onChange={setTitle}>
          <EditablePreview
            as={Heading}
            size="md"
            mr={2}
            fontWeight="black"
          />
          <EditableInput />
        </Editable>
        <Icon
          display={hoverTitle ? "" : "none"}
          as={FiEdit2}
          w={5}
          h={5}
          color="gray.400"
        ></Icon>

        <Spacer></Spacer>
        <TypeIcon type={field.type}></TypeIcon>
      </Flex>
      <Flex
        onMouseEnter={setHoverDescription.on}
        onMouseLeave={setHoverDescription.off}
      >
        <Editable
          width="fit-content"
          mr={3}
          value={description}
          onChange={setDescription}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Icon
          display={hoverDescription ? "" : "none"}
          as={FiEdit2}
          w={5}
          h={5}
          color="gray.400"
        ></Icon>
      </Flex>
      {visSpec ? (
        <Box p={4}>
          <SimpleVega spec={visSpec}></SimpleVega>
        </Box>
      ) : undefined}
    </Box>
  )
}
