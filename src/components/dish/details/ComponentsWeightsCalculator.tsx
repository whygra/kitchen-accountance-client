import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDishComponentDTO, GetDishWithComponentsDTO } from "../../../api/dishWithComponents";


interface DishComponentWithRequiredWeight{
    dish_component: GetDishComponentDTO
    weight: number
}

interface ComponentsWeightsCalculatorProps{
    dish: GetDishWithComponentsDTO
}

function ComponentsWeightsCalculator({dish}:ComponentsWeightsCalculatorProps) {
    
    const [componentsCalcData, setComponentsCalcData] = useState<DishComponentWithRequiredWeight[]>()

    useEffect(()=>{
        setComponentsCalcData(dish.dishes_components
            .map(d=>{return{dish_component: d, weight: NaN}}))
    }, [])

    function calcComponentsWeights(requiredAmount: number){
        setComponentsCalcData(componentsCalcData?.map(
            (p) => {
                return {
                    ...p,
                    weight: requiredAmount * p.dish_component.component_raw_weight
                }
            }
        ))
    }
    
    return(
        <>
        <h4 className='text-center'>Калькулятор веса</h4>
            <Form.Label>Итоговый вес</Form.Label>
            <Form.Control
                type='number'
                min={1}
                step={1}
                defaultValue={1}
                onChange={(e)=>calcComponentsWeights(parseFloat(e.target.value))}
                />
                <Table cellPadding={3} cellSpacing={3}>
                    <thead>
                    <tr>
                        <th>Ингредиент</th>
                        <th className='text-end'>Требуемый вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {componentsCalcData?.map(c=>
                        <tr>
                            <td>{`${c.dish_component.component.id}. ${c.dish_component.component.name} ${c.dish_component.component.type.name}`}</td>
                            <td className='text-end'><u>{isNaN(c.weight)?"-/-":`${c.weight} г.`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default ComponentsWeightsCalculator;
