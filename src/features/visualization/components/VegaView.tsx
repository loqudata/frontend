import { Vega } from "react-vega"

import * as vega from "vega"
interface ViewProps {
  spec: any
}

export const SimpleVega = ({ spec }: ViewProps) => (
  <Vega
    renderer="svg"
    logLevel={vega.Info}
    style={{ width: "100%" }}
    spec={spec}
    mode="vega-lite"
  />
)

export const VegaView = ({ spec }: ViewProps) => {
  return (
    <div>
      <Vega
        renderer="svg"
        logLevel={vega.Info}
        style={{ width: "100%" }}
        spec={spec}
        mode="vega-lite"
      />
    </div>
  )
}
