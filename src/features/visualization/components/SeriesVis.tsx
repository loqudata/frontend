import {
  Text,
  Heading,
  Link,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
} from "@chakra-ui/react"
import React from "react"
import { useAsync } from "react-async-hook"
import { SeriesData } from "../../../services/dbnomics/series"
import { getSeries, SeriesSpec } from "../../../services/series"

import _ from "lodash"
import { SimpleVega } from "./VegaView"
import { timeseries } from "../services/timeseries"

const SeriesSimple = ({ series }: { series: SeriesData }) => (
  <Stack mt={6}>
    <Heading mb={6} size="lg">
      {series.series_name}
    </Heading>
    <Flex>
      <Table size="sm" w="md" mr={16}>
        <Thead>
          <Tr>
            {/* {Object.entries(series.dimensions).map(([k, v]) => <Th>To convert</Th>)} */}
            <Th>Date</Th>
            <Th isNumeric>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {_.zip(series.period, series.value).map(([p, v]) => (
            <Tr key={p + "_" + v?.toString()}>
              <Td>{p}</Td>
              <Td isNumeric>
                {typeof v == "number" ? v?.toFixed(3) : v}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <TableCaption>
          <Text>
            Source:{" "}
            <Link
              href={`https://db.nomics.world/${series.provider_code}/${series.dataset_code}/${series.series_code}`}
            >
              DBNomics
            </Link>{" "}
          </Text>
        </TableCaption>
      </Table>
      <SimpleVega spec={timeseries(series)}></SimpleVega>
    </Flex>
  </Stack>
)

/** Loads a single series from the DBNomics API and visualizes it with a table and timeseries chart */
export const SeriesVis = ({ spec }: { spec: SeriesSpec }) => {
  const status = useAsync(getSeries, [spec])

  return (
    <>
      {status.loading && <div>Loading</div>}
      {status.error && <div>Error: {status.error.message}</div>}
      {status.result && (
        <SeriesSimple series={status.result}></SeriesSimple>
      )}
    </>
  )
}
