/** The splash page */

import React from "react"
import { Box, Flex, Heading } from "@chakra-ui/layout"
// import VisualizeDiagram from "../assets/visualize.svg"
import { Map } from "src/features/map/components/Map"
// import AutoComplete from "../features/search/components/Autocomplete"
export const Splash = ({ ...props }) => {
  return (
    <Flex
      {...props}
      w="90vw"
      minH="30vh"
      mt={6}
      mb={-10}
      mx="auto"
      // justify="center"
      align="center"
      direction="column"
    >
      <Box mb={12} textAlign="center">
        <Heading
          mb={6}
          size="4xl"
          letterSpacing="tighter"
          // as="span"
          fontFamily="Merriweather"
          // color="teal.400"
          // fontStyle="italic"
          fontWeight="bold"
        >
          A world of data
        </Heading>
        {/* <Heading
          size="lg"
          fontFamily="Manrope"
          fontWeight="bold"
          letterSpacing="tight"
          maxW="4xl"
        >
          The easiest way to combine public datasets
          {/* mash-up, combine, connect 
        </Heading> */}
        <Heading
          size="xl"
          fontFamily="DM Sans"
          fontWeight="normal"
          letterSpacing="tight"
          maxW="5xl"
        >
          {/* <Heading
            display="inline"
            size="lg"
            fontFamily="DM Sans"
            fontWeight="bold"
            letterSpacing="tight"
            color="pink.500"
          >
          </Heading> */}
          Explore and visualize over 700,000,000 data series from
          governments, statistical organizations, and other public
          sources
        </Heading>
        {/* <AutoComplete></AutoComplete> */}
      </Box>

      {/* Seems like Firefox and Chrome are different about maxWidth inside a Flex element */}
      <Box
        width="80%"
        h="lg"
        // color="pink.500"
        borderRadius={3}
        boxShadow="lg"
      >
        {/* <VisualizeDiagram></VisualizeDiagram> */}
        <Map countries={{}}></Map>
      </Box>
    </Flex>
  )
}
