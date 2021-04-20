import { Heading, Text } from "@chakra-ui/layout"
import Layout from "../components/Layout"
import { Links } from "src/features/linker/components/Links"

const LinkPage = () => (
  <Layout
    title="Link"
    containerProps={{
      flexGrow: 1,
      display: "flex",
      flexDir: "column",
    }}
  >
    <Heading fontSize="2xl" mb={2}>
      Linker
    </Heading>
    <Text>
      Create links from our metadata to other sources, like DBPedia,
      Geonames, or Wikidata
    </Text>
    <Links></Links>
  </Layout>
)

export default LinkPage
