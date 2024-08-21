import { DishCategoryDTO } from "../api/dishCategories";
import { DishWithPurchaseOptions } from "../api/dishes";
import { IngredientCategoryDTO } from "../api/ingredientCategories";
import { DishIngredientDTO, DishIngredientWithPurchaseOptionsDTO, IngredientTypeDTO, IngredientWithProductsDTO } from "../api/ingredients";
import { IngredientProductDTO, IngredientProductWithPurchaseOptionsDTO, ProductDTO, ProductWithPurchaseOptionsDTO } from "../api/products";
import { ProductPurchaseOption, PurchaseOptionDTO } from "../api/purchaseOptions";

export interface DishCostCalculatorModel {
    
    id: number
    name: string
    category: DishCategoryDTO
    ingredients: IngredientCostCalculatorModel[]

    cost: number
}

export function constructDishCostCalculator(dish?: DishWithPurchaseOptions) : DishCostCalculatorModel {
    return setCalcDishCost({
        id: dish?.id??0,
        category: dish?.category??{id:0,name:''},
        name: dish?.name??'',
        ingredients: dish?.ingredients.map(i=>constructIngredientCostCalculator(i)) ?? [],
        cost: 0,
    })
}

export function setCalcDishCost(dish: DishCostCalculatorModel):DishCostCalculatorModel{
    const cost = dish.ingredients.reduce((total, current)=>total+current.cost, 0)

    return {...dish, cost}
}

export interface IngredientCostCalculatorModel {
    id: number
    name: string
    item_weight: number
    type: IngredientTypeDTO
    category: IngredientCategoryDTO
    is_item_measured: boolean
    products: ProductCostCalculatorModel[]
    waste_percentage: number
    ingredient_amount: number
    // стоимость
    cost: number
}

export function constructIngredientCostCalculator(ingredient : DishIngredientWithPurchaseOptionsDTO) : IngredientCostCalculatorModel {
    const products = ingredient.products.map(p=>constructProductCostCalculator(p))
    console.log(products)
    return calcIngredientCost({...ingredient, cost:0, products: products, })
}

export function calcIngredientCost(ingredient: IngredientCostCalculatorModel):IngredientCostCalculatorModel{
    
    const avgWastePercentage = ingredient.products.reduce(
        (result, current)=>{
            return result+current.waste_percentage*current.raw_content_percentage}, 0
    )/100;
    const sourceWeight = ingredient.item_weight*(100-avgWastePercentage)/100
    const cost = ingredient.products.reduce(
        (total, current)=>{
            return total+current.gramCost*current.raw_content_percentage/100*sourceWeight
        },0
    )
    return {...ingredient, cost}
}

// элемент калькулятора, отвечающий за стоимость 1г продукта 
export interface ProductCostCalculatorModel {
    id: number
    name: string
    category_id: number
    purchase_options: ProductPurchaseOption[]
    waste_percentage: number
    raw_content_percentage: number
    // стоимость 1г по выбраной позиции закупки
    gramCost: number
}

// конструктор
export function constructProductCostCalculator(
    product: IngredientProductWithPurchaseOptionsDTO
) : ProductCostCalculatorModel{
    return {...product, gramCost:calcGramCost(product)}
}

// вернуть копию модели продукта с значением стоимости 1г, вычисленной по выбранной позиции закупки
export function selectPurchaseOptionId(product: ProductCostCalculatorModel, id:number) : ProductCostCalculatorModel {
    return {...product, gramCost: calcGramCost(product, id)}
}

export function calcGramCost(product: IngredientProductWithPurchaseOptionsDTO, optionId?: number){
    if(product.purchase_options.length == 0) return 0
    let option = product.purchase_options.find((o)=>o.id == optionId)
    if(option == undefined) option = product.purchase_options[0]
    return option.price / option.net_weight
}
