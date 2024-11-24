import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../api/products";
import { IngredientDTO } from "../../../api/ingredients";
import ProductDetails from "./ProductDetails";
import { constructIngredientProductsWeightsCalculator, getProductsWeights } from "../../../models/ingredient/IngredientProductsWeightsCalculatorState";



interface ProductGramCostProps{
    product: ProductDTO
}

function ProductGramCost({product}:ProductGramCostProps) {
    const purchaseOptions = product.purchase_options!
    
    const avgGramCost = purchaseOptions.length==0?0:purchaseOptions.reduce((total, current)=>{
        return total+(current.price&&current.net_weight?current.price/current.net_weight:0)
    }, 0)/purchaseOptions.length
    
    const maxGramCost = purchaseOptions.reduce((max, current)=>{
        const currentGramCost = current.price&&current.net_weight ?current.price/current.net_weight:0
        return max >= currentGramCost ? max : currentGramCost}, 0)
        
    const minGramCost = purchaseOptions.reduce((min, current)=>{
        const currentGramCost = current.price&&current.net_weight?current.price/current.net_weight:0
        return min <= currentGramCost ? min : currentGramCost
    }, maxGramCost)
        
    return(
        <>
            <Table className="text-center">
                <thead>
                    <tr><th colSpan={3}>Стоимость 1 грамма</th></tr>
                </thead>
                <tbody>
                    <tr><td>Средняя: {avgGramCost.toFixed(2)}</td><td>Максимальная: {maxGramCost.toFixed(2)}</td><td>Минимальная: {minGramCost.toFixed(2)}</td></tr>
                </tbody>
            </Table>
        </>
    )
}
export default ProductGramCost;
