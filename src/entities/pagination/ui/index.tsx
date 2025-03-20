import Button from '@/shared/ui/button'

interface PaginationProps {
  totalPages: number
  itemsPerPage: number
  currentPage: number
  onNextPage: () => void
  onPrevPage: () => void
}

export default function Pagination({
  totalPages,
  itemsPerPage,
  currentPage,
  onPrevPage,
  onNextPage,
}: PaginationProps) {
  const maxPages = Math.ceil(totalPages / itemsPerPage)
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-sm">
        Страница {currentPage} из {Math.ceil(totalPages / itemsPerPage)}
      </span>
      <div className="flex gap-4">
        <Button
          text="Назад"
          buttonType="default"
          onClick={onPrevPage}
          disabled={currentPage === 1}
        />
        <Button
          text="Вперед"
          buttonType="primary"
          onClick={onNextPage}
          disabled={currentPage >= maxPages}
        />
      </div>
    </div>
  )
}
