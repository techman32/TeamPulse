'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import Answers from '@/entities/test-create-form/ui/answers'
import ButtonDropdown from '@/shared/ui/button-dropdown'
import DropdownAnswerTypes from '@/entities/dropdown-answer-type/ui'
import { useEffect, useState } from 'react'
import { getTags } from '@/shared/api'
import { Tag } from '@/shared/lib/types'
import { useTestTemplateStore } from '@/entities/test-create-form/model/store'

interface QuestionsProps {
  testId: string
}

export default function Questions({ testId }: QuestionsProps) {
  const [tags, setTagsList] = useState<Tag[]>([])
  const store = useTestTemplateStore()
  const test = store.tests.find((test) => test.id === testId)

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    const { tags } = await getTags(10, 0)
    if (tags) setTagsList(tags)
  }

  const handleDeleteTest = (testId: string) => {
    store.deleteTest(testId)
  }

  return (
    <div className="flex flex-col gap-2">
      {test && test.questions.length > 0 && (
        <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-4">
          <h2 className="font-semibold">Вопросы</h2>
          {test.questions.map((question, index) => (
            <div key={question.id} className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
              <h2 className="font-semibold">Вопрос {++index}</h2>
              {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {question.tags.map((tag, index) => (
                    <p key={index} className="text-xs px-2 py-0.5 bg-gray-300 rounded-full">
                      {tag}
                    </p>
                  ))}
                </div>
              )}
              <Input
                placeholder="Введите вопрос"
                onChange={(event) =>
                  store.updateQuestion(test.id, question.id, {
                    name: event.target.value,
                  })
                }
              />
              <DropdownAnswerTypes
                selected={question.type}
                onSelect={(index) =>
                  store.updateQuestion(testId, question.id, {
                    type: index,
                  })
                }
              />
              <div className="flex justify-between">
                <ButtonDropdown
                  buttonText="Добавить теги"
                  options={tags}
                  selected={question.tags.map((tag) => ({ name: tag }))}
                  getLabel={(option) => option.name}
                  getValue={(option) => option.name}
                  onChange={(selected) => {
                    store.updateQuestion(testId, question.id, {
                      tags: selected.map((s) => s.name),
                    })
                  }}
                />
                <Button
                  text="Удалить вопрос"
                  buttonType="danger"
                  onClick={() => store.deleteQuestion(testId, question.id)}
                />
              </div>
              {(question.type === 1 || question.type === 2) && <Answers testId={test.id} questionId={question.id} />}
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <Button text="Добавить вопрос" color="secondary" onClick={() => store.addQuestion(testId)} />
        <Button text="Удалить тему" buttonType="danger" onClick={() => handleDeleteTest(testId)} />
      </div>
    </div>
  )
}
