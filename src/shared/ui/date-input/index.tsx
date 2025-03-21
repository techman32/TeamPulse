import { InputHTMLAttributes } from 'react'
import { CalendarDays } from 'lucide-react'
import cn from 'classnames'

export default function DateInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  const chevronStyles =
    'absolute pointer-events-none right-2 top-1/2 transform -translate-y-1/2 text-gray-400'
  return (
    <div className={'relative'}>
      <CalendarDays className={chevronStyles} size={16} />
      <input
        className={cn(
          'border border-gray-200 rounded-md w-full p-2 text-base outline-none transition-colors hover:border-gray-400 focus-visible:border-black',
          { 'cursor-pointer': !props.disabled },
        )}
        readOnly
        {...props}
      />
    </div>
  )
}
