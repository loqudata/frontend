import { withLayout } from "src/components/Layout"
import { ProviderDisplay } from "src/components/Provider"
import { GetStaticPaths, GetStaticProps } from "next"
import {
  getAllProviders,
  getProvider,
  Provider,
} from "src/services/dbnomics/provider"

export default withLayout(ProviderDisplay)

export const getStaticPaths: GetStaticPaths = async () => {
  const allProviders = await getAllProviders()

  const rv = {
    paths: allProviders.map((p: Provider) => ({
      params: { provider: p.code },
    })),
    //   Because we're not just handling providers (these we could limit)
    // but also resources which would be impossible to prerender
    fallback: false,
  }
  console.log(JSON.stringify(rv, undefined, 4))

  return rv
}

export const getStaticProps: GetStaticProps = async (context) => {
  const provider = context.params?.provider
  if (!provider || Array.isArray(provider)) {
    throw new Error("Failed to render")
  }
  const data = await getProvider(provider)

  return {
    props: {
      data,
    },
  }
}
