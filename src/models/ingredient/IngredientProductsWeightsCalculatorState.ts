import { IngredientDTO } from "../../api/ingredients";
import { ProductDTO } from "../../api/products";

export interface IngredientProductsWeightsCalculatorState {
    ingredient: IngredientDTO
    avgWastePercentage: number
}


export function constructIngredientProductsWeightsCalculator(
    ingredient : IngredientDTO
): IngredientProductsWeightsCalculatorState{
    return {
        ingredient: ingredient, 
        avgWastePercentage: calcAvgWastePercentage(ingredient)
    }
}

export function calcAvgWastePercentage(ingredient: IngredientDTO){
    const avg = (ingredient.products?.reduce(
        (result, current)=>
            result+((current.waste_percentage&&current.raw_content_percentage)?current.waste_percentage*current.raw_content_percentage:0), 0
    )??NaN)/100
    return avg
}

// исходный вес продуктов
export function getSourceWeight(calcState: IngredientProductsWeightsCalculatorState, ingredientAmount: number) : number {
    return (ingredientAmount * (calcState.ingredient.item_weight ?? 1)) / (100 - calcState.avgWastePercentage) * 100
}

export function getProductsWeights(
    calcState: IngredientProductsWeightsCalculatorState, ingredientAmount: number
) : {product: ProductDTO, weight: number}[] {
    
    const sourceWeight = getSourceWeight(calcState, ingredientAmount)
    return calcState.ingredient.products?.map(
        (p) => {
            // вес продукта до обработки
            return {
                product: p,
                weight: Math.round(
                    sourceWeight * p.raw_content_percentage! 
                ) / 100
            }
        }
    ) ?? []
    
}