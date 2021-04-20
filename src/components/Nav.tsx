import { Heading } from "@chakra-ui/layout"
import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const NavEntries = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
]

export const Nav = () => {
  const { pathname } = useRouter()
  return (
    <Flex p={6} boxShadow="sm" borderRadius={4}>
      <Box flexGrow={1}>
        <Link href="/">
          <Heading size="md" letterSpacing="tighter" cursor="pointer">
            LoquData
          </Heading>
        </Link>
      </Box>
      <Flex>
        {NavEntries.map((e) => (
          <Link href={e.path} key={e.title}>
            <Heading
              cursor="pointer"
              mr={4}
              size="sm"
              letterSpacing="tighter"
              color={pathname == e.path ? "pink.500" : "unset"}
            >
              {e.title}
            </Heading>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
