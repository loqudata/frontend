import type { AppProps /*, AppContext */ } from "next/app"

// import "semantic-ui-css/semantic.min.css"
import "../styles/main.css"

import "maplibre-gl/dist/maplibre-gl.css"

import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../services/theme"

import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

import { MDXProvider } from "@mdx-js/react"
import "setimmediate"
import { components } from "src/components/ChakraComponents"

import "react-virtualized/styles.css"
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={components}>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </MDXProvider>
    </ChakraProvider>
  )
}

export default MyApp
