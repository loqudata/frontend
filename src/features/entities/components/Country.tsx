import {
  Flex,
  Image,
  Link,
  Badge,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react"

import NextLink from "next/link"
import React from "react"
import { useAsync } from "react-async-hook"
import {
  CountryWithDatasets,
  getCountry,
} from "../services/countries"
import { Datasets } from "./CountryDatasets"

export const CountryView = ({
  country,
}: {
  country: CountryWithDatasets
}) => {
  return (
    <Flex direction="column">
      <Flex h="fit-content" mb={4}>
        <Box flexGrow={1}>
          <Heading size="lg">{country.country.name}</Heading>
          <Text display="inline" mr={3}>
            {country.country.flagChar}
          </Text>
          <Badge mr={3}>{country.country.iso}</Badge>

          {/* BiLinkExternal */}
          <Link isExternal as={NextLink} href={country.country.iri}>
            @Wikidata
          </Link>
        </Box>

        {country.country.flag ? (
          <Box w="2xs">
            <Image
              src={country.country.flag}
              fallbackSrc="https://via.placeholder.com/150"
              //   alt={`Flag of ${country.country.name}`}
            />
          </Box>
        ) : undefined}
      </Flex>
      {/* TODO: maybe add map here from Geoboundaries */}
      <Box flexGrow={1}>
        <Datasets
          datasets={country.datasets}
          styles={{ minH: "70vh" }}
        ></Datasets>
      </Box>
    </Flex>
  )
}

export const CountryContainer = ({ iso }: { iso: string }) => {
  const status = useAsync(getCountry, [iso])
  if (status.error) {
    console.error(status.error)
    return <Box>{status.error.toString()}</Box>
  } else if (status.result) {
    return <CountryView country={status.result}></CountryView>
  } else {
    return <Box>Loading..</Box>
  }
}
