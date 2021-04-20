import { useState } from "react"
import { VegaForm } from "../components/VegaForm"
import { VegaView } from "../features/visualization/components/VegaView"
// import { barchart } from "../services/examples"

export const Editor = () => {
  const [spec] = useState({ encoding: { x: {} } })

  return (
    <div>
      <VegaForm model={spec.encoding.x}></VegaForm>
      <VegaView spec={spec}></VegaView>
    </div>
  )
}
