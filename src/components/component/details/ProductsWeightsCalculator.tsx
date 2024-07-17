import { Form, Table } from "react-bootstrap";
import { GetComponentProductDTO, GetComponentWithProductsDTO } from "../../../api/componentWithProducts";
import { useEffect, useState } from "react";


interface ComponentProductWithRequiredWeight{
    component_product: GetComponentProductDTO
    weight: number
}

interface ProductsWeightsCalculatorProps{
    component: GetComponentWithProductsDTO
}

function ProductsWeightsCalculator({component}:ProductsWeightsCalculatorProps) {
    
    const [productsCalcData, setProductsCalcData] = useState<ComponentProductWithRequiredWeight[]>()

    useEffect(()=>{
        setProductsCalcData(component.components_products
            .map(c=>{return{component_product: c, weight: NaN}}))
    }, [])

    function calcProductWeights(requiredWeight: number){
        setProductsCalcData(productsCalcData?.map(
            (p) => {
                return {
                    ...p,
                    weight: Math.round(requiredWeight * ( 
                        // доля содержания
                        p.component_product.raw_content_percentage / 100
                        // умножить на 1 + доля отхода
                        * (1 + (p.component_product.waste_percentage / 100))
                    ))
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
                min={50}
                step={1}
                defaultValue={100}
                onChange={(e)=>calcProductWeights(parseFloat(e.target.value))}
                />
                <Table cellPadding={3} cellSpacing={3}>
                    <thead>
                    <tr>
                        <th>Продукт</th>
                        <th className='text-end'>Требуемый вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsCalcData?.map(c=>
                        <tr>
                            <td>{`${c.component_product.product.id}. ${c.component_product.product.name}`}</td>
                            <td className='text-end'><u>{isNaN(c.weight)?"-/-":`${c.weight} г.`}</u></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
        </>
    )
}
export default ProductsWeightsCalculator;
