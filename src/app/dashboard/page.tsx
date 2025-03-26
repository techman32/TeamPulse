import Link from 'next/link'

export default function DashboardPage() {
  return (
    <>
      <h1 className="font-bold text-4xl">Добро пожаловать!</h1>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">Здесь вы можете:</p>
        <ul className="flex flex-col gap-1">
          <li>1. Создать шаблон теста или импортировать из CSV файла</li>
          <li>2. Создать пользователя или импортировать из CSV файла</li>
          <li>3. Создать теги и группы, по которым можно в будущем разбить вопросы и пользователей соответственно</li>
          <li>
            4. Назначить тесты сотрудника, распределив по вопросы по тегам, типам ответов или любым критериям которые
            могут понадобиться
          </li>
          <li>5. В тесте указывать оценки для каждого вопроса, чтобы в дальнейшем было удобнее анализировать ответы</li>
        </ul>
        <Link
          href="https://docs.google.com/document/d/19CLw2jJrnhJ7QUFIxw1h1wNhupnVeeAuTmL7e5wpEl8/edit?tab=t.0"
          target="_blank"
          className="text-black underline-offset-2 underline hover:no-underline"
        >
          Полное руководство по использованию
        </Link>
      </div>
    </>
  )
}
