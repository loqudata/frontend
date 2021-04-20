import { BiListUl, BiMapAlt } from "react-icons/bi"
import { numberWithCommas } from "src/services/utils"
import { Button, ButtonGroup } from "@chakra-ui/button"
import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { BasicCountry } from "../services/countries"
import { useBoolean } from "@chakra-ui/hooks"

import React from "react"
import { AutoSizer, List, ListRowRenderer } from "react-virtualized"

import _ from "lodash"
import { Map } from "../../map/components/Map"
import Link from "next/link"

const Country = ({ c, style }: { c: BasicCountry; style: any }) => (
  <Box style={style} py={2} px={1}>
    <Link href={"/countries/" + c.iso}>
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
          {c.name}
          <Text ml={2} display="inline">
            {c.flagChar}
          </Text>
          <Badge ml={2}>{c.iso}</Badge>
        </Heading>
        <Heading size="sm">
          {numberWithCommas(c.numSeries || 0)}
        </Heading>
      </Flex>
    </Link>
  </Box>
)
type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never

const CountriesList = ({
  countries,
}: {
  countries: BasicCountry[]
}) => {
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: ArgumentTypes<ListRowRenderer>[0]) {
    return (
      <Country key={key} style={style} c={countries[index]}></Country>
    )
  }

  return (
    <Box
      backgroundColor="gray.100"
      p={4}
      borderRadius="md"
      w="full"
      h="full"
    >
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={countries.length}
            rowHeight={16 * 4}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </Box>
  )
}

export const CountriesView = ({
  countries,
}: {
  countries: BasicCountry[]
}) => {
  const [listVisible, setListVisible] = useBoolean(true)
  const [mapVisible, setMapVisible] = useBoolean(true)
  const countriesByISO = _.keyBy(countries, "iso")

  return (
    <Flex direction="column">
      <Flex mb={5}>
        <Heading size="xl" flexGrow={1}>
          Countries
        </Heading>
        {/* BiListUl, BiMapAlt */}
        <Box>
          <Heading size="sm" color="gray.600" mb={2}>
            Toggle View Panes
          </Heading>
          <ButtonGroup isAttached>
            <Button
              colorScheme="blue"
              variant={listVisible ? "solid" : "outline"}
              leftIcon={<BiListUl></BiListUl>}
              onClick={setListVisible.toggle}
            >
              List
            </Button>
            <Button
              colorScheme="green"
              variant={mapVisible ? "solid" : "outline"}
              leftIcon={<BiMapAlt></BiMapAlt>}
              onClick={setMapVisible.toggle}
            >
              Map
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
      <Flex flexGrow={1} direction={{ base: "column", lg: "row" }}>
        {listVisible ? (
          <Box flexGrow={1} h="90vh" minW="lg">
            <CountriesList countries={countries}></CountriesList>
          </Box>
        ) : null}
        {mapVisible ? (
          <Box flexGrow={{ base: 1, lg: 2 }} ml={6}>
            <Box h="90vh" w="full" backgroundColor="gray.300">
              <Map countries={countriesByISO}></Map>
            </Box>
          </Box>
        ) : null}
      </Flex>
    </Flex>
  )
}
