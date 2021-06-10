import { useState } from "react"
import { VegaForm } from "./VegaForm"
import { VegaView } from "./VegaView"
import { barchart } from "../services/examples"
import { Box, Flex } from "@chakra-ui/layout"
import VegaExamples from "./VegaExamples"
import { useAsync } from "react-async-hook"
import { getExample } from "../services/vegaExamples"

export const Editor = () => {
  const [example, setExample] = useState("bar")
  const r = useAsync(getExample, [example])

  if (r.status == "success" && r.result) {
    const spec = r.result
    return (
      <Box>
        <Box>Currently selected: {example}</Box>
        <VegaExamples onSelect={setExample}></VegaExamples>
        <Flex direction="row">
          <VegaForm
            model={spec.encoding.x}
            // autosave
            // autosaveDelay={1000}
            // onChange={(k, v) => {
            //   console.log(k, v)
            //   // updateSpec((p) => Object.assign(p, { x: m }));
            // }}
            // onSubmit={(m) => {
            //   console.log("model", m)

            //   updateSpec((p) => Object.assign(p, { x: m }))
            // }}
          ></VegaForm>
          <VegaView spec={spec}></VegaView>
        </Flex>
      </Box>
    )
  } else {
    return (
      <Box>
        <Box>Currently selected: {example}</Box>
        <VegaExamples onSelect={setExample}></VegaExamples>
        Loading...
      </Box>
    )
  }
}
