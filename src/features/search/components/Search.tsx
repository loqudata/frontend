import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/react"
import React from "react"
import { BasicDoc, HitsProvided } from "react-instantsearch-core"
import {
  InstantSearch,
  SearchBox,
  connectHits,
  Highlight,
} from "react-instantsearch-dom"
import { searchClient } from "../services/searchClient"
import { Dataset } from "../services/typesenseModel"

const Hl = ({ hit }: { hit: any }) => (
  <>
    {/* <Text>
      <Highlight hit={hit} attribute="name" />
    </Text> */}
    <Text>
      <Text fontWeight="bold" display="inline" size="sm" color="gray.600">
        Description:{" "}
      </Text>
      {<Highlight hit={hit} attribute="description" color="gray.500"/> || hit.description}
    </Text>
  </>
)

const BasicHits = ({ hits }: HitsProvided<Dataset>) => {
  console.log(hits[0]);
  
  return (
  <SimpleGrid columns={[2, null, 3, null, 4]} spacing="2">
    {hits.map((hit) => (
      <Hit hit={hit} key={hit.objectID} />
    ))}
  </SimpleGrid>
)}

const CustomHits = connectHits(BasicHits)

const Hit = ({ hit }: { hit: Dataset }) => {
  return (
    <Box minW="md" p="4" borderRadius="lg" boxShadow="base">
      <Tag> {hit.provider_code.toUpperCase()}</Tag>{" "}
      <Heading size="sm" display="inline">
        {/* {hit.name} */}

      <Highlight hit={hit} attribute="name" />
      </Heading>
      <Hl hit={hit} />
    </Box>
  )
}

export const Search = () => (
  <>
    <InstantSearch indexName="datasets" searchClient={searchClient}>
      <SearchBox />
      <CustomHits />
    </InstantSearch>
  </>
)
