'use client'
import ButtonImport from '@/shared/ui/button-import'

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
      const response = await fetch('http://193.164.150.93:5000/parse-users', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Ошибка загрузки файла')
      }

      await response.json()
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  return <ButtonImport text="Импортировать" onChange={handleImport} />
}
