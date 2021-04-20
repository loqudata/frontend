import React from "react"

import { Splash } from "./Splash"
import Layout from "./Layout"
import { Container } from "@chakra-ui/react"

export const SplashLayout = ({
  children,
}: {
  children: React.ReactElement
}) => {
  return (
    <Layout nav={false}>
      <Splash></Splash>
      <Container maxW="2xl">{children}</Container>
    </Layout>
  )
}
