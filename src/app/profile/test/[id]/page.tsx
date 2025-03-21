import Test from '@/entities/test/ui'

interface TestProps {
  params: Promise<{ id: string }>
}

export default async function TestPage({ params }: TestProps) {
  const { id } = await params
  const data = decodeURIComponent(id).split('+')

  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <Test testId={data[0]} topicId={data[1]} />
    </div>
  )
}
