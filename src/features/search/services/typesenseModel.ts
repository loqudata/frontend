export interface Dataset {
  idx: number
  code: string
  name: string
  description: string

  provider_code: string
  provider_name: string

  dimensions: string[]

  dimension_labels: string[]
  attribute_labels: string[]
  attribute_values: string[]
}
