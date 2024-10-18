import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/ingredients";
import { ProductDTO } from "../../../api/products";
import { useState } from "react";
import PaginationNav from "../../shared/PaginationNav";
import { Link } from "react-router-dom";

interface ProductPurchaseOptionsTableProps {
    product: ProductDTO
}

function ProductPurchaseOptionsTable({product}:ProductPurchaseOptionsTableProps) {
        
    // границы среза коллекции, отображаемого на странице
    const [sliceLimits, setSliceLimits] = useState({start:0, end:1})

    // функция назначает границы среза коллекции, вызывается компонентом пагинации
    function makeSlice(pageLength:number, pageNumber:number){
        setSliceLimits({start:pageLength*(pageNumber-1), end:pageLength*pageNumber})
    }
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
                </tr>
                )}
            </tbody>
        </Table>
        <PaginationNav
            makeSlice={makeSlice}
            initPageLength={5}
            totalLength={product.purchase_options?.length??0}
        />
        </>
    )
}

export default ProductPurchaseOptionsTable;