import {
  Badge,
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { AutoSizer, List, ListRowRenderer } from "react-virtualized"
import { ArgumentTypes, numberWithCommas } from "src/services/utils"
import { SimpleDataset } from "../services/countries"

const Dataset = ({ c, style }: { c: SimpleDataset; style: any }) => (
  <Box style={style} py={2} px={1}>
    <Link
      href={c["@id"]
        .replace("https://loqudata.org", "")
        .replace("/structure", "")}
    >
      <Flex
        backgroundColor="white"
        p={4}
        boxShadow="base"
        borderRadius="md"
        cursor="pointer"
        _hover={{ boxShadow: "lg" }}
        alignItems="center"
      >
        <Heading size="md" flexGrow={1}>
          {c.label}
          <Badge ml={2}>{c.code}</Badge>
        </Heading>
        <Heading size="sm">
          {numberWithCommas(parseInt(c.numSeries, 10) || 0)}
        </Heading>
      </Flex>
    </Link>
  </Box>
)

/** Datasets renders a list of datasets, usually from a linked entity. */
export const Datasets = ({
  datasets,
  styles,
}: {
  datasets: SimpleDataset[]
  styles?: BoxProps
}) => {
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: ArgumentTypes<ListRowRenderer>[0]) {
    return (
      <Dataset key={key} style={style} c={datasets[index]}></Dataset>
    )
  }

  return (
    <Box backgroundColor="gray.100" p={4} borderRadius="md">
      <Flex>
        <Heading mb={2} size="md" flexGrow={1}>
          Datasets
        </Heading>
        <Text color="gray.600" mr={4}>
          Total: {datasets.length}
        </Text>
      </Flex>
      <Box {...styles}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={datasets.length}
              rowHeight={16 * 4}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </Box>
    </Box>
  )
}
