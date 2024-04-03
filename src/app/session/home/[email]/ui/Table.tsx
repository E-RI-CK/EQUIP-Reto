import { IProduct } from "@/interfaces/product"
import { ProductsTable } from "./ProductsTable"

interface Props {
    products: IProduct[]
}

export const Table = ({ products }: Props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th className="border border-white">ID</th>
                    <th className="border border-white">SKU</th>
                    <th className="border border-white">PRODUCTO</th>
                </tr>
            </thead>
            <ProductsTable products={products} />
        </table>
    )
}
