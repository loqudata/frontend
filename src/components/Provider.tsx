/** Shows DBNomics Data Providers.
 * The ProviderContainer component fetches and the ProviderDisplay component renders a data provider from the DBNomics API*/

import {
  Badge,
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { getProvider, Provider } from "../services/dbnomics/provider"
import { useAsync } from "react-async-hook"
import { StatusWrapper } from "./StatusWrapper"

export const ProviderDisplay = ({ data }: { data: Provider }) => {
  console.log(data)

  return (
    <Box>
      <Stack spacing={4}>
        <Flex alignItems="center">
          <Box h="fit-content" mr={3}>
            <Badge>{data.code}</Badge>
          </Box>
          <Heading size="xl" w="fit-content">
            {data.name}
          </Heading>
        </Flex>
        <Text>Region: {data.region}</Text>
        <Link href={data.website} color="blue.900">
          {data.website}
        </Link>
      </Stack>
    </Box>
  )
}

export const ProviderContainer = ({ code }: { code: string }) => {
  const status = useAsync(getProvider, [code])
  return (
    <StatusWrapper s={status} C={ProviderDisplay}></StatusWrapper>
  )
}
