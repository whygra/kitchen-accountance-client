import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/ingredients";
import { ProductDTO } from "../../../api/products";
import { useState } from "react";
import PaginationNav from "../../shared/PaginationNav";
import { Link } from "react-router-dom";
import { PurchaseOptionDTO } from "../../../api/purchaseOptions";

interface PurchaseOptionProductsTableProps {
    purchaseOption: PurchaseOptionDTO
}

function PurchaseOptionProductsTable({purchaseOption}:PurchaseOptionProductsTableProps) {
        
    // границы среза коллекции, отображаемого на странице
    const [sliceLimits, setSliceLimits] = useState({start:0, end:1})

    // функция назначает границы среза коллекции, вызывается компонентом пагинации
    function makeSlice(pageLength:number, pageNumber:number){
        setSliceLimits({start:pageLength*(pageNumber-1), end:pageLength*pageNumber})
    }
    return(
        
        <><h4 className="text-center">Продукты</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Id</th>
                    <th>Наименование</th>
                    <th>Доля разборки</th>
                    <th>Категория</th>
                </tr>
            </thead>
            <tbody>

                {purchaseOption.products
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => <tr className='text-center'>
                    <td>{p.id}</td>
                    <td><Link to={`/products/details/${p.id}`}>{p.name}</Link></td>
                    <td>{p.product_share}</td>
                    <td>{p.category?.name}</td>
                </tr>
                )}
            </tbody>
        </Table>
        <PaginationNav
            makeSlice={makeSlice}
            initPageLength={5}
            totalLength={purchaseOption.products?.length??0}
        />
        </>
    )
}

export default PurchaseOptionProductsTable;