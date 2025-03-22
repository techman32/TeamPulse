'use client'
import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  option: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Checkbox({ option, checked, onChange, ...props }: CheckboxProps) {
  return (
    <label className="flex gap-1 items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <div className="w-4 h-4 border rounded-xs border-gray-400 flex justify-center items-center">
        {checked && <div className="w-2.5 h-2.5 rounded-xs bg-black"></div>}
      </div>
      {option}
    </label>
  )
}
