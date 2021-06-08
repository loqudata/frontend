import { Vega } from "react-vega"

import * as vega from "vega"
import styles from "../styles/vegaView.module.css"
interface ViewProps {
  spec: any
}

export const VegaView = ({ spec }: ViewProps) => {
  return (
    <div className={styles.vegaView}>
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
