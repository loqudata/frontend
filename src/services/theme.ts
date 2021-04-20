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
    heading: "fonts.body",
    mono: "Menlo, monospace",
  },
  colors,
  styles: {
    global: {
      svg: {
        // color: "green.500",
        // width:"100%"
      },
    },
  },
})
