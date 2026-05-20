export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  editedAt: string | null
}

export type AppMode = "create" | "view" | "edit";