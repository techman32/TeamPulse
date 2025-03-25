'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import Questions from '@/entities/test-create-form/ui/questions'
import { useState } from 'react'
import { ArrowDownLeft, ArrowDownRight } from 'lucide-react'
import { useTemplateStore } from '@/entities/test-create-form/model/store'

export default function Topics() {
  const { topics, addTopic, deleteTopic, setTopicName } = useTemplateStore()
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  const toggleTopic = (id: string) => {
    setActiveTopic((prev) => (prev === id ? null : id))
  }

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
      {topics.length > 0 &&
        topics.map((topic) => (
          <div key={topic.id} className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
            <button
              type="button"
              className="w-full text-left font-semibold flex justify-between items-center cursor-pointer"
              onClick={() => toggleTopic(topic.id)}
            >
              {topic.name || 'Тема без названия'}
              <span className="opacity-50">
                {activeTopic === topic.id ? <ArrowDownLeft size={20} /> : <ArrowDownRight size={20} />}
              </span>
            </button>

            {activeTopic === topic.id && (
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Введите название темы"
                  value={topic.name}
                  onChange={(e) => setTopicName(topic.id, e.target.value)}
                />
                <Questions topic={topic} />
              </div>
            )}
          </div>
        ))}
      <div className="flex gap-2">
        <Button text="Добавить тему" onClick={addTopic} type="button" />
        {activeTopic && (
          <Button
            text="Удалить выбранную тему"
            buttonType="danger"
            onClick={() => {
              deleteTopic(activeTopic)
              setActiveTopic(null)
            }}
            type="button"
          />
        )}
      </div>
    </div>
  )
}
