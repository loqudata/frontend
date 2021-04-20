import * as vega from "vega"

export async function getSpec(
  url = "https://vega.github.io/vega/examples/bar-chart.vg.json"
): Promise<vega.Spec | undefined> {
  if (url.startsWith("example://")) {
    let spec = {}
    const name = url.substring(10)
    console.log("Finding example ", name)

    switch (name) {
      case "barchart":
        spec = {
          $schema: "https://vega.github.io/schema/vega-lite/v5.json",
          description: "A simple bar chart with embedded data.",
          width: "container",
          title: "Bar Chart",
          config: {
            font: "Inter",
            text: {
              fontSize: 18,
            },
          },
          data: {
            values: [
              { a: "A", b: 28 },
              { a: "B", b: 55 },
              { a: "C", b: 43 },
              { a: "A", b: 28 },
              { a: "D", b: 91 },
              { a: "E", b: 81 },
              { a: "A", b: 32 },
              { a: "F", b: 53 },
              { a: "A", b: 28 },
              { a: "A", b: 66 },
              { a: "A", b: 28 },
              { a: "G", b: 19 },
              { a: "A", b: 11 },
              { a: "H", b: 87 },
              { a: "I", b: 52 },
            ],
          },
          mark: "bar",
          encoding: {
            x: {
              field: "a",
              type: "nominal",
              axis: { labelAngle: 0 },
              title: "A great data title",
            },
            y: {
              field: "b",
              type: "quantitative",
              aggregate: "average",
            },
          },
        }
        break
      default:
        console.error(`Example ${name} not found`)
    }
    return spec
  } else {
    console.log("Getting Vega spec from url", url)

    try {
      const res = await fetch(url)
      const spec = res.json() as vega.Spec
      return spec
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
}
