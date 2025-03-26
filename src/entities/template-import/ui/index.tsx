'use client'
import ButtonImport from '@/shared/ui/button-import'
import { parseTemplate } from '@/shared/api'
import { Answer, Point, Question, useTemplateStore } from '@/entities/test-create-form/model/store'

interface BackendTopic {
  topic: string
  questions: Question[]
}

export default function TemplateImport() {
  const store = useTemplateStore()

  const handleImport = async (file: File | null) => {
    if (!file) {
      alert('Файл не выбран')
      return
    }

    if (!file.name.endsWith('.csv')) {
      alert('Неверный формат файла. Требуется .csv')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await parseTemplate(formData)

      const { success, data } = response
      console.log(data)

      if (success) {
        store.reset()
        store.setName(data.name)
        store.setDescription(data.description)

        store.setTopics(
          data.tests.map((topic: BackendTopic) => ({
            id: crypto.randomUUID(),
            name: topic.topic,
            questions: topic.questions.map((question: Question) => ({
              id: crypto.randomUUID(),
              name: question.name,
              type: question.type,
              tags: question.tags,
              answers: question.answers.map((answer: Answer) => ({
                id: crypto.randomUUID(),
                text: answer.text,
                isRight: answer.isRight || false,
                points: answer.points.map((point: Point) => ({
                  name: point.name,
                  points: point.points,
                })),
              })),
            })),
          })),
        )
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  return <ButtonImport text="Импортировать" onChange={handleImport} />
}
