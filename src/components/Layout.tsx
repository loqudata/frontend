/** The app layout. Includes some styles and the structure of most pages with a footer */
import React, { ReactNode } from "react"
import Head from "next/head"
import { APP_NAME } from "../services/config/app"
import { Box, Flex, FlexProps, Spacer } from "@chakra-ui/react"
import { Nav } from "./Nav"
import { Footer } from "./Footer"

type Props = {
  children?: ReactNode
  title?: string
  containerProps?: FlexProps
  nav?: boolean
  navShadow?: boolean
}

const makeFullFont = (font: string) =>
  `family=${font}:wght@200;300;400;500;600;700;800`
const makeGoogleFontsURL = (fontFamilies: string[]) =>
  `https://fonts.googleapis.com/css2?${makeFullFont(
    fontFamilies[0]
  )}${
    fontFamilies.length > 1
      ? fontFamilies
          .slice(1)
          .map((f) => "&" + makeFullFont(f))
          .join("")
      : ""
  }&display=swap`

const Layout = ({
  children,
  title = APP_NAME,
  nav = true,
  navShadow = true,
  containerProps,
}: Props) => (
  <Flex w="full" direction="column">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Inter:wght@300;400;500;700;900&display=swap"
        rel="stylesheet"
      /> */}
      {/* <link rel="preconnect" href="https://fonts.gstatic.com"> */}
      <link
        href={makeGoogleFontsURL([
          // Geometrics
          // "Rubik",
          "Manrope",
          "Poppins",
          "DM Sans",
          // more straight
          "Inter",
          // "Heebo",
          "Karla",
          "Archivo",
          // "Arimo",
          // serifs
          "Merriweather",
        ])}
        rel="stylesheet"
      ></link>

      {/* <link
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab&family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      /> */}
      {/* <script src="../services/sjsonnet.js"></script> */}

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css"
      />
      {/* <script
        async
        defer
        data-domain="loqudata.org"
        src="https://metrics.loqudata.org/js/plausible.js"
      ></script> */}
    </Head>
    {nav ? (
      <Nav
        shadow={navShadow}
        title={title != APP_NAME ? title : undefined}
      ></Nav>
    ) : null}
    <Box
      as="main"
      w="full"
      maxW="100vw"
      p={10}
      pt={5}
      h="full"
      {...containerProps}
    >
      {children}
    </Box>
    {!containerProps ? <Spacer></Spacer> : null}
    <Footer></Footer>
  </Flex>
)

export default Layout

/** A HOC to apply the Layout component as a wrapper around the provided */
export const withLayout = <P,>(
  Component: (props: P) => React.ReactElement
  // eslint-disable-next-line react/display-name
) => (props: P) => {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}
