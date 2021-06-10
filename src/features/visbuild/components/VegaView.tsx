import { Box } from "@chakra-ui/layout"
import { Vega } from "react-vega"

import * as vega from "vega"
interface ViewProps {
  spec: any
}

export const VegaView = ({ spec }: ViewProps) => {
  return (
    <Box w="70%">
      <Box>
        <Vega
          renderer="svg"
          logLevel={vega.Info}
          style={{ width: "100%" }}
          spec={spec}
          mode="vega-lite"
        />
      </Box>
    </Box>
  )
}
