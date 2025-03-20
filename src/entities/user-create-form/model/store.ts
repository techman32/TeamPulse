import { create } from 'zustand'
import { Group, User } from '@/shared/lib/types'
import { setUser } from '@/shared/api'

type NewUser = {
  firstName: string
  lastName: string
  login: string
  email: string
  role: string
  groups: Group[]
}

type UserCreateStore = {
  user: NewUser
  updateField: (field: keyof NewUser, value: NewUser[keyof NewUser]) => void
  submit: () => Promise<void>
}

export const useUserCreateStore = create<UserCreateStore>((set, get) => ({
  user: {
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    role: '',
    groups: [],
  },
  updateField: (field: keyof NewUser, value: NewUser[keyof NewUser]) => {
    set((state) => ({
      user: {
        ...state.user,
        [field]: value,
      },
    }))
  },
  submit: async () => {
    const { user } = get()
    const newUser: User = {
      fullName: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      login: user.login,
      email: user.email,
      role: user.role,
      groups: user.groups.map((g) => g.id),
    }

    await setUser(newUser)
  },
}))
