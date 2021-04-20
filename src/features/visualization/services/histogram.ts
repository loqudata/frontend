import { vegaDefaults } from "./shared"
import { VegaDataSpec } from "./vegaData"

export const histogram = (data: VegaDataSpec, field: string) => ({
  ...vegaDefaults(),
  width: "container",
  data,
  mark: "bar",
  encoding: {
    x: {
      bin: true,
      field,
    },
    y: { aggregate: "count" },
    tooltip: [
      {
        bin: true,
        field,
      },
      { aggregate: "count" },
    ],
  },
})

export const bar = (
  data: VegaDataSpec,
  xField: string,
  yField: string
) => ({
  ...vegaDefaults(),
  width: "container",
  data,
  mark: "bar",
  encoding: {
    x: {
      field: xField,
    },
    y: {
      field: yField,
    },
    tooltip: [
      {
        field: xField,
      },
      {
        field: yField,
      },
    ],
  },
})
