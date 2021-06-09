import { Heading } from "@chakra-ui/layout"
import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
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

export const Nav = ({ shadow = true }: { shadow?: boolean }) => {
  const { pathname } = useRouter()
  return (
    <Flex
      p={6}
      px={10}
      boxShadow={shadow ? "sm" : ""}
      borderRadius={4}
    >
      <Box flexGrow={1}>
        <Link href="/">
          <Heading size="lg" letterSpacing="tighter" cursor="pointer">
            LoquData
          </Heading>
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
              color={pathname == e.path ? "teal.600" : "unset"}
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
