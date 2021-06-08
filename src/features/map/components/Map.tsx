import React, { useState } from "react"

import { DeckGL } from "@deck.gl/react"
import { StaticMap } from "react-map-gl"
import { BASEMAP } from "@deck.gl/carto"

import { Box } from "@chakra-ui/layout"
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

export const Map = () => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

  return (
    <Box position="relative" w="full" h="full" borderRadius={3}>
      {/* @ts-ignore */}
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
        controller={true}
        // layers={layers}
        // @ts-ignore
        // getTooltip={getTooltip(countr)}
      >
        <StaticMap mapStyle={BASEMAP.POSITRON} />
      </DeckGL>
    </Box>
  )
}
