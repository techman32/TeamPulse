const statusMap: Record<string, string> = {
  not_passed: 'Не решено',
  passed: 'Решено',
  expired: 'Просрочен',
  in_progress: 'В процессе',
}

export const getStatusText = (status: string): string => statusMap[status] || 'Неизвестный статус'