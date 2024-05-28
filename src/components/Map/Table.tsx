import { Product, ProductWareHouse } from "@/types/Data";

const LeafletTable = ({Products, name}:{Products:Product[], name:string}) => {
    return (
        <div className=" max-h-48 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-200">
          <h1>{name}</h1>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index}</td>
                  <td className="py-2 px-4 border-b">{row.name}</td>
                  <td className="py-2 px-4 border-b">{row.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  )
}
export default LeafletTable;