import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import Questions from '@/entities/test-create-form/ui/questions'
import { useTestTemplateStore } from '@/entities/test-create-form/model/store'

export default function TemplateCreateForm() {
  const store = useTestTemplateStore()

  const handleAddTest = () => {
    store.addTest()
  }

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
      {store.tests.length > 0 &&
        store.tests.map((test) => (
          <div key={test.id} className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
            <h2 className="font-semibold">Тема</h2>
            <Input
              placeholder="Введите название темы"
              value={test.topic}
              onChange={(event) => store.setTopic(test.id, event.target.value)}
            />
            <Questions testId={test.id} />
          </div>
        ))}
      <div>
        <Button text="Добавить тему" onClick={handleAddTest} />
      </div>
    </div>
  )
}
