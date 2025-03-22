import { create } from 'zustand'
import { Tag } from '@/shared/lib/types'
import { setTag } from '@/shared/api'

type TagStore = {
  name: string
  setName: (name: string) => void
  submit: () => Promise<void>
}

export const useTagStore = create<TagStore>((set, get) => ({
  name: '',
  setName: (name: string) => set({ name }),
  submit: async () => {
    const { name } = get()
    const tag: Tag = {
      name: name,
    }
    await setTag(tag)
  },
}))
