import { Flex, Box, Heading } from "@chakra-ui/react"
import React, { CSSProperties } from "react"
import {
  CodeListEntry,
  DimensionDimension,
  DimensionElement,
} from "src/services/dbnomics/datasetRDF"

import {
  SelectableGroup,
  createSelectable,
  TSelectableItemProps,
} from "react-selectable-fast"
import { AutoSizer, List, ListRowProps } from "react-virtualized"
import { getDimensionCode } from "src/services/utils"

type CodeValueProps = {
  c: CodeListEntry
  style: CSSProperties
}

function CodeVal({
  c,
  style,
  selectableRef,
  isSelected,
  isSelecting,
}: CodeValueProps & TSelectableItemProps) {
  return (
    <Box
      backgroundColor={
        isSelected || isSelecting ? "blue.100" : undefined
      }
      ref={selectableRef}
      p={4}
      pt={2}
      cursor="pointer"
      _hover={{
        background: !(isSelected || isSelecting)
          ? "gray.100"
          : undefined,
      }}
      style={style}
    >
      {c.label}
    </Box>
  )
}

const SelectableCodeValue = createSelectable(CodeVal)

const CodeList = ({ list }: { list: CodeListEntry[] }) => {
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: ListRowProps) {
    return (
      <SelectableCodeValue
        key={key}
        style={style}
        c={list[index]}
      ></SelectableCodeValue>
    )
  }

  return (
    <Box
      // p={4}
      // borderRadius="md"
      w="full"
      h="full"
    >
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={list.length}
            rowHeight={16 * 6}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </Box>
  )
}

import { UpdateSelected } from "../services/state"
import { TSelectableItem } from "react-selectable-fast/lib/Selectable.types"

function Dimension({
  dimension,

  updateSelected,
  length,
}: {
  dimension: DimensionDimension
  updateSelected: UpdateSelected
  length: number
}) {
  const dimID = getDimensionCode(dimension["@id"])

  return (
    <Box
      flexGrow={1}
      backgroundColor="gray.50"
      m={2}
      borderRadius={8}
      maxW={{
        base: "unset",
        xl: Math.floor((1.2 / length) * 100) + "%",
      }}
    >
      <SelectableGroup
        style={{ height: "100%" }}
        clickClassName="tick"
        enableDeselect
        onSelectionFinish={(
          items: (TSelectableItem & { props: any })[]
        ) => {
          for (const item of items) {
            updateSelected(dimID, item.props.c.notation, true)
          }
        }}
        // mixedDeselect={true}
        // onSelectedItemUnmount={(items) => {
        //   console.log(items)
        // }}
        onUnselectedFinish={(items) => {
          for (const item of items) {
            updateSelected(
              dimID,
              (item as any).props.c.notation,
              false
            )
          }
        }}
        // allowClickWithoutSelected={false}
        ignoreList={[
          ".not-selectable",
          ".item:nth-child(10)",
          ".item:nth-child(27)",
        ]}
      >
        <Flex direction="column" h="full">
          <Heading p={4} size="md" w="fit-content">
            {dimension.name}
          </Heading>

          <Box flexGrow={1}>
            <CodeList
              list={dimension.codeList.entries || []}
            ></CodeList>
          </Box>
        </Flex>
      </SelectableGroup>
    </Box>
  )
}

export const Dimensions = ({
  dimensions,
  updateSelected,
}: {
  dimensions: DimensionElement[]
  updateSelected: UpdateSelected
}) => {
  return (
    <Flex
      height="full"
      minH="70vh"
      mx={-2}
      direction={{ base: "column", xl: "row" }}
    >
      {dimensions.map((d) => (
        <Dimension
          updateSelected={updateSelected}
          key={d.index}
          dimension={d.dimension}
          length={dimensions.length}
        ></Dimension>
      ))}
    </Flex>
  )
}
