import { create } from 'zustand'

type LoginFormState = {
  login: string
  password: string
  setLogin: (login: string) => void
  setPassword: (password: string) => void
}

export const useLoginFormState = create<LoginFormState>((set) => ({
  login: '',
  password: '',
  setLogin: (login: string) => set({ login }),
  setPassword: (password: string) => set({ password }),
}))
