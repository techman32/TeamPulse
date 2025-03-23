import TestSolution from '@/entities/test-solution/ui'

export default async function TestSolutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = decodeURIComponent(id).split('+')

  return <TestSolution testId={data[0]} userId={data[1]} />
}
