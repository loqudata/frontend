import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout"
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
  RefinementList,
} from "react-instantsearch-dom"
import { searchClient } from "../services/searchClient"
import { Dataset, NormalDataset } from "../services/typesenseModel"

const Hl = ({ hit }: { hit: any }) => {
  if (hit.description) {
    return (
      <Box>
        <Text
          color="gray.700"
          isTruncated
          noOfLines={3}
          whiteSpace="break-spaces"
          fontSize="sm"
        >
          <Text
            as="span"
            // fontWeight="bold"
            fontSize="sm"
            color="gray.500"
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
    <SimpleGrid columns={[1, null, null, 2, null, 3]} spacing="2">
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
        <Flex>
          <Heading size="md" display="inline" flexGrow={1}>
            {/* {hit.name} */}
            <Highlight hit={hit} attribute="name" />
          </Heading>
          <Text fontSize="sm" display="inline">
            {/* TODO: use human-readable */}
            {hit.portal_source}
          </Text>
        </Flex>
        <Hl hit={hit} />
        <Text fontSize="sm">
          <Text
            fontSize="sm"
            as="span"
            // fontWeight="bold"
            color="gray.500"
          >
            Created:
          </Text>{" "}
          {new Date(hit.created_at * 1000).toLocaleDateString()}{" "}
          <Text
            fontSize="sm"
            as="span"
            // fontWeight="bold"
            color="gray.500"
          >
            Updated:
          </Text>{" "}
          {new Date(hit.updated_at * 1000).toLocaleDateString()}{" "}
          <Text
            fontSize="sm"
            as="span"
            // fontWeight="bold"
            color="gray.500"
          >
            Update Frequency:
          </Text>{" "}
          {hit.update_frequency}
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
      <Flex>
        <Box w="15%" pt={4} pr={4}>
          {/* TODO: make filters a dropdown on mobile */}
          <Heading>Filters</Heading>
          <Heading mt={5} mb={1} size="sm" color="gray.500">{"Data Sources".toUpperCase()}</Heading>
          <RefinementList
            attribute="portal_source"
            limit={10}
            showMore={true}

          />
          <Heading mt={5} mb={1} size="sm" color="gray.500">{"Formats".toUpperCase()}</Heading>
          <RefinementList
            attribute="formats"
            limit={5}
          />
          <Heading mt={5} mb={1} size="sm" color="gray.500">{"Update Frequency".toUpperCase()}</Heading>
          <RefinementList
            attribute="update_frequency"
            limit={5}
          />
        </Box>
        <Box w="80%" pt={4}>
          <CustomHits />
        </Box>
      </Flex>
    </InstantSearch>
  </>
)
