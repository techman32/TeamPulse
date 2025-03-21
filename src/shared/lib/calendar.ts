export const getDaysInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  let firstDay = new Date(year, month, 1).getDay() - 1
  if (firstDay < 0) firstDay = 6

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return days
}

export const months: string[] = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]
