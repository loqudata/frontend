import React from "react"
import { TableType } from "./tableSchema"
import { VscSymbolKey } from "react-icons/vsc"
import { BiCalendar, BiHash, BiTime } from "react-icons/bi"

export interface TypeInfo {
  title: string
  description?: string
  icons: ((...args: any[]) => React.ReactElement)[]
  vegaTimeUnit?:
    | "year"
    | "quarter"
    | "month"
    | "date"
    | "week"
    | "day"
    | "dayofyear"
    | "hours"
    | "minutes"
    | "seconds"
    | "milliseconds"
  vegaType?: "quantitative" | "temporal" | "ordinal" | "nominal"
}

export const TableSchemaTypeMap: { [key in TableType]?: TypeInfo } = {
  string: {
    title: "String",
    description:
      "A sequence of characters that represents a text value",
    icons: [VscSymbolKey],
    vegaType: "nominal",
  },
  number: {
    title: "Number",
    icons: [BiHash],
    vegaType: "quantitative",
  },
  integer: {
    title: "Number",
    icons: [BiHash],
    vegaType: "quantitative",
  },
  time: {
    title: "Time",
    icons: [BiTime],
    vegaType: "temporal",
  },
  datetime: {
    title: "Date and Time",
    icons: [BiCalendar, BiTime],
    vegaType: "temporal",
  },
  date: {
    title: "Date",
    vegaTimeUnit: "date",
    icons: [BiCalendar],
    vegaType: "temporal",
  },
  year: {
    title: "Year",
    vegaTimeUnit: "year",
    icons: [BiCalendar],
    vegaType: "temporal",
  },
  yearmonth: {
    title: "Month of Year",
    vegaTimeUnit: "month",
    icons: [BiCalendar],
    vegaType: "temporal",
  },
}
