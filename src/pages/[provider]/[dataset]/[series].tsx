import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import Layout from "src/components/Layout"
import { SeriesVis } from "src/features/visualization/components/SeriesVis"
import { normalizeQuery } from "src/services/utils"

export const Series = () => {
  const { query } = useRouter()
  // console.log(query)

  const qs = normalizeQuery(query)
  // console.log(qs)

  return (
    <Layout title="Series">
      <Heading size="xl" mb={6}>
        Series
      </Heading>
      <SeriesVis spec={qs as any}></SeriesVis>
    </Layout>
  )
}

export default Series
