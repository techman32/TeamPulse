const errorMap: Record<string, string> = {
  'template/name': 'Нет названия шаблона',
  'template/topics': 'Шаблон не имеет тем',
  'template/topics.name': 'Нет названия темы',
  'template/topics.questions': 'Нет вопросов',
  'template/topics.questions.text': 'Нет текста вопросов',
  'template/topics.questions.answerType': 'Не задан тип ответа',
  'template/topics.questions.answers': 'Нет ответов',
  'template/topics.questions.answers.text': 'Нет текста в ответе',
  'template/topics.questions.answers.isRight': 'Не задан правильный ответ',
  'template/topics.questions.answers.points.points': 'Не заданы баллы тегов',
}

export function getErrorMessage(errorCode: string): string {
  return errorMap[errorCode] || 'Произошла неизвестная ошибка'
}
