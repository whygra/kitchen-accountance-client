import { Accordion, Col, Form, Row, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { DishIngredientWithPurchaseOptionsDTO } from "../../../api/ingredients";
import ProductCostCalculator from "./ProductCostCalculator";
import IngredientDetailsModel from "../../../models/IngredientDetailsModel";
import { IngredientProductDTO, IngredientProductWithPurchaseOptionsDTO } from "../../../api/products";
import { ProductPurchaseOption, PurchaseOptionDTO } from "../../../api/purchaseOptions";
import { calcIngredientCost, IngredientCostCalculatorModel, ProductCostCalculatorModel } from "../../../models/DishCostCalculatorModel";
import DishCostCalculator from "./DishCostCalculator";
import { dishCostCalculatorContext } from "../../../context/DishCostCalculatorContext";


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
                    {products.map(p=>
                        <ProductCostCalculator product={p} ingredientId={ingredient.id} />
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}
export default IngredientCostCalculator;
