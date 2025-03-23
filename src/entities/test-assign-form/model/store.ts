import { create } from 'zustand'
import { CreatedTest } from '@/shared/lib/types'
import { setTest } from '@/shared/api'

type AssignmentTestStore = {
  name: string
  description: string
  frequency: string
  startDate: string
  endDate: string
  subjectId: string
  groups: string[]
  testId: string
  toAll: boolean
  isAnonymous: boolean
  lateResult: boolean
  employees: string[]
  setName: (name: string) => void
  setDescription: (description: string) => void
  setFrequency: (frequency: string) => void
  setStartDate: (startDate: string) => void
  setSubjectId: (subjectId: string) => void
  setEndDate: (endDate: string) => void
  setGroups: (groups: string[]) => void
  setEmployees: (employees: string[]) => void
  setIsAnonymous: (isAnonymous: boolean) => void
  setLateResult: (lateResult: boolean) => void
  setTestId: (testId: string) => void
  setToAll: (toAll: boolean) => void
  reset: () => void
  submit: () => Promise<{ success: boolean }>
}

export const useAssignmentTestStore = create<AssignmentTestStore>((set, get) => ({
  name: '',
  description: '',
  frequency: '',
  startDate: '',
  endDate: '',
  groups: [],
  subjectId: '',
  testId: '',
  toAll: false,
  lateResult: false,
  isAnonymous: false,
  employees: [],
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setFrequency: (frequency: string) => set({ frequency }),
  setIsAnonymous: (isAnonymous: boolean) => set({ isAnonymous }),
  setLateResult: (lateResult: boolean) => set({ lateResult }),
  setSubjectId: (subjectId: string) => set({ subjectId }),
  setStartDate: (startDate: string) => set({ startDate }),
  setEndDate: (endDate: string) => set({ endDate }),
  setGroups: (groups: string[]) => set({ groups }),
  setEmployees: (employees: string[]) => set({ employees }),
  setTestId: (testId: string) => set({ testId }),
  setToAll: (toAll: boolean) => set({ toAll }),
  reset: () => {
    set({
      name: '',
      description: '',
      frequency: '',
      startDate: '',
      endDate: '',
      groups: [],
      subjectId: '',
      testId: '',
      toAll: false,
      lateResult: false,
      isAnonymous: false,
      employees: [],
    })
  },
  submit: async () => {
    const form = get()
    const data: CreatedTest = {
      name: form.name,
      description: form.description,
      templateId: form.testId,
      subjectId: form.subjectId,
      lateResult: form.lateResult,
      isAnonymous: form.isAnonymous,
      frequency: form.frequency,
      startDate: form.startDate,
      endDate: form.endDate,
      assignToAll: form.toAll,
      groupIds: form.groups,
      employeeIds: form.employees,
    }

    return await setTest(data)
  },
}))
