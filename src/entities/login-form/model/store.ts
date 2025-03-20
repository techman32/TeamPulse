import { create } from 'zustand'
import { logIn } from '@/shared/api'

type LoginFormState = {
  login: string
  password: string
  setLogin: (login: string) => void
  setPassword: (password: string) => void
  submit: () => Promise<{ success: boolean }>
}

export const useLoginFormState = create<LoginFormState>((set, get) => ({
  login: '',
  password: '',
  setLogin: (login: string) => set({ login }),
  setPassword: (password: string) => set({ password }),
  submit: async () => {
    const { login, password } = get()
    const response = await logIn(login, password)
    return response.success
  },
}))
