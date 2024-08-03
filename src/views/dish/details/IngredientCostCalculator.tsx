import { Accordion, Col, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetDishIngredientDTO, GetDishIngredientWithPurchaseOptionsDTO, GetDishWithIngredientsDTO, GetDishWithPurchaseOptionsDTO } from "../../../api/dishes";
import { GetIngredientProductWithPurchaseOptionsDTO, GetIngredientWithPurchaseOptionsDTO } from "../../../api/ingredients";
import ProductCostCalculator from "./ProductCostCalculator";


interface IngredientCostCalculatorProps{
    dish_ingredient: GetDishIngredientWithPurchaseOptionsDTO
    setIngredientCost: (id: number, cost: number) => void
}

function IngredientCostCalculator({dish_ingredient, setIngredientCost}:IngredientCostCalculatorProps) {

    const [productCostCoefficients, setProductCostCoefficients] = useState<{id: number; costCoefficient: number}[]>(
        dish_ingredient.ingredient.ingredients_products
            .map(p=>{return{id:p.id, costCoefficient:0}}))
            
    const [cost, setCost] = useState(NaN)

    function setProductCostCoefficient(id: number, costCoefficient: number) {
        const coefficients = productCostCoefficients.map(p=>p.id==id?{id, costCoefficient}:p)
        setProductCostCoefficients(coefficients)
        const cost = calcIngredientCost(coefficients)
        setCost(cost)
        setIngredientCost(dish_ingredient.id, cost)
    }

    function calcIngredientCost(productCostCoefficients:{id:number; costCoefficient:number}[]) :number {
        return productCostCoefficients.reduce((total, current)=>total+current.costCoefficient, 0) 
            * dish_ingredient.ingredient_raw_weight * (1 + dish_ingredient.waste_percentage/100)
    }

    return(
        <>
            <Accordion.Item eventKey={`${dish_ingredient.ingredient.id}`}>
                <Accordion.Header>
                    {dish_ingredient.ingredient.name} - {cost} руб.
                </Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <Col md={10}>
                            {dish_ingredient.ingredient.ingredients_products.map(p=>
                                <ProductCostCalculator ingredient_product={p} setProductCostCoefficient={setProductCostCoefficient} />
                            )}
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}
export default IngredientCostCalculator;
