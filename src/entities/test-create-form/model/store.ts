import { create } from 'zustand'
import { setTemplate } from '@/shared/api'
import { CreatedTemplate } from '@/shared/lib/types'

type Point = {
  name: string
  points: number
}

type Answer = {
  id: string
  text: string
  points: Point[]
}

type Question = {
  id: string
  name: string
  type: number
  tags: string[]
  answers: Answer[]
}

type Test = {
  id: string
  topic: string
  questions: Question[]
}

type TestTemplate = {
  name: string
  description: string
  tests: Test[]
  status: string
  setName: (name: string) => void
  setDescription: (description: string) => void
  setTopic: (testId: string, topic: string) => void
  setStatus: (status: string) => void
  addTest: () => void
  addQuestion: (testId: string) => void
  updateQuestion: (testId: string, questionId: string, data: Partial<Question>) => void
  submit: () => Promise<void>
}

export const useTestTemplateStore = create<TestTemplate>((set, get) => ({
  name: '',
  description: '',
  tests: [],
  status: '',
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setTopic: (testId: string, topic: string) =>
    set((state) => ({
      tests: state.tests.map((test) => (test.id === testId ? { ...test, topic } : test)),
    })),
  setStatus: (status: string) => set({ status }),
  addTest: () =>
    set((state) => ({
      tests: [
        ...state.tests,
        {
          id: crypto.randomUUID(),
          topic: 'default',
          questions: [],
        },
      ],
    })),
  addQuestion: (testId: string) =>
    set((state) => ({
      tests: state.tests.map((test) =>
        test.id === testId
          ? {
              ...test,
              questions: [
                ...test.questions,
                {
                  id: crypto.randomUUID(),
                  name: '',
                  type: 0,
                  answers: [],
                  tags: [],
                },
              ],
            }
          : test,
      ),
    })),
  updateQuestion: (testId: string, questionId: string, data: Partial<Question>) =>
    set((state) => ({
      tests: state.tests.map((test) =>
        test.id === testId
          ? {
              ...test,
              questions: test.questions.map((question) =>
                question.id === questionId ? { ...question, ...data } : question,
              ),
            }
          : test,
      ),
    })),
  submit: async () => {
    const { name, description, status, tests } = get()
    const data: CreatedTemplate = {
      name: name,
      description: description,
      status: status,
      topics: tests.map((topic) => ({
        name: topic.topic,
        questions: topic.questions.map((question) => ({
          text: question.name,
          answerType: question.type,
          tags: question.tags,
          answers: question.answers.map((answer) => ({
            text: answer.text,
            points: answer.points.map((point) => ({
              name: point.name,
              points: point.points,
            })),
          })),
        })),
      })),
    }
    await setTemplate(data)
  },
}))
