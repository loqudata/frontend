export type UpdateSelected = (
  dimCode: string,
  valCode: string,
  value: boolean
) => void

export type SelectedValues = {
  [dimensionCode: string]: { [valueCode: string]: boolean }
}
