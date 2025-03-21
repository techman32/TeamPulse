import Link from 'next/link'

interface TableProps {
  columns: string[]
  data: Record<string, string>[]
}

export default function Table({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto xl:overflow-hidden">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-300 p-2 text-center">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-gray-50 text-center">
              {columns.map((column, columnIndex) => {
                const text = row[column] || '-'
                const isLong = text.length > 40
                const displayText = isLong ? text.slice(0, 40) + '...' : text

                if (column === 'Имя пользователя') {
                  return (
                    <td key={columnIndex} className="border border-gray-300 p-1 text-sm">
                      <Link href={`/dashboard/users/${row['id']}`} className="hover:underline underline-offset-4">
                        {displayText}
                      </Link>
                    </td>
                  )
                }

                return (
                  <td
                    key={columnIndex}
                    className="border border-gray-300 p-1 text-sm"
                    title={isLong ? text : undefined}
                  >
                    {displayText}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
