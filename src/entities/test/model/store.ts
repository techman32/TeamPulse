import { create } from 'zustand'

type SolvedStore = {
  questions: {
    questionId: string
    answer: string[]
  }[]
  setAnswer: (questionId: string, answer: string[]) => void
}

export const useSolvedStore = create<SolvedStore>((set) => ({
  questions: [],
  setAnswer: (questionId: string, answer: string[]) => {
    set((state) => {
      const existingQuestion = state.questions.find((question) => question.questionId === questionId)
      if (existingQuestion) {
        return {
          ...state,
          questions: state.questions.map((q) => (q.questionId === questionId ? { ...q, answer } : q)),
        }
      } else {
        return {
          ...state,
          questions: [...state.questions, { questionId, answer }],
        }
      }
    })
  },
}))
