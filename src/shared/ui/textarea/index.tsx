import { TextareaHTMLAttributes } from 'react'

export default function Textarea({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="border border-gray-200 rounded-md w-full p-2 text-base outline-none transition-colors hover:border-gray-400 focus-visible:border-black"
      {...props}
    />
  )
}
