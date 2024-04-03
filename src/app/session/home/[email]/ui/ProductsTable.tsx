import { IProduct } from "@/interfaces/product"

interface Props {
    products: IProduct[],
}

export const ProductsTable = ({ products }: Props) => {

    return (
        <tbody>
            {
                products!.map(product => (
                    <tr key={product._id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{product._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{product.sku}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    </tr>
                ))
            }
        </tbody>
    )
}
