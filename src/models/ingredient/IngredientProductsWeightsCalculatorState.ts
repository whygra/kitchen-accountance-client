import { calcIngredientSourceWeight, IngredientDTO } from "../../api/ingredients";
import { ProductDTO } from "../../api/products";

export function getProductsWeights(
    ingredient: IngredientDTO, ingredientAmount: number
) : {product: ProductDTO, weight: number}[] {
    
    const sourceWeight = calcIngredientSourceWeight({...ingredient, ingredient_amount:ingredientAmount})
    return ingredient.products?.map(
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