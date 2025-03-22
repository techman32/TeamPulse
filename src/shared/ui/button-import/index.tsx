import { ChangeEvent } from 'react'

export default function ButtonImport({ text, onChange }: { text: string; onChange: (file: File | null) => void }) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onChange(file)
  }

  return (
    <label className="relative inline-block cursor-pointer">
      <input
        type="file"
        accept=".csv"
        className="file:hidden absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <div className="rounded-md px-4 py-2 transition-colors bg-white border border-gray-200 min-w-max">{text}</div>
    </label>
  )
}
