import { create } from 'zustand'
import { CreatedGroup } from '@/shared/lib/types'
import { setGroup } from '@/shared/api'

type GroupStore = {
  name: string
  employees: string[]
  setName: (name: string) => void
  setEmployees: (employees: string[]) => void
  reset: () => void,
  submit: () => Promise<{ success: boolean }>
}
export const useGroupStore = create<GroupStore>((set, get) => ({
  name: '',
  employees: [],
  setName: (name: string) => set({ name }),
  reset: () => set({ name: '', employees: [] }),
  setEmployees: (employees: string[]) => set({ employees }),
  submit: async () => {
    const { name, employees } = get()
    const data: CreatedGroup = {
      name: name,
      employeeIds: employees,
    }
    return await setGroup(data)
  },
}))
