/** These components are used by the MDX provider to render MDX elements */
/* eslint-disable react/display-name */
import {
  Text,
  ListItem,
  UnorderedList,
  Heading,
} from "@chakra-ui/react"
import React from "react"

//  Creating the components mapping
export const components = {
  h1: ({ children }: { children: React.ReactElement }) => (
    <Heading fontSize="2xl" mb={3}>
      {children}
    </Heading>
  ),
  h2: ({ children }: { children: React.ReactElement }) => (
    <Heading fontSize="xl" my={3}>
      {children}
    </Heading>
  ),
  h3: ({ children }: { children: React.ReactElement }) => (
    <Heading fontSize="md" my={3}>
      {children}
    </Heading>
  ),
  ul: ({ children }: { children: React.ReactElement }) => (
    <UnorderedList my={0} listStyleType={undefined}>
      {children}
    </UnorderedList>
  ),
  li: ({ children }: { children: React.ReactElement }) => (
    <ListItem>{children}</ListItem>
  ),
  p: ({ children }: { children: React.ReactElement }) => (
    <Text my={2}>{children}</Text>
  ),
  //   Header,
  HeaderText: ({ children }: { children: React.ReactElement }) => (
    <Heading>{children}</Heading>
  ),
  //   Section,
  //   Layout,
}
