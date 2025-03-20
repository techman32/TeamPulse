import Button from '@/shared/ui/button'
import Link from 'next/link'

interface ButtonLinkProps {
  href: string
  text: string
}

export default function ButtonLink({ href, text }: ButtonLinkProps) {
  return (
    <Link href={href}>
      <Button text={text} buttonType="primary" />
    </Link>
  )
}
