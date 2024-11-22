export interface TreeView {
  id: number
  name: string
  isOpen: boolean
  children: TreeView[]
}

export interface TreeSelected {
  id: number
  name: string
}
