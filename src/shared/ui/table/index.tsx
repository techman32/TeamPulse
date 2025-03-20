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
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="border border-gray-300 p-1 text-sm">
                  {row[column] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
