'use client'
import Textarea from '@/shared/ui/textarea'
import Button from '@/shared/ui/button'
import DropdownAnswerTypes from '@/entities/dropdown-answer-type/ui'
import Answers from '@/entities/test-create-form/ui/answers'
import ButtonDropdown from '@/shared/ui/button-dropdown'
import { useEffect, useState } from 'react'
import { Tag } from '@/shared/lib/types'
import { getTags } from '@/shared/api'
import { ArrowDownLeft, ArrowDownRight } from 'lucide-react'
import { Topic, useTemplateStore } from '@/entities/test-create-form/model/store'

export default function Questions({ topic }: { topic: Topic }) {
  const { addQuestion, deleteQuestion, updateQuestion } = useTemplateStore()
  const [tags, setTags] = useState<Tag[]>([])
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null)

  useEffect(() => {
    const fetchTags = async () => {
      const { tags } = await getTags(1000, 0)
      if (tags) setTags(tags)
    }

    fetchTags()
  }, [])

  const toggleQuestion = (id: string) => {
    setActiveQuestion((prev) => (prev === id ? null : id))
  }

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
      {topic.questions.length > 0 &&
        topic.questions.map((question) => (
          <div key={question.id} className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
            <button
              type="button"
              className="w-full text-left font-semibold flex justify-between items-center cursor-pointer"
              onClick={() => toggleQuestion(question.id)}
            >
              {question.name || `Вопрос без названия`}
              <span className="opacity-50">
                {activeQuestion === question.id ? <ArrowDownLeft size={20} /> : <ArrowDownRight size={20} />}
              </span>
            </button>

            {activeQuestion === question.id && (
              <div className="flex flex-col gap-2">
                {question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {question.tags.map((tag, index) => (
                      <p key={index} className="text-xs px-2 py-0.5 bg-gray-300 rounded-full">
                        {tag}
                      </p>
                    ))}
                  </div>
                )}
                <Textarea
                  placeholder="Введите вопрос"
                  value={question.name}
                  onChange={(e) => updateQuestion(topic.id, question.id, { name: e.target.value })}
                />
                <DropdownAnswerTypes
                  selected={question.type}
                  onSelect={(index) => updateQuestion(topic.id, question.id, { type: index })}
                />
                {(question.type === 1 || question.type === 2) && <Answers topicId={topic.id} question={question} />}
                {tags.length > 0 && (
                  <ButtonDropdown
                    buttonText="Добавить теги"
                    options={tags}
                    selected={question.tags.map((tag) => ({ name: tag }))}
                    getLabel={(option) => option.name}
                    getValue={(option) => option.name}
                    onChange={(selected) =>
                      updateQuestion(topic.id, question.id, { tags: selected.map((s) => s.name) })
                    }
                  />
                )}
              </div>
            )}
          </div>
        ))}
      <div className="flex flex-wrap gap-2">
        <Button text="Добавить вопрос" onClick={() => addQuestion(topic.id)} type="button" />
        {activeQuestion && (
          <Button
            text="Удалить выбранный вопрос"
            buttonType="danger"
            onClick={() => {
              deleteQuestion(topic.id, activeQuestion)
              setActiveQuestion(null)
            }}
            type="button"
          />
        )}
      </div>
    </div>
  )
}
