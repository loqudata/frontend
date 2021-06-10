import { Button, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { basename } from "../services/utils"
import React, { useState } from "react"
import Layout from "../components/Layout"
import { RemoteTableImport } from "../features/table/components/TableImport"

const examples = [
  "https://raw.githubusercontent.com/datasets/natural-gas/master/data/monthly.csv",
  "https://raw.githubusercontent.com/datasets/covid-19/main/data/key-countries-pivoted.csv",
  "https://raw.githubusercontent.com/datasets/population-reference-bureau/master/data/international/births/data/international-births.csv",
  // "https://raw.githubusercontent.com/datasets/co2-ppm-daily/master/data/co2-ppm-daily.csv",
  // "https://raw.githubusercontent.com/datasets/co2-fossil-by-nation/master/data/fossil-fuel-co2-emissions-by-nation.csv",
  // "https://raw.githubusercontent.com/datasets/finance-vix/master/data/vix-daily.csv",
  // "https://raw.githubusercontent.com/datasets/covid-19/main/data/worldwide-aggregate.csv",
  // "https://raw.githubusercontent.com/datasets/population-city/master/data/unsd-citypopulation-year-fm.csv",
]
const title = "Visualize Data Cube"
const TablePage = () => {
  const [dataURL, setURL] = useState<string | undefined>(undefined)
  return (
    <Layout title={title}>
      <Stack spacing={4}>
        <Text>
          Input a URL or choose an example to visualize a data cube:{" "}
          {examples.map((ex) => (
            <Button mr={2} onClick={() => setURL(ex)} key={ex}>
              {basename(ex).split(".")[0]}
            </Button>
          ))}
        </Text>

        <Input
          value={dataURL}
          onChange={(e) => setURL(e.target.value)}
          maxW="30%"
          placeholder="Data URL"
        ></Input>
        {dataURL ? (
          <RemoteTableImport url={dataURL}></RemoteTableImport>
        ) : null}
      </Stack>
    </Layout>
  )
}

export default TablePage
