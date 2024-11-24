import { Accordion, Col, Form, Row, Table } from "react-bootstrap";
import ProductCostCalculator from "./ProductCostCalculator";
import { calcIngredientCost, IngredientCostCalculatorModel, ProductCostCalculatorModel } from "../../../models/dish/DishCostCalculatorState";


interface IngredientCostCalculatorProps{
    ingredient: IngredientCostCalculatorModel
}

function IngredientCostCalculator({ingredient}:IngredientCostCalculatorProps) {

    const products = ingredient.products

    return(
        <>
            <Accordion.Item eventKey={`${ingredient.id}`}>
                <Accordion.Header>
                    {ingredient.name} - {Number(ingredient.cost).toFixed(2)} руб.
                </Accordion.Header>
                <Accordion.Body>
                    {products?.map(p=>
                        <ProductCostCalculator product={p} ingredientId={ingredient.id} />
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}
export default IngredientCostCalculator;
