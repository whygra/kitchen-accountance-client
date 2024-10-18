import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/ingredients";
import { useState } from "react";
import PaginationNav from "../../shared/PaginationNav";
import { Link } from "react-router-dom";

interface IngredientDishesTableProps {
    ingredient: IngredientDTO
}

function IngredientDishesTable({ingredient}:IngredientDishesTableProps) {
        
    // границы среза коллекции, отображаемого на странице
    const [sliceLimits, setSliceLimits] = useState({start:0, end:1})

    // функция назначает границы среза коллекции, вызывается компонентом пагинации
    function makeSlice(pageLength:number, pageNumber:number){
        setSliceLimits({start:pageLength*(pageNumber-1), end:pageLength*pageNumber})
    }
    return(
        
        <><h4 className="text-center">Используется в блюдах</h4>
        <Table cellPadding={3} cellSpacing={3}>
            <thead>

                <tr className='text-center'>
                    <th>Id Блюда</th>
                    <th>Наименование</th>
                    <th>{ingredient.is_item_measured?'Количество':'Вес'} ингредиента</th>
                    <th>Потери в весе</th>
                </tr>
            </thead>
            <tbody>

                {ingredient.dishes
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(d => 
                    <tr className='text-center'>
                        <td>{d.id}</td>
                        <td><Link to={`/dishes/details/${d.id}`}>{d.name}</Link></td>
                        <td>{d.ingredient_amount}</td>
                        <td>{d.waste_percentage}%</td>
                    </tr>
                )}
            </tbody>
        </Table>
        <PaginationNav 
            initPageLength={5} 
            makeSlice={makeSlice} 
            totalLength={ingredient.dishes?.length??0}
        />
        </>
    )
}

export default IngredientDishesTable;