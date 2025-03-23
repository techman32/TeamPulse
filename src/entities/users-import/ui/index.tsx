'use client'
import ButtonImport from '@/shared/ui/button-import'
import { parseUsers } from '@/shared/api'

export default function UsersImport() {
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
      await parseUsers(formData)
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  return <ButtonImport text="Импортировать" onChange={handleImport} />
}
