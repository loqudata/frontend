import { Box } from "@chakra-ui/layout"
import React from "react"
import { useAsync } from "react-async-hook"
import { getCountries } from "../services/countries"
import { CountriesView } from "./CountriesView"

export const Countries = () => {
  const status = useAsync(getCountries, [])

  if (status.error) {
    console.error(status.error)
    return <Box>{status.error.toString()}</Box>
  } else if (status.result) {
    return (
      <CountriesView
        countries={status.result.sort(
          (a, b) => (b.numSeries || 0) - (a.numSeries || 0)
        )}
      ></CountriesView>
    )
  } else {
    return <Box>Loading..</Box>
  }
}
