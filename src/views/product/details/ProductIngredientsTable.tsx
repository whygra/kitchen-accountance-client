import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import { ProductDTO } from "../../../api/products";

interface IngredientProductsTableProps {
    product: ProductDTO
}

function ProductIngredientsTable({product}:IngredientProductsTableProps) {
        
    const {sliceLimits, paginationNav} = usePagination(product.ingredients?.length??0)

    return(
        <><h4 className="text-center">Используется в ингредиентах</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Ингредиент</th>
                    <th>Доля содержания продукта</th>
                    <th>Процент отхода продукта</th>
                </tr>
            </thead>
            <tbody>

                {product.ingredients
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                    <tr className='text-center'>
                        <td><Link to={`/ingredients/details/${p.id}`}>{p.id}.{p.name} {p.type.name}</Link></td>
                        <td>{p.raw_content_percentage}%</td>
                        <td>{p.waste_percentage}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {paginationNav}
        </>
    )
}

export default ProductIngredientsTable;