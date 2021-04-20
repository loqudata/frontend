import { useRouter } from "next/dist/client/router"
import React from "react"
import { withLayout } from "src/components/Layout"
import { CountryContainer } from "src/features/entities/components/Country"
import { normalizeQueryParam } from "src/services/utils"

export const CountryByCode = () => {
  const { query } = useRouter()

  const { code } = query

  return (
    <CountryContainer
      iso={normalizeQueryParam(code) || ""}
    ></CountryContainer>
  )
}

export default withLayout(CountryByCode)
