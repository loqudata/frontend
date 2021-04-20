/** The splash page */

import React from "react"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout"
import VisualizeDiagram from "../assets/visualize.svg"
import AutoComplete from "../features/search/components/Autocomplete"
export const Splash = ({ ...props }) => {
  return (
    <Flex
      {...props}
      minH="70vh"
      mt={-10}
      w="90vw"
      mx="auto"
      justify="center"
      align="center"
      direction={{ base: "column", md: "row" }}
    >
      <Stack
        spacing={6}
        my={{ base: 6, lg: 24 }}
        mr={{ base: 0, md: 12, lg: 24 }}
        maxW={{ base: "100%", md: "50%" }}
      >
        <Heading
          size="4xl"
          letterSpacing="tighter"
          // as="span"
          // fontFamily="Poppins"
          // color="teal.400"
          // fontStyle="italic"
          fontWeight="bold"
        >
          Loqu Data
        </Heading>
        {/* <Heading size="4xl" fontWeight="medium">
        Data
      </Heading> */}
        <Text fontSize="2xl" maxW="lg">
          Explore and visualize{" "}
          <Text
            as="span"
            fontSize="2xl"
            fontWeight="extrabold"
            color="teal.500"
          >
            776 million
          </Text>{" "}
          data series from statistical organizations around the world.
        </Text>
        <Text fontSize="2xl">100% free and open source.</Text>
        <AutoComplete></AutoComplete>
      </Stack>

      {/* Seems like Firefox and Chrome are different about maxWidth inside a Flex element */}
      <Box width={{ base: "md", md: "2xl" }} color="pink.500">
        <VisualizeDiagram></VisualizeDiagram>
      </Box>
    </Flex>
  )
}
