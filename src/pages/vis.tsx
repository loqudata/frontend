import React from "react"
import { Editor } from "src/features/visbuild/components/Editor"
import { Stack } from "@chakra-ui/layout"
import { Heading } from "@chakra-ui/react"

import Layout from "../components/Layout"
const vis = () => {
  return (
    <Layout title="Visualization Editor">
      <Stack spacing={6}>
        <Heading size="xl">Visualization Editor</Heading>
        <Editor></Editor>
      </Stack>
    </Layout>
  )
}

export default vis
