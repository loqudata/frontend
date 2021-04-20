import axios from "axios"
import { SelectedValues } from "./state"
import { Endpoints } from "src/services/config/endpoints"

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
