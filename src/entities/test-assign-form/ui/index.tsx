'use client'
import Input from '@/shared/ui/input'
import Textarea from '@/shared/ui/textarea'
import Button from '@/shared/ui/button'
import { useAssignmentTestStore } from '@/entities/test-assign-form/model/store'
import DropdownGroups from '@/entities/dropdown-groups/ui'
import DropdownUsers from '@/entities/dropdown-users/ui'
import Checkbox from '@/shared/ui/checkbox'
import DropdownTemplates from '@/entities/dropdown-templates/ui'
import DropdownFrequency from '@/entities/dropdown-frequency/ui'
import DatePicker from '@/shared/ui/date-picker'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function TestAssignForm() {
  const [isMinPercent, setIsMinPercent] = useState<boolean>(false)
  const [errors, setErrors] = useState<boolean>(false)
  const store = useAssignmentTestStore()
  const router = useRouter()

  const handleSubmit = async () => {
    const response = await store.submit()
    if (!response.success) {
      setErrors(true)
    } else {
      store.reset()
      router.push('/dashboard/tests')
    }
  }

  const getValidMinPercentage = (value: number) => {
    if (value < 0) return 0
    if (value > 100) return 100
    return value
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Название</h2>
        <Input placeholder="Введите название" onChange={(event) => store.setName(event.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Описание</h2>
        <Textarea placeholder="Введите описание" onChange={(event) => store.setDescription(event.target.value)} />
      </div>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <h2 className="font-semibold text-xl">Тест</h2>
        <DropdownTemplates
          selected={[store.testId]}
          onSelectAction={(selectedIds) => {
            store.setTestId(selectedIds[0])
          }}
        />
        <div className="flex gap-2 items-center">
          <Button text="Посмотреть вопросы" color="secondary" />
          <Button text="Редактировать" color="secondary" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Настройки</h2>
          <Checkbox
            option="Результат после завершения"
            checked={store.lateResult}
            onChange={(checked) => store.setLateResult(checked)}
          />
          <Checkbox
            option="Задать минимальный процент прохождения теста"
            checked={isMinPercent}
            onChange={(checked) => setIsMinPercent(checked)}
          />
          {isMinPercent && (
            <>
              <h2 className="font-semibold">Минимальное значение для прохождения теста</h2>
              <div className="grid grid-cols-[120px_120px] gap-2 items-center">
                <Input
                  placeholder="Минимум"
                  max="100"
                  min="0"
                  type="number"
                  value={store.minPercentage || ''}
                  onChange={(e) => {
                    let value = e.target.value.replace(/^0+/, '')
                    if (value === '') value = '0'
                    const validValue = getValidMinPercentage(parseInt(value, 10) || 0)
                    store.setMinPercentage(validValue)
                  }}
                />
                <p>из 100%</p>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Субъект оценивания</h2>
          <DropdownUsers
            multiple={false}
            selected={[store.subjectId]}
            onSelectAction={(selectedIds) => {
              store.setSubjectId(selectedIds[0])
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Периодичность</h2>
        <DropdownFrequency selected={store.frequency} onSelect={(value) => store.setFrequency(value)} />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-semibold text-xl">Дата начала</h2>
          <DatePicker
            onChange={(selected) => {
              if (selected) {
                store.setStartDate(selected.toISOString())
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-semibold text-xl">Дата окончания</h2>
          <DatePicker
            onChange={(selected) => {
              if (selected) {
                store.setEndDate(selected.toISOString())
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <h2 className="font-semibold text-xl">Назначить</h2>
        <Checkbox
          option="Всем"
          checked={store.toAll}
          onChange={(checked) => {
            store.setToAll(checked)
          }}
        />
        {!store.toAll && (
          <>
            <h2 className="font-semibold">Группам</h2>
            <DropdownGroups
              selected={store.groups.map((g) => g)}
              onSelectAction={(selectedIds) => {
                store.setGroups(selectedIds.map((s) => s))
              }}
            />
            <h2 className="font-semibold">Сотрудникам</h2>
            <DropdownUsers
              selected={store.employees.map((e) => e)}
              onSelectAction={(selectedIds) => {
                store.setEmployees(selectedIds.map((s) => s))
              }}
            />
          </>
        )}
      </div>
      <div>
        <Button text="Назначить" buttonType="primary" onClick={handleSubmit} />
      </div>
      {errors && <p className="text-red-500 opacity-70 italic">Произошла ошибка, попробуйте отправить еще раз!</p>}
    </>
  )
}
