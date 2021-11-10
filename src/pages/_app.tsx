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

import "semantic-ui-css/semantic.min.css"

// import { Buffer } from "buffer"
// //@ts-ignore
// window.Buffer = Buffer

import React from "react"

export const CoreApp = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={components}>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </MDXProvider>
    </ChakraProvider>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CoreApp>
      <Component {...pageProps} />
    </CoreApp>
  )
}

export default MyApp
