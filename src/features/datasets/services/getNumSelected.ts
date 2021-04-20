import axios from "axios"
import { SelectedValues } from "./state"
import { Endpoints } from "src/services/config/endpoints"
import { Series, SeriesResponse } from "src/services/dbnomics/series"
// import { SeriesResponse } from "src/services/dbnomics/series"

export function getSeriesConstraints(s: SelectedValues): string {
  const seriesConstraints = []
  for (const key in s) {
    const codeList = s[key]
    const comps = []
    for (const valKey in codeList) {
      const val = codeList[valKey]
      if (val) {
        comps.push(valKey)
      }
    }
    seriesConstraints.push(comps.length > 0 ? comps.join("+") : "")
  }
  return seriesConstraints.join(".")
}

export async function getNumSelected(
  provider: string,
  dataset: string,
  seriesConstraints: string
): Promise<number> {
  const url =
    Endpoints.DBNomics +
    `series/${provider}/${dataset}/${seriesConstraints}?limit=1`
  try {
    const out = await axios.get(url)
    if (out.status != 200) {
      // or message contains "not found"
      return 0
    }
    return out.data.series.num_found
  } catch (error) {
    console.warn(url, error)

    return 0
  }
}

export async function getSeries(
  provider: string,
  dataset: string,
  seriesConstraints: string
): Promise<Series[]> {
  const url =
    Endpoints.DBNomics +
    `series/${provider}/${dataset}/${seriesConstraints}`
  try {
    const out = await axios.get<SeriesResponse>(url)
    if (out.status != 200) {
      // or message contains "not found"
      return []
    }
    return out.data.series.docs
  } catch (error) {
    console.warn(url, error)

    return []
  }
}

export const openSelected = (
  provider: string,
  dataset: string
) => async (s: SelectedValues) => {
  const cs = getSeriesConstraints(s)
  const ser = await getSeries(provider, dataset, cs)
  for (const series of ser) {
    const an = window.location.toString()
    const loc = new URL(an)
    loc.hash = ""
    loc.pathname =
      series.provider_code +
      "/" +
      series.dataset_code +
      "/" +
      series.series_code
    const x = loc.toString()
    // console.log(x)

    open(x, "_blank")
  }
}
