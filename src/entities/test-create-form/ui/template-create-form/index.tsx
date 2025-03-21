import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import Questions from '@/entities/test-create-form/ui/questions'
import { useTestTemplateStore } from '@/entities/test-create-form/model/store'

export default function TemplateCreateForm() {
  const store = useTestTemplateStore()

  const handleAddTest = () => {
    store.addTest()
  }

  const handleDeleteTest = (testId: string) => {
    store.deleteTest(testId)
  }

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
      {store.tests.length > 0 &&
        store.tests.map((test, index) => (
          <div key={test.id} className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
            <h2 className="font-semibold">Тема</h2>
            <Input
              placeholder="Введите название темы"
              onChange={(event) => store.setTopic(test.id, event.target.value)}
            />
            <Questions testId={test.id} />
            <div className="flex justify-end">
              <Button text="Удалить тему" buttonType="danger" onClick={() => handleDeleteTest(test.id)} />
            </div>
          </div>
        ))}
      <div>
        <Button text="Добавить тему" onClick={handleAddTest} />
      </div>
    </div>
  )
}
