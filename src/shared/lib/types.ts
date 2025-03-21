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
  createdAt: string
}

export type Tag = {
  name: string
}

export type CreatedGroup = {
  name: string
  employeeIds: string[]
}

export type Template = {
  id: string
  name: string
  description: string
  status: string
  authorLogin: string
  createdAt: string
  updatedAt: string
}

export type Point = {
  name: string
  points: number
}

export type Answer = {
  text: string
  points: Point[]
}

export type Question = {
  text: string
  answerType: number
  tags: string[]
  answers: Answer[]
}

export type Topic = {
  name: string
  questions: Question[]
}

export type CreatedTemplate = {
  name: string
  description: string
  status: string
  topics: Topic[]
}

export type CreatedTest = {
  name: string
  description: string
  templateId: string
  subjectId?: string
  lateResult: boolean
  isAnonymous: boolean
  frequency: string
  startDate: string
  endDate: string
  assignToAll: boolean
  groupIds: string[]
  employeeIds: string[]
}

export type Test = {
  id: string
  name: string
  description: string
  assignerLogin: string
  subjectLogin: string
  startDate: string
  endDate: string
  status: string
}

export type AssignedTest = {
  topics: {
    id: string
    name: string
  }
  subjectFullName: {
    firstName: string
    lastName: string
  }
} & Test

export type AssignedQuestion = {
  text: string
  answerType: number
  answers: Answer[]
}

export type AssignedTopic = {
  id: string
  name: string
  questions: AssignedQuestion[]
}
