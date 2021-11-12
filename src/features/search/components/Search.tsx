import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { Flex, Tag } from "@chakra-ui/react"
import React from "react"
import { BasicDoc, HitsProvided } from "react-instantsearch-core"
import {
  InstantSearch,
  SearchBox,
  connectHits,
  Highlight,
  Stats,
  HitsPerPage,
  SortBy,
} from "react-instantsearch-dom"
import { searchClient } from "../services/searchClient"
import { Dataset, NormalDataset } from "../services/typesenseModel"

const Hl = ({ hit }: { hit: any }) => {
  if (hit.description) {
    return (
      <Box>
        <Text
          color="gray.500"
          isTruncated
          noOfLines={3}
          whiteSpace="break-spaces"
          fontSize="sm"
        >
          <Text
            as="span"
            fontWeight="bold"
            fontSize="sm"
            color="gray.700"
          >
            Description:{" "}
          </Text>
          {hit.description}
        </Text>
      </Box>
    )
  } else {
    return null
  }
}

const BasicHits = ({ hits }: HitsProvided<NormalDataset>) => {
  console.log(hits[0])

  return (
    <SimpleGrid columns={[2, null, 3, null, 4]} spacing="2">
      {hits.map((hit) => (
        <Hit hit={hit} key={hit.objectID} />
      ))}
    </SimpleGrid>
  )
}

const CustomHits = connectHits(BasicHits)

const Hit = ({ hit }: { hit: NormalDataset }) => {
  return (
    <Box minW="md" p="4" borderRadius="lg" boxShadow="base">
      {/* <Tag> {hit.provider_code.toUpperCase()}</Tag>{" "} */}
      <VStack spacing={2} alignItems="initial">
      <Heading size="md" display="inline">
        {/* {hit.name} */}

        <Highlight hit={hit} attribute="name" />
      </Heading>
      <Hl hit={hit} />
      <Text fontSize="sm">
        <Text
          fontSize="sm"
          as="span"
          fontWeight="bold"
          color="gray.700"
        >
          Created at:
        </Text>{" "}
        {new Date(hit.created_at * 1000).toLocaleDateString()}
      </Text>
      </VStack>
    </Box>
  )
}

export const Search = () => (
  <>
    <InstantSearch indexName="datasets_2" searchClient={searchClient}>
      <Flex w="full">
        <Box flexGrow={1} mr={4}>
          <SearchBox />
        </Box>
        <Flex alignContent="center">
          <Stats
            translations={{
              stats(nbHits, processingTimeMS) {
                let hitCountPhrase
                if (nbHits === 0) {
                  hitCountPhrase = "No datasets"
                } else if (nbHits === 1) {
                  hitCountPhrase = "1 dataset"
                } else {
                  hitCountPhrase = `${nbHits.toLocaleString()} datasets`
                }
                return `${hitCountPhrase} found in ${processingTimeMS.toLocaleString()}ms`
              },
            }}
          />
          <HitsPerPage
            className="ms-4"
            items={[
              { label: "9 per page", value: 9 },
              { label: "18 per page", value: 18 },
            ]}
            defaultRefinement={9}
          />
          <SortBy
            items={[
              { label: "Relevancy", value: "datasets_2" },
              {
                label: "Created at (asc)",
                value: "datasets_2/sort/created_at:asc",
              },
              {
                label: "Created at (desc)",
                value: "datasets_2/sort/created_at:desc",
              },
            ]}
            defaultRefinement="datasets_2"
          />
        </Flex>
      </Flex>
      <CustomHits />
    </InstantSearch>
  </>
)
