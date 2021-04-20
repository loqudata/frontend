import { Dimensions } from "./Dimensions"
import { BiLinkExternal } from "react-icons/bi"

import {
  Badge,
  Box,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react"
import {
  DatasetRDF,
  DimensionElement,
} from "src/services/dbnomics/datasetRDF"

import React, { useState } from "react"
import _ from "lodash"

import { SelectedValues } from "../services/state"
import { SelectedContainer } from "./Selected"
import { getDimensionCode } from "src/services/utils"
import { Endpoints } from "src/services/config/endpoints"

function createDimensionOutline(
  ds: DimensionElement[]
): SelectedValues {
  const v: any = {}
  const dims = ds.map((d) =>
    Object.assign(d, { code: getDimensionCode(d["@id"]) })
  )
  for (const dim of dims) {
    v[dim.code] = {}
    for (const value of dim.dimension.codeList.entries || []) {
      v[dim.code][value.notation] = false
    }
  }
  return v
}

function InternalDatasetView({
  data,
  initialSelected,
}: {
  data: DatasetRDF
  initialSelected: SelectedValues
}) {
  const [selectedValues, setSelectedValues] = useState(
    initialSelected
  )

  const updateSelected = (
    dimCode: string,
    valCode: string,
    value: boolean
  ) => {
    setSelectedValues((prev) => {
      const x = _.merge(prev, {
        [dimCode]: { [valCode]: value },
      })

      // https://stackoverflow.com/a/61304759/4492772
      // b/c in JS pass object by reference, and I guess _.merge
      // uses the same reference, the state diff algorithm thought it was the same
      // I guess it was because the top-level keys were the same.
      return _.clone(x)
    })
  }

  // console.log(obs.freq.M)
  return (
    <Box minH="80vh">
      <Flex alignItems="stretch">
        <Box flexGrow={1}>
          <Flex alignItems="center">
            <Heading size="xl" maxW="4xl" w="fit-content">
              {data.name}
            </Heading>
            <Box h="fit-content" ml={4}>
              <Badge>{data.provider.notation}</Badge>
            </Box>
            <Link
              // data["@id"]
              target="_blank"
              href={
                Endpoints.LoquStatic +
                `${data.provider.notation}/${data.code}.jsonld`
              }
              fontSize="sm"
              display="inline"
            >
              <Text ml={4}>
                <BiLinkExternal
                  style={{ display: "inline", marginRight: 2 }}
                ></BiLinkExternal>
                RDF
              </Text>
            </Link>
          </Flex>
          <Text maxW="70%" my={6}>
            {data.description}
          </Text>
        </Box>
        <Flex alignItems="center" mb={4} minW={48}>
          <SelectedContainer
            initialSeries={parseInt(data.nb_series, 10)}
            selected={selectedValues}
          ></SelectedContainer>
        </Flex>
      </Flex>
      <Heading mb={1} size="md" color="gray.600">
        Dimensions
      </Heading>
      <Dimensions
        dimensions={data.dimensions}
        updateSelected={updateSelected}
      ></Dimensions>
    </Box>
  )
}

// Should this be in components?
export const DatasetView = ({ data }: { data: DatasetRDF }) => {
  const dOut = createDimensionOutline(data.dimensions)

  return (
    <InternalDatasetView
      data={data}
      initialSelected={dOut}
    ></InternalDatasetView>
  )
}
