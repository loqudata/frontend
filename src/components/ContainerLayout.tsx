/** A layout that places children in a container.
 * Good for MDX files.
 */
import React from "react"

import Layout from "./Layout"
import { Container } from "@chakra-ui/react"

export const ContainerLayout = ({
  children,
}: {
  children: React.ReactElement
}) => {
  return (
    <Layout>
      <Container maxW="2xl">{children}</Container>
    </Layout>
  )
}
