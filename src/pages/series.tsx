import { Stack, Text } from "@chakra-ui/layout"
import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import React, { useState } from "react"
import Layout from "../components/Layout"
import { SeriesVis } from "../features/visualization/components/SeriesVis"
import { SeriesSpec } from "../services/series"

const SeriesPage = () => {
  const [provider, setProvider] = useState("")
  const [series, setSeries] = useState("")
  const [dataset, setDataset] = useState("")
  const [data, setData] = useState<SeriesSpec | undefined>(undefined)
  return (
    <Layout title="Series">
      <Stack spacing={6}>
        <Heading size="xl">Series</Heading>
        <Text>Here you can input a series ID to visualize it</Text>
        <Flex justify="space-between">
          <Input
            onChange={(e) => setProvider(e.target.value)}
            maxW="30%"
            placeholder="Provider ID"
          ></Input>
          <Input
            onChange={(e) => setDataset(e.target.value)}
            maxW="30%"
            placeholder="Dataset ID"
          ></Input>
          <Input
            onChange={(e) => setSeries(e.target.value)}
            maxW="30%"
            placeholder="Series ID"
          ></Input>
        </Flex>
        <Button
          onClick={() => setData({ provider, dataset, series })}
          colorScheme="green"
          variant="outline"
          w={40}
        >
          Submit
        </Button>
      </Stack>
      {data ? <SeriesVis spec={data}></SeriesVis> : null}
    </Layout>
  )
}

export default SeriesPage
