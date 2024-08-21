import { DishIngredientDTO, DishIngredientWithPurchaseOptionsDTO, IngredientWithProductsDTO } from "../api/ingredients";
import { IngredientProductDTO, IngredientProductWithPurchaseOptionsDTO, ProductDTO, ProductWithPurchaseOptionsDTO } from "../api/products";

export default class IngredientDetailsModel {
    private ingredient: IngredientWithProductsDTO | DishIngredientWithPurchaseOptionsDTO
    private avgWastePercentage: number

    constructor(ingredient : IngredientWithProductsDTO | DishIngredientWithPurchaseOptionsDTO){
        this.ingredient = ingredient
        this.avgWastePercentage = ingredient.products.reduce(
            (result, current)=>
                result+current.waste_percentage*current.raw_content_percentage, 0
        )/100;
    }

    public getSourceWeight(ingredientAmount: number) : number {
        return ingredientAmount * this.ingredient.item_weight / (100 - this.avgWastePercentage) * 100
    }

    public getProductsWeights = (ingredientAmount: number) : {product: IngredientProductDTO, weight: number }[] => {
        const sourceWeight = this.getSourceWeight(ingredientAmount)
        return this.ingredient.products.map(
            (p) => {
                // вес всех продуктов до обработки
                return {
                    product: p,
                    weight: Math.round(
                        sourceWeight * p.raw_content_percentage 
                    ) / 100
                }
            }
        )
    }
}