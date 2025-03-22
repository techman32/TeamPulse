'use client'
import ButtonImport from '@/shared/ui/button-import'
import { useTestTemplateStore } from '@/entities/test-create-form/model/store'

export default function TemplateImport() {
  const store = useTestTemplateStore()

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
      const response = await fetch('http://193.164.150.93:5000/format-csv-to-txt', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Ошибка загрузки файла')
      }

      const data = await response.json()
      store.setName(data.name)
      store.setDescription(data.description)

      store.setTests(
        // @typescript-eslint/no-explicit-any
        data.tests.map((test: any) => ({
          id: crypto.randomUUID(),
          topic: test.topic,
          // @typescript-eslint/no-explicit-any
          questions: test.questions.map((question: any) => ({
            id: crypto.randomUUID(),
            name: question.name,
            type: question.type,
            tags: question.tags,
            // @typescript-eslint/no-explicit-any
            answers: question.answers.map((answer: any) => ({
              id: crypto.randomUUID(),
              text: answer.text,
              // @typescript-eslint/no-explicit-any
              points: answer.points.map((point: any) => ({
                name: point.name,
                points: point.points,
              })),
            })),
          })),
        })),
      )
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  return <ButtonImport text="Импортировать" onChange={handleImport} />
}
