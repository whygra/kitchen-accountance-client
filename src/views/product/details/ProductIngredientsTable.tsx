import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import { ProductDTO } from "../../../api/products";

interface IngredientProductsTableProps {
    product: ProductDTO
}

function ProductIngredientsTable({product}:IngredientProductsTableProps) {
        
    const {sliceLimits, nav} = usePagination(product.ingredients?.length??0)

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
                    .map(i => 
                    <tr className='text-center'>
                        <td><Link to={`/ingredients/details/${i.id}`}>{i.id}.{i.name} {i.type?.name}</Link></td>
                        <td>{(i.raw_product_weight&&i.source_weight)
                            ?i.raw_product_weight/i.source_weight*100
                            :'NaN'
                        }%</td>
                        <td>{i.waste_percentage}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default ProductIngredientsTable;