/** This services loads country geographic data from
 * a distribution of Natural Earth and GeoBoundaries
 * for more detailed resolutions */

import axios from "axios"

import { feature } from "topojson-client"

import topCountries from "./topCountries.geo.json"

import { bin, range } from "d3-array"

export type GeoLevel = "ADM0" | "ADM1"

// Roughly from https://github.com/topojson/topojson-client/blob/71e5bd6428fd8b7a40fa980d2ef7862140851f03/bin/topo2geo#L53-L59
function topo2geo(topo: any, name: string) {
  if (!(name in topo.objects)) {
    console.error("  error: object “" + name + "” not found")
  }
  return feature(topo, name)
}

export async function getCountryGeoData(
  countryCode: string,
  level: GeoLevel = "ADM0"
) {
  // https://www.geoboundaries.org/data/geoBoundariesSSCGS-3_0_0/AFG/ADM2/geoBoundariesSSCGS-3_0_0-AFG-ADM2.topojson
  // Name: geoBoundariesSSCGS-3_0_0-AFG-ADM2.topojson
  const name = "geoBoundariesSSCGS-3_0_0-" + countryCode + "-" + level
  const url =
    Endpoints.GeoBoundaries +
    countryCode +
    "/" +
    level +
    "/" +
    name +
    ".topojson"
  console.log(url)

  const out = await axios.get(url)

  const geo = topo2geo(out.data, name)

  return geo
}

export function getCountriesGeoData() {
  return topCountries
}
import colorbrewer from "colorbrewer"
import { BasicCountry } from "src/features/entities/services/countries"
import { Endpoints } from "src/services/config/endpoints"

export function colorCountries(countries: {
  [iso: string]: BasicCountry
}) {
  const colors = colorbrewer.Blues[9]
  const chunks = 5
  const mBin = bin()
    // @ts-ignore
    .value((c: BasicCountry) => c.numSeries || 0)
    .thresholds((_, min, max) =>
      range(chunks).map((t) => min + (t / chunks) * (max - min))
    )
  // @ts-ignore
  const buckets = mBin(Object.values(countries))
  // console.log(buckets)

  for (const binIndex of [...Array(5).keys()]) {
    const b = buckets[binIndex]
    for (const item of b) {
      //@ts-ignore
      const curCountry = item as BasicCountry
      // if (!item.iso)
      countries[curCountry.iso].color = colors[3 + binIndex]
      countries[curCountry.iso].bin = binIndex
    }
  }

  return countries

  // (Object.values(countries))
}
