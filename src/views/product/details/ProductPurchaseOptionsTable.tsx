import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/ingredients";
import { ProductDTO } from "../../../api/products";
import { useState } from "react";
import { Link } from "react-router-dom";
import { calcGramCost } from "../../../models/dish/DishCostCalculatorState";
import usePagination from "../../../hooks/usePagination";

interface ProductPurchaseOptionsTableProps {
    product: ProductDTO
}

function ProductPurchaseOptionsTable({product}:ProductPurchaseOptionsTableProps) {
        
    const {sliceLimits, nav} = usePagination(product.ingredients?.length??0)

    return(
        
        <><h4 className="text-center">Позиции закупки</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Поставщик</th>
                    <th>Код</th>
                    <th>Наименование</th>
                    <th>Цена</th>
                    <th>Масса нетто</th>
                    <th>Ед. изм.</th>
                    <th>Стоимость 1г.</th>
                </tr>
            </thead>
            <tbody>

                {product.purchase_options
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => <tr className='text-center'>
                    <td>{p.distributor?.name}</td>
                    <td>{p.code}</td>
                    <td><Link to={`/purchase-options/details/${p.id}`}>{p.name}</Link></td>
                    <td>{p.price}₽</td>
                    <td>{p.net_weight}г.</td>
                    <td>{p.unit?.short}</td>
                    <td>{(p.price && p.net_weight) ? (p.price / p.net_weight).toFixed(2) : '?'} ₽/г.</td>
                </tr>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default ProductPurchaseOptionsTable;