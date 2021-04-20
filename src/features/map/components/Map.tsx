import React, { useState } from "react"

import { DeckGL } from "@deck.gl/react"
import { StaticMap } from "react-map-gl"
import { BASEMAP } from "@deck.gl/carto"

import { GeoJsonLayer } from "@deck.gl/layers"

import { Box } from "@chakra-ui/layout"
import {
  colorCountries,
  getCountriesGeoData,
} from "../services/countries"
import { BasicCountry } from "src/features/entities/services/countries"
import { hexToRgbList } from "../services/utils"
import { numberWithCommas } from "src/services/utils"

// Viewport settings
const INITIAL_VIEW_STATE = {
  latitude: 19.410644,
  longitude: -18.580477,
  // latitude: 0,
  // longitude: 0,
  zoom: 1,
  pitch: 0,
  bearing: 0,
}

const getTooltip = (countr: { [iso: string]: BasicCountry }) => ({
  object,
}: {
  object: any
}) => {
  if (!object || !object.properties) return
  //  console.log(object);

  const rep = {
    name: object.properties.sovereignt,
    iso: object.properties.adm0_a3,
  }
  const numSeries = rep.iso
    ? countr[rep.iso]
      ? countr[rep.iso].numSeries
      : 0
    : 0

  return {
    html: `<h2>${rep.name}</h2><p>${rep.iso}</p><p>${numberWithCommas(
      numSeries || 0
    )}</p>`,
    style: {
      // backgroundColor: "#f00",
      fontSize: "0.8em",
    },
  } //shapeName
}

const getElevation = (countr: { [iso: string]: BasicCountry }) => (
  object: any
) => {
  const iso: string =
    object && object.properties.adm0_a3
      ? object.properties.adm0_a3
      : object.properties.sov_a3
      ? object.properties.sov_a3
      : ""
  if (!(iso in countr)) {
    // This country is not included in the list
    return hexToRgbList("#ccc")
  }
  const el = countr[iso.toUpperCase().trim()].bin
  console.log(iso, el)

  return el
}

const getColor = (countr: { [iso: string]: BasicCountry }) => (
  object: any
) => {
  const iso: string =
    object && object.properties.adm0_a3
      ? object.properties.adm0_a3
      : object.properties.sov_a3
      ? object.properties.sov_a3
      : ""
  if (!(iso in countr)) {
    // This country is not included in the list
    return hexToRgbList("#ff2400")
  }
  const col = countr[iso.toUpperCase().trim()].color
  if (col) {
    // console.log(col)
    return hexToRgbList(col)
  } else {
    // This means in the country list but no country was provided.
    // Should never happen cause the color routine is good
    // White should be visible
    return [hexToRgbList("#ff2400")?.slice(0, 3), 120]
  }
}

export const Map = ({
  countries,
}: {
  countries: { [iso: string]: BasicCountry }
}) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

  const gd = getCountriesGeoData() as any
  const countr = colorCountries(countries)
  console.log(countr)

  //   const layers = [new LineLayer({ id: "line-layer", data })];
  const layers = [
    new GeoJsonLayer({
      data: gd,
      wireframe: true,

      pickable: true,
      stroked: false,
      filled: true,
      extruded: true,
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getFillColor: getColor(countr) as any, //[160, 160, 180, 200],
      // getLineColor: (d: any) => colorToRGBArray(d.properties.color),
      // getRadius: 100,
      // getLineWidth: 1,
      elevationScale: 1000 * 300,
      getElevation: getElevation(countr) as any,
    }),
  ]
  return (
    <Box position="relative" w="full" h="full">
      {/* @ts-ignore */}
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
        // @ts-ignore
        getTooltip={getTooltip(countr)}
      >
        <StaticMap mapStyle={BASEMAP.POSITRON} />
      </DeckGL>
    </Box>
  )
}
