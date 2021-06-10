import {
  Box,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout"
import { Button, Flex, Icon, Image } from "@chakra-ui/react"

import Link from "next/link"
import React from "react"
import Layout from "src/components/Layout"
import { Splash } from "src/components/Splash"
import { ABOUT_PAGE_LOCATION } from "src/services/config/app"
import {
  HiChartBar,
  HiDownload,
  HiGlobe,
  HiSearch,
} from "react-icons/hi"

type Feature = {
  title: string
  description: string
  icon: any
}

const features: Feature[] = [
  {
    title: "Explore",
    description:
      "Use powerful faceted search features to find datasets based on linked concepts. Also, discover the most popular datasets.",
    icon: HiSearch,
  },
  {
    title: "Visualize",
    description:
      "Easily build beautiful visualizations, change their style, and export them.",
    icon: HiChartBar,
  },
  {
    // Connect, Integrate, Export
    title: "Connect",
    description:
      "Combine multiple datasets and export them into other data tools like Google Sheets, Pandas, or your database.",
    icon: HiDownload,
    // CloudDownload, Code, Download, ExternalLink, Link, Save, Share
  },
  {
    title: "Contribute",
    description:
      "Link datasets to the concepts they contain, and share and re-use visualizations. Or contribute to the source code, documentation, or translations.",
    // Globe
    icon: HiGlobe,
  },
]

const Feature = ({ feature }: { feature: Feature }) => (
  <Box
    backgroundColor="white"
    // backgroundColor="#f9fafc"
    borderRadius="md"
    p={12}
    minH={72}
  >
    <Flex
      width={16}
      height={16}
      borderRadius="lg"
      boxShadow="md"
      backgroundColor="teal.500"
      // opacity={0.8}
      ml="auto"
      mr="auto"
      // The paddding (12) plus half the height (8)
      mt={-20}
      alignItems="center"
      justifyContent="center"
    >
      <Icon as={feature.icon} w={8} h={8} color="white"></Icon>
    </Flex>
    <Heading
      fontFamily="Manrope"
      size="lg"
      textAlign="center"
      mt={6}
      mb={4}
    >
      {feature.title}
    </Heading>
    <Text
      // fontFamily="Inter"
      color="gray.600"
      // p={6}
      textAlign="center"
      lineHeight={1.5}
    >
      {feature.description}
    </Text>
  </Box>
)

export default function HomePage() {
  return (
    <Layout containerProps={{ p: 0 }} navShadow={false}>
      <Splash></Splash>
      <Box
        // bgGradient="linear(to-r, pink.500, blue.500, teal.600)"
        backgroundColor="gray.50"
        // backgroundColor="#f9fafc"
        // opacity="70%"
        p={10}
        pt={24}
      >
        <Heading
          mb={16}
          size="xl"
          textAlign="center"
          color="gray.700"
          // fontFamily="Manrope"
          // mb={4}
        >
          {/* What people are saying */}
          Features
        </Heading>
        <SimpleGrid
          minChildWidth="200px"
          spacingX={{ base: 6, "2xl": 12 }}
          spacingY={{ base: 12, "2xl": 12 }}
        >
          {features.map((f) => (
            <Feature feature={f} key={f.title}></Feature>
          ))}
        </SimpleGrid>
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
          <Link href={ABOUT_PAGE_LOCATION}>
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
