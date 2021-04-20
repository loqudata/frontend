import { SeriesResponse } from "./dbnomics/series"

import { Endpoints } from "./config/endpoints"

async function get<T>(url: string): Promise<T> {
  const data = await fetch(url)
  return await data.json()
}

export interface SeriesSpec {
  provider: string
  dataset: string
  series: string
}

/** Gets a single series */
export async function getSeries(spec: SeriesSpec) {
  // console.log(spec)

  const { provider, series, dataset } = spec
  const url =
    Endpoints.DBNomics +
    `series/${provider}/${dataset}/${series}?observations=true`
  // console.log(url)

  const out = await get<SeriesResponse>(url)
  if (out.series.num_found < 1) {
    throw new Error(
      `Didn't find any series for query ${JSON.stringify(spec)}`
    )
  } else if (out.series.num_found > 1) {
    console.warn("Found more than 1 series for query", spec)
  }
  return out.series.docs[0]
}
