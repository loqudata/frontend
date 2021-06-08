import React from "react"
import { Stack } from "@chakra-ui/layout"
import { Heading } from "@chakra-ui/react"

import Layout from "../components/Layout"

import SjsonnetMain from "../services/sjsonnet"
import { Sjsonnet } from "typings/sjsonnet"

// import chart from "../../data/barchart.jsonnet"
const chart = `
local Chart(data = {}, xField = "", yField = "") = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with embedded data.",
    "data": data,
    "mark": "bar",
    "encoding": {
      "x": {"field": xField, "type": "nominal", "axis": {"labelAngle": 0}},
      "y": {"field": yField, "type": "quantitative"}
    }
  };
  
  
  {
    chart: Chart({
      "values": [
        {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}
      ]
    }, "a", "b")
  }
`
const sj: Sjsonnet = SjsonnetMain
const vis = () => {
  console.log(
    sj.interpret(
      chart,
      {},
      {},
      "",
      //@ts-ignore
      (wd, imported) => null
    )
  )

  return (
    <Layout title="Search">
      <Stack spacing={6}>
        <Heading size="xl">Testim</Heading>
      </Stack>
    </Layout>
  )
}

export default vis
