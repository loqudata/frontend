export enum ItemTypes {
  FIELD = "field",
}

interface BasicDragItem {
  type: ItemTypes
}

export interface FieldDragItem extends BasicDragItem {
  index: number
  id: string
}
