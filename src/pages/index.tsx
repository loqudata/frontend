import { Box, Heading, Stack, Text } from "@chakra-ui/layout"
import { Button, Flex, Image } from "@chakra-ui/react"

import Link from "next/link"
import React from "react"
import Layout from "src/components/Layout"
import { Splash } from "src/components/Splash"

const sections = [
  {
    title: "Visualize External Data with Data Cube View",
    comp: () => (
      <Link href={"/table"}>
        <Flex
          alignItems="center"
          justifyContent="center"
          h="full"
          cursor="pointer"
        >
          <Image src="/images/visualize.png" maxW="md"></Image>
        </Flex>
      </Link>
    ),
  },
  {
    title: "Countries",
    comp: () => (
      <Link href={"/countries"}>
        <Flex
          alignItems="center"
          justifyContent="center"
          h="full"
          cursor="pointer"
        >
          <Image src="/images/countries.png" maxW="md"></Image>
        </Flex>
      </Link>
    ),
  },
]

export default function HomePage() {
  return (
    <Layout containerProps={{ p: 0 }}>
      <Splash></Splash>
      <Box
        // bgGradient="linear(to-r, pink.500, blue.500, teal.500)"
        backgroundColor="gray.200"
        // opacity="70%"
        p={10}
      >
        <Heading size="lg" textAlign="center" color="pink.600" mb={4}>
          Explore
        </Heading>
        <Flex flexDir={{ base: "column", md: "row" }}>
          {sections.map((s) => (
            <Box
              key={s.title}
              flexGrow={1}
              m={4}
              backgroundColor="white"
              height="sm"
              p={6}
              borderRadius={8}
              boxShadow="sm"
            >
              <Heading size="sm" textAlign="center" color="black">
                {s.title}
              </Heading>
              <s.comp></s.comp>
            </Box>
          ))}
        </Flex>
      </Box>
      <Flex alignItems="center" justifyContent="center">
        <Stack
          display="flex"
          my={6}
          spacing={4}
          alignItems="center"
          justifyContent="center"
          padding="4"
          w="xl"
          textAlign="center"
        >
          <Heading>Learn More</Heading>
          <Text w="md">
            Dive into the details on the source data, how Loqu works,
            and what it'll look like in the future.
          </Text>
          <Link href="/about">
            <Button colorScheme="teal">About</Button>
          </Link>
        </Stack>
      </Flex>
      {/* <Box p={8}>
        <Container maxW="container.sm">
        </Container>
      </Box> */}
    </Layout>
  )
}
