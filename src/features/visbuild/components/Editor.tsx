import { useState } from "react"
import { VegaForm } from "./VegaForm"
import { VegaView } from "./VegaView"
import { barchart } from "../services/examples"
import styles from "../styles/index.module.css"

export const Editor = () => {
  const [spec, updateSpec] = useState(barchart)

  return (
    <div className={styles.split}>
      <VegaForm
        model={spec.encoding.x}
        autosave
        autosaveDelay={1000}
        onChange={(k, v) => {
          console.log(k, v)
          // updateSpec((p) => Object.assign(p, { x: m }));
        }}
        onSubmit={(m) => {
          console.log("model", m)

          updateSpec((p) => Object.assign(p, { x: m }))
        }}
      ></VegaForm>
      <VegaView spec={spec}></VegaView>
    </div>
  )
}
