export const vegaDefaults = (name?: string) => ({
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: name,
  //   width: "container",
  title: name,
  config: {
    // font: "Inter",
    text: {
      fontSize: 18,
    },
    title: {
      align: "center",
      offset: 20,
    },
    axis: {
      titlePadding: 20,
    },
  },
})
