import { create } from 'zustand'
import { CreatedGroup } from '@/shared/lib/types'
import { setGroup } from '@/shared/api'

type GroupStore = {
  name: string
  employees: string[]
  setName: (name: string) => void
  setEmployees: (employees: string[]) => void
  submit: () => Promise<void>
}
export const useGroupStore = create<GroupStore>((set, get) => ({
  name: '',
  employees: [],
  setName: (name: string) => set({ name }),
  setEmployees: (employees: string[]) => set({ employees }),
  submit: async () => {
    const { name, employees } = get()
    const data: CreatedGroup = {
      name: name,
      employeeIds: employees,
    }
    await setGroup(data)
  },
}))
