import { create } from 'zustand'
import { CreatedTemplate } from '@/shared/lib/types'
import { setTemplate } from '@/shared/api'

export type Point = {
  name: string
  points: number
}

export type Answer = {
  id: string
  text: string
  isRight: boolean
  points: Point[]
}

export type Question = {
  id: string
  name: string
  type: number
  tags: string[]
  answers: Answer[]
}

export type Topic = {
  id: string
  name: string
  questions: Question[]
}

type TemplateStore = {
  name: string
  description: string
  topics: Topic[]
  status: string

  setName: (name: string) => void
  setDescription: (description: string) => void
  setStatus: (status: string) => void

  addTopic: () => void
  setTopics: (topics: Topic[]) => void,
  deleteTopic: (topicId: string) => void
  setTopicName: (topicId: string, name: string) => void

  addQuestion: (topicId: string) => void
  deleteQuestion: (topicId: string, questionId: string) => void
  updateQuestion: (topicId: string, questionsId: string, data: Partial<Question>) => void

  deleteAnswer: (topicId: string, questionId: string, answerId: string) => void
  reset: () => void

  createTemplate: () => Promise<{ success: boolean; errors: string[] }>
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  name: '',
  description: '',
  status: '',
  topics: [],
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setStatus: (status: string) => set({ status }),
  setTopics: (topics: Topic[]) => set({ topics }),
  addTopic: () => {
    set((state) => ({
      topics: [
        ...state.topics,
        {
          id: crypto.randomUUID(),
          name: '',
          questions: [],
        },
      ],
    }))
  },
  deleteTopic: (topicId: string) =>
    set((state) => ({
      topics: state.topics.filter((topic) => topic.id !== topicId),
    })),
  setTopicName: (topicId: string, name: string) =>
    set((state) => ({
      topics: state.topics.map((topic) => (topic.id === topicId ? { ...topic, name } : topic)),
    })),
  addQuestion: (topicId: string) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              questions: [
                ...topic.questions,
                {
                  id: crypto.randomUUID(),
                  name: '',
                  type: 0,
                  answers: [],
                  tags: [],
                },
              ],
            }
          : topic,
      ),
    })),
  deleteQuestion: (topicId: string, questionId: string) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              questions: topic.questions.filter((question) => question.id === questionId),
            }
          : topic,
      ),
    })),
  updateQuestion: (topicId: string, questionId: string, data: Partial<Question>) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              questions: topic.questions.map((question) =>
                question.id === questionId ? { ...question, ...data } : question,
              ),
            }
          : topic,
      ),
    })),
  deleteAnswer: (topicId: string, questionId: string, answerId: string) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              questions: topic.questions.map((question) =>
                question.id === questionId
                  ? {
                      ...question,
                      answers: question.answers.filter((answer) => answer.id !== answerId),
                    }
                  : question,
              ),
            }
          : topic,
      ),
    })),
  reset: () => set({ name: '', description: '', topics: [], status: '' }),
  createTemplate: async () => {
    const { name, description, status, topics } = get()
    const data: CreatedTemplate = {
      name: name,
      description: description,
      status: status,
      topics: topics.map((topic) => ({
        name: topic.name,
        questions: topic.questions.map((question) => ({
          text: question.name,
          answerType: question.type,
          tags: question.tags,
          answers: question.answers.map((answer) => ({
            text: answer.text,
            isRight: answer.isRight,
            points: answer.points.map((point) => ({
              name: point.name,
              points: point.points,
            })),
          })),
        })),
      })),
    }
    return await setTemplate(data)
  },
}))
