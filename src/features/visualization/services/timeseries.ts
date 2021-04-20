import _ from "lodash"
import { VisualizationSpec } from "vega-embed"
// import { Encoding } from "vega-lite/src/encoding";
import { PositionDef } from "vega-lite/build/src/channeldef"
import { LayerSpec } from "vega-lite/build/src/spec"
import { SeriesData } from "../../../services/dbnomics/series"
import { vegaDefaults } from "./shared"
import { VegaDataSpec } from "./vegaData"

/** Creates a time series with a vertical line and a tooltip for the values */
const timeSeriesWithTooltips = (
  timeField: string,
  valueField: string,
  brushed: boolean
): LayerSpec<string> => {
  let xSpec: PositionDef<string> = {
    field: timeField,
    type: "temporal",
  }
  if (brushed) {
    xSpec = Object.assign(xSpec, {
      scale: { domain: { param: "brush" } },
      axis: { title: "" },
    })
  }
  return {
    width: "container",
    // First we encode the X-axis as time
    encoding: {
      x: xSpec,
    },
    layer: [
      {
        // We add the line graph quantitative values
        mark: "line",
        encoding: { y: { field: valueField, type: "quantitative" } },

        //   we also add a point that shows on hover (mark line should match)
        layer: [
          { mark: "line" },
          {
            transform: [{ filter: { param: "hover", empty: false } }],
            mark: "point",
          },
        ],
      },
      {
        // Now we add a a vertical line that shows on hover, with light opacity
        mark: "rule",
        encoding: {
          opacity: {
            condition: { value: 0.3, param: "hover", empty: false },
            value: 0,
          },
          // And a tooltip next to it with the values
          tooltip: [
            {
              field: timeField,
              type: "temporal",
            },
            { field: valueField, type: "quantitative" },
          ],
        },

        //   We specify that the hover should activate the point, and
        // that it should show the nearest values (so it doesn't dip in  and out)
        params: [
          {
            name: "hover",
            select: {
              type: "point",
              fields: [timeField],
              nearest: true,
              on: "mouseover",
              clear: "mouseout",
            },
          },
        ],
      },
    ],
  }
}

/** A wrapper for taking a DBNomics series data and returning a timeseries spec */
export const timeseries = (series: SeriesData): VisualizationSpec =>
  timeseriesWrapper(
    {
      values: _.zip(series.period, series.value).map(([p, v]) => ({
        time: p,
        value: v,
      })),
    },
    series.series_name
  )

/** Creates a timeseries with the main tooltip view and a minimap view */
export const timeseriesWrapper = (
  data: VegaDataSpec,
  name: string,
  timeField = "time",
  valueField = "value",
  ...args: any
): VisualizationSpec => ({
  ...vegaDefaults(name),
  data,
  vconcat: [
    timeSeriesWithTooltips(timeField, valueField, true),
    {
      width: "container",
      height: 60,
      mark: "line",
      params: [
        {
          name: "brush",
          select: { type: "interval", encodings: ["x"] },
        },
      ],
      encoding: {
        x: {
          field: timeField,
          type: "temporal",
        },
        y: {
          field: valueField,
          type: "quantitative",
          axis: { tickCount: 3, grid: false },
        },
      },
    },
  ],
  ...args,
})
