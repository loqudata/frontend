import { extendTheme } from "@chakra-ui/react"
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "teal.300",
    800: "teal.400",
    700: "teal.600",
  },
}
export const theme = extendTheme({
  fonts: {
    body: "Arial, sans-serif",
    heading: "Inter",
    mono: "Menlo, monospace",
  },
  colors,
  components: {
    Link: {
      baseStyle: {
        color: "blue.500",
      },
    },
    Text: {
      baseStyle: {
        fontSize: "lg",
        // letterSpacing: "tight",
        // fontWeight: "normal",
      },
    },
    Heading: {
      baseStyle: {
        fontSize: "",
        // fontWeight: "normal",
      },
    },
  },
  styles: {
    global: {
      svg: {
        // color: "green.500",
        // width:"100%"
      },
    },
  },
})
