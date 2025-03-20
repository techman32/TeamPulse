import cn from 'classnames'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  buttonType?: 'primary' | 'default' | 'danger'
  loading?: boolean
  block?: boolean
}

export default function Button({
  text,
  buttonType = 'default',
  loading,
  block,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('rounded-md px-4 py-2 transition-colors relative cursor-pointer', {
        'bg-black text-white hover:bg-black/85 active:bg-black/80': buttonType === 'primary',
        'bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100':
          buttonType === 'default',
        'opacity-60': loading,
        'w-full': block,
        'min-w-max max-w-12': !block,
      })}
      {...props}
    >
      {text}
    </button>
  )
}
