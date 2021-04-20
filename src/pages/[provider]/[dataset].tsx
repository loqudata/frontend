import { withLayout } from "src/components/Layout"
import React from "react"
// import { Dataset, getDataset } from "src/services/dbnomics/dataset"
import { useAsync } from "react-async-hook"
import { StatusWrapper } from "../../components/StatusWrapper"
import { useRouter } from "next/dist/client/router"
import { getDatasetRDF } from "src/services/dbnomics/datasetRDF"
import { DatasetView } from "src/features/datasets/components/DatasetView"

export const DatasetContainer = () => {
  const { query } = useRouter()

  let { dataset, provider } = query

  if (Array.isArray(dataset)) dataset = dataset[0]
  if (Array.isArray(provider)) provider = provider[0]

  // const status = useAsync(getDataset, [provider, dataset])

  const stat2 = useAsync(getDatasetRDF, [provider, dataset])

  return <StatusWrapper s={stat2} C={DatasetView}></StatusWrapper>
}

export default withLayout(DatasetContainer)
