import { calcIngredientSourceWeight, IngredientDTO } from "../../api/nomenclature/ingredients";
import { ProductDTO } from "../../api/nomenclature/products";

export function getProductsWeights(
    ingredient: IngredientDTO, ingredientAmount: number
) : {product: ProductDTO, weight: number}[] {
    
    const productsGrossWeight = calcIngredientSourceWeight({...ingredient, ingredient_amount:ingredientAmount})
    return ingredient.products?.map(
        (p) => {
            // вес продукта до обработки
            return {
                product: p,
                weight:
                    p.gross_weight!/ingredient.total_gross_weight! * productsGrossWeight
            }
        }
    ) ?? []
    
}