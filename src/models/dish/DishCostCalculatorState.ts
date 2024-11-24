import { DishCategoryDTO } from "../../api/dishCategories";
import { DishDTO } from "../../api/dishes";
import { IngredientCategoryDTO } from "../../api/ingredientCategories";
import { IngredientGroupDTO } from "../../api/ingredientGroups";
import { IngredientTypeDTO, IngredientDTO } from "../../api/ingredients";
import { ProductCategoryDTO } from "../../api/productCategories";
import { ProductDTO } from "../../api/products";
import { ProductPurchaseOptionDTO } from "../../api/purchaseOptions";

export interface DishCostCalculatorState {
    
    id: number
    name: string
    category: DishCategoryDTO
    ingredients: IngredientCostCalculatorModel[]

    cost: number
}

export function constructDishCostCalculator(dish?: DishDTO) : DishCostCalculatorState {
    return setCalcDishCost({
        id: dish?.id??0,
        category: dish?.category??{id:0,name:''},
        name: dish?.name??'',
        ingredients: dish?.ingredients?.map(i=>constructIngredientCostCalculator(i)) ?? [],
        cost: 0,
    })
}

export function setCalcDishCost(dish: DishCostCalculatorState):DishCostCalculatorState{
    const cost = dish.ingredients.reduce((total, current)=>total+current.cost, 0)

    return {...dish, cost}
}

export interface IngredientCostCalculatorModel {
    id: number
    name: string
    item_weight?: number
    type?: IngredientTypeDTO
    category?: IngredientCategoryDTO
    group?: IngredientGroupDTO
    is_item_measured?: boolean
    products?: ProductCostCalculatorModel[]
    waste_percentage: number
    ingredient_amount: number
    // стоимость
    cost: number
}

export function constructIngredientCostCalculator(ingredient : IngredientDTO) : IngredientCostCalculatorModel {
    const products = ingredient.products?.map(p=>constructProductCostCalculator(p, ingredient)) ?? []
    return calcIngredientCost({...ingredient, waste_percentage:ingredient.waste_percentage??0, ingredient_amount:ingredient.ingredient_amount??1, cost:0, products: products, })
}

export function setAmount(ingredient: IngredientCostCalculatorModel, amount: number): IngredientCostCalculatorModel{
    return {
        ...ingredient, ingredient_amount: amount, 
        products: ingredient.products?.map(p=>{return{
            ...p, weight: calcIngredientSourceWeight({...ingredient, ingredient_amount:amount})*p.raw_content_percentage/100
        }}) ?? []
    }
}

export function calcIngredientCost(ingredient: IngredientCostCalculatorModel):IngredientCostCalculatorModel{

    const cost = ingredient.products?.reduce(
        (total, current)=>{
            return total+current.gramCost*current.weight
        },0
    ) ?? 0
    return {...ingredient, cost}
}

// элемент калькулятора, отвечающий за стоимость 1г продукта 
export interface ProductCostCalculatorModel {
    id: number
    name: string
    category?: ProductCategoryDTO
    purchase_options: ProductPurchaseOptionDTO[]
    waste_percentage: number
    raw_content_percentage: number
    // стоимость 1г по выбраной позиции закупки
    gramCost: number
    weight:number
}

// конструктор
export function constructProductCostCalculator(
    product: ProductDTO,
    ingredient : IngredientDTO
) : ProductCostCalculatorModel{
    return {
        ...product,
        waste_percentage: product.waste_percentage??0,
        raw_content_percentage: product.raw_content_percentage??0,
        purchase_options: product.purchase_options??[],
        gramCost:calcGramCost(product), 
        weight:calcIngredientSourceWeight(ingredient)*(product.raw_content_percentage??0)/100
    }
}

// вернуть копию продукта с значением стоимости 1г, вычисленной по выбранной позиции закупки
export function selectPurchaseOptionId(product: ProductCostCalculatorModel, id:number) : ProductCostCalculatorModel {
    return {...product, gramCost: calcGramCost(product, id)}
}

export function calcGramCost(product: ProductDTO, optionId?: number){
    if(product.purchase_options?.length == 0) return 0
    let option = product.purchase_options?.find((o)=>o.id == optionId)
    if(option == undefined && product.purchase_options&&product.purchase_options.length > 0) option = product.purchase_options[0]
    return (option?.price && option?.net_weight) ? option?.price / option?.net_weight : 0
}

export function calcIngredientSourceWeight(ingredient: IngredientDTO){
    const avgWastePercentage = (ingredient.products?.reduce(
        (result, current)=>{
            return result + (current.waste_percentage&&current.raw_content_percentage ? current.waste_percentage*current.raw_content_percentage : 0)
        }, 0
    )??0)/100;

    return (ingredient?.item_weight??1)*(ingredient.ingredient_amount??1) / (100 - avgWastePercentage) * 100
}