export type Group = {
  id: string
  name: string
}

export type User = {
  id?: string
  fullName: {
    firstName: string
    lastName: string
  }
  login: string
  email: string
  role: string
  groups: Group[] | string[]
  createdAt?: string
}
