import { SelectedValues } from "../services/state"

import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import {
  getNumSelected,
  getSeriesConstraints,
  openSelected,
} from "../services/getNumSelected"
import { useRouter } from "next/router"
import { normalizeQuery } from "src/services/utils"
import { useDebounce } from "../hooks/useDebounce"

function numberValuesSelected(s: SelectedValues) {
  let numSelected = 0
  for (const key in s) {
    const codeList = s[key]
    for (const valKey in codeList) {
      const val = codeList[valKey]
      if (val) {
        numSelected++
      }
    }
  }
  return numSelected
}

export const SelectedView = ({
  numSeriesSelected,
  numValuesSelected,
  openSelected,
}: {
  numSeriesSelected: number
  numValuesSelected: number
  openSelected: () => void
}) => {
  const canOpenSelected = numSeriesSelected < 10
  return (
    <Box>
      <Flex alignItems="center">
        <Box>
          <Heading size="sm">
            {numValuesSelected} Constraints
            {/* Code List Values */}
          </Heading>
          <Heading size="sm">{numSeriesSelected} Series</Heading>
        </Box>
        <Heading ml={3} size="sm">
          selected
        </Heading>
      </Flex>
      <Button
        mt={4}
        colorScheme="teal"
        disabled={!canOpenSelected}
        onClick={() => canOpenSelected && openSelected()}
      >
        Open Selected
      </Button>
      {/* <Text color="gray.400" mt={2}>
    You need less than 10 selected series to open them all
  </Text> */}
    </Box>
  )
}

export const SelectedContainer = ({
  selected,
  initialSeries,
}: {
  selected: SelectedValues
  initialSeries: number
}) => {
  const [numSeriesSelected, setNumSeriesSelected] = useState(
    initialSeries
  )

  const { query } = useRouter()

  const { provider, dataset } = normalizeQuery(query)

  const constraints = useDebounce(getSeriesConstraints(selected), 500)

  useEffect(() => {
    getNumSelected(provider, dataset, constraints).then((s) =>
      setNumSeriesSelected(s)
    )
  }, [constraints])

  const os = openSelected(provider, dataset)

  return (
    <SelectedView
      openSelected={() => os(selected)}
      numSeriesSelected={numSeriesSelected}
      numValuesSelected={numberValuesSelected(selected)}
    ></SelectedView>
  )
}
