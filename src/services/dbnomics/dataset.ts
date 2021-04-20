import axios from "axios"
import { Endpoints } from "../config/endpoints"

export interface DatasetResponse {
  _meta: Meta
  datasets: { docs: Dataset[] }
  errors: null
}

export interface Meta {
  args: Args
  version: string
}

export interface Args {
  provider_code: string
  dataset_code: string
}

export interface Dataset {
  name: string
  code: string

  converted_at: string
  created_at: string
  dimensions_codes_order: string[]
  // TODO:
  dimensions_labels: any
  dimensions_values_labels: any

  indexed_at: string
  json_data_commit_ref: string
  nb_series: number

  provider_code: string
  provider_name: string
}

export async function getDataset(
  provider?: string,
  dataset?: string
): Promise<Dataset> {
  if (!dataset || !provider) {
    throw new Error("Failed to load")
  }
  const out = await axios.get<DatasetResponse>(
    Endpoints.DBNomics + `datasets/${provider}/${dataset}?limit=1`
  )
  const fin = out.data.datasets.docs[0]
  if (!fin) {
    throw new Error("No result")
  }
  return fin
}
