const tableData = [
    { id: 1, name: 'الخرشف', stockValue: 100, stockQuantity: 50 },
    { id: 2, name: 'البطاطا', stockValue: 150, stockQuantity: 30 },
    { id: 3, name: 'الدلاع', stockValue: 80, stockQuantity: 70 },
    { id: 4, name: 'السنارية', stockValue: 30, stockQuantity: 50 },
    { id: 5, name: 'اللفت', stockValue: 150, stockQuantity: 30 },
    { id: 6, name: 'الكرم', stockValue: 80, stockQuantity: 70 },
    { id: 7, name: 'السلاطة', stockValue: 100, stockQuantity: 50 },
    { id: 8, name: 'البسباس', stockValue: 150, stockQuantity: 30 },
    { id: 9, name: 'التشينة', stockValue: 80, stockQuantity: 70 },
    
  ];
const LeafletTable = () => {
    return (
        <div className=" max-h-48 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-200">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Stock Value</th>
              <th className="py-2 px-4 border-b">Stock Quantity</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-4 border-b">{row.id}</td>
                <td className="py-2 px-4 border-b">{row.name}</td>
                <td className="py-2 px-4 border-b">{row.stockValue}</td>
                <td className="py-2 px-4 border-b">{row.stockQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

  )
}
export default LeafletTable;