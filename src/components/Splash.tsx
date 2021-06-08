/** The splash page */

import React from "react"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout"
import VisualizeDiagram from "../assets/visualize.svg"
import AutoComplete from "../features/search/components/Autocomplete"
export const Splash = ({ ...props }) => {
  return (
    <Flex
      {...props}
      w="90vw"
      minH="30vh"
      my={24}
      mt={12}
      mx="auto"
      justify="center"
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
        <Heading
          size="lg"
          fontFamily="Manrope"
          fontWeight="bold"
          letterSpacing="tight"
          maxW="3xl"
        >
          Over{" "}
          <Heading
            display="inline"
            size="lg"
            fontFamily="Manrope"
            fontWeight="bold"
            letterSpacing="tight"
            color="pink.500"
          >
            700,000,000
          </Heading>{" "}
          data series from governments, statistical organizations, and
          other public sources
        </Heading>
        {/* <AutoComplete></AutoComplete> */}
      </Box>

      {/* Seems like Firefox and Chrome are different about maxWidth inside a Flex element */}
      <Box width={{ base: "md", md: "2xl" }} color="pink.500">
        <VisualizeDiagram></VisualizeDiagram>
      </Box>
    </Flex>
  )
}
