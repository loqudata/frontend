import { Heading } from "@chakra-ui/layout"
import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link"
// import { useRouter } from "next/router"
import React from "react"
import { ABOUT_PAGE_LOCATION } from "src/services/config/app"

const NavEntries = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: ABOUT_PAGE_LOCATION,
  },
]

export const Nav = ({
  shadow = true,
  title,
}: {
  shadow?: boolean
  title?: string
}) => {
  // const pathname =  useRouter ? useRouter().pathname : ""
  return (
    <Flex
      p={6}
      px={10}
      boxShadow={shadow ? "sm" : ""}
      borderRadius={4}
    >
      <Box flexGrow={1}>
        <Link href="/">
          <Flex alignItems="center">
            <Heading
              size="lg"
              letterSpacing="tighter"
              cursor="pointer"
            >
              LoquData
            </Heading>

            {/* TODO: Right now we put the page title next to the app title. May want to have just page title. (home for home) */}
            {title ? (
              <Heading ml={2} size="md" letterSpacing="tight">
                | {title}
              </Heading>
            ) : null}
          </Flex>
        </Link>
      </Box>
      <Flex alignItems="center">
        {NavEntries.map((e) => (
          <Link href={e.path} key={e.title}>
            <Heading
              cursor="pointer"
              mr={4}
              size="sm"
              letterSpacing="tighter"
              // color={pathname == e.path ? "teal.600" : "unset"}
              height="fit-content"
            >
              {e.title}
            </Heading>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
