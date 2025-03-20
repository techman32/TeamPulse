import Link from 'next/link'

export default function Logo() {
  return (
    <div className="flex justify-start p-4 border-b border-gray-200 shadow-xs fixed top-0 left-0 right-0 bg-white z-10">
      <Link href="/dashboard">
        <p className="text-xl font-semibold">TeamPulse</p>
      </Link>
    </div>
  )
}
