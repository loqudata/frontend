import axios from "axios"

import { Endpoints } from "src/services/config/endpoints"

export interface BasicCountry {
  iri: string
  name: string
  // description: string
  iso: string
  flag?: string
  flagChar?: string
  numSeries?: number
  color?: string
  bin?: number
}

export async function getCountries(): Promise<BasicCountry[]> {
  const out = await axios.get<BasicCountry[]>(
    Endpoints.LoquAPI + "countries"
  )

  return out.data
}

export interface SimpleDataset {
  "@id": string
  label: string
  code: string
  numSeries: string
}

export interface CountryWithDatasets {
  country: BasicCountry
  datasets: SimpleDataset[]
}

export async function getCountry(
  iso: string
): Promise<CountryWithDatasets> {
  const country = (
    await axios.get<BasicCountry>(
      Endpoints.LoquAPI + "countries/" + iso
    )
  ).data

  const datasets = (
    await axios.get<{ datasetLinks: SimpleDataset[] }>(
      Endpoints.LoquAPI + "countries/" + iso + "/datasets"
    )
  ).data.datasetLinks

  return { country, datasets }
}
