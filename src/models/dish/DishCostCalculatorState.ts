import { v4 as uuid } from "uuid";
import { DishDTO } from "../../api/nomenclature/dishes";
import { IngredientTagDTO } from "../../api/nomenclature/ingredientTags";
import { IngredientTypeDTO, IngredientDTO } from "../../api/nomenclature/ingredients";
import { ProductDTO } from "../../api/nomenclature/products";
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions";

export interface DishCostCalculatorState {
    
    id: number
    name: string
    ingredients: IngredientCostCalculatorModel[]

    cost: number
}

export function constructDishCostCalculator(dish?: DishDTO) : DishCostCalculatorState {
    return setCalcDishCost({
        id: dish?.id??0,
        name: dish?.name??'',
        ingredients: dish?.ingredients?.map(i=>{
            return{
                ...constructIngredientCostCalculator(i),
                share: (i.amount??0)*(i.item_weight??1)/(dish.total_gross_weight??0)
            }}) ?? [],
        cost: 0,
    })
}

export function setCalcDishCost(dish: DishCostCalculatorState):DishCostCalculatorState{
    const cost = dish.ingredients.reduce((total, current)=>total+current.cost, 0)

    return {...dish, cost}
}

export interface IngredientCostCalculatorModel {
    key: string
    id: number
    name: string
    item_weight?: number
    type?: IngredientTypeDTO
    tag?: IngredientTagDTO
    is_item_measured?: boolean
    products?: ProductCostCalculatorModel[]
    ingredients?: IngredientCostCalculatorModel[]
    avg_waste_percentage?: number
    waste_percentage: number
    amount: number
    // стоимость
    cost: number

    share?: number
}

export function constructIngredientCostCalculator(ingredient : IngredientDTO, share?: number, amount?:number) : IngredientCostCalculatorModel {
    const products = ingredient.products?.map(p=>constructProductCostCalculator(p, {...ingredient, amount:amount??ingredient.amount})) ?? []
    const srcW = calcIngredientSourceWeight(ingredient)
    return calcIngredientCost({
        key:uuid(),
        ...ingredient,
        avg_waste_percentage: ingredient.avg_waste_percentage,
        waste_percentage:ingredient.waste_percentage??0,
        amount: amount??ingredient.amount??1,
        share: share??0,
        cost:0, 
        products: products,
        ingredients: ingredient.ingredients?.map(i=>{
            const share = (i.amount??0)*(i.item_weight??1)/(ingredient.total_gross_weight??0)
            const amount = srcW/(i.item_weight??1)*(share)
            console.log(amount)
            return {
                ...constructIngredientCostCalculator(i, share, amount),
            }
        })
    })
}

export function setAmount(ingredient: IngredientCostCalculatorModel, amount: number): IngredientCostCalculatorModel{
    const srcW = calcIngredientSourceWeight({...ingredient, amount:amount})

console.log({
            ...ingredient, 
            amount: amount, 
            products: ingredient.products?.map(p=>{return{
                ...p, weight: srcW*p.share,}}),
            ingredients: ingredient.ingredients?.map(i=>
                calcIngredientCost(setAmount(i, srcW/(i.item_weight??1)*(i.share??0))
            )
        )
        
    })

    return {
            ...ingredient, 
            amount: amount, 
            products: ingredient.products?.map(p=>{return{
                ...p, weight: srcW*p.share,}}),
            ingredients: ingredient.ingredients?.map(i=>
                calcIngredientCost(setAmount(i, srcW/(i.item_weight??1)*(i.share??0))
            )
        )
        
    }
}

export function calcIngredientCost(ingredient: IngredientCostCalculatorModel):IngredientCostCalculatorModel{

    const cost = (ingredient.products?.reduce(
            (total, current)=>{
                return total+current.gramCost*current.weight
            }, 0
        ) ?? 0)
        +
        (ingredient.ingredients?.reduce(
            (total, current) => {
                return total+current.cost
            }, 0
        ) ?? 0)

    return {...ingredient, cost}
}

// элемент калькулятора, отвечающий за стоимость продукта 
export interface ProductCostCalculatorModel {
    key: string
    id: number
    name: string
    purchase_options: PurchaseOptionDTO[]
    share: number
    waste_percentage: number
    gross_weight: number
    // стоимость 1г по выбраной позиции закупки
    gramCost: number
    weight:number
    selected?: PurchaseOptionDTO
}

// конструктор
export function constructProductCostCalculator(
    product: ProductDTO,
    ingredient : IngredientDTO
) : ProductCostCalculatorModel{
    const share = (product.gross_weight??0)/(ingredient.total_gross_weight??0)
    return {
        key: uuid(),
        ...product,
        waste_percentage: product.waste_percentage??0,
        gross_weight: product.gross_weight??0,
        purchase_options: product.purchase_options??[],
        gramCost:calcGramCost(product),
        share: share,
        weight: share*calcIngredientSourceWeight(ingredient),
        selected: product.purchase_options ? product.purchase_options[0] : undefined,
    }
}

// вернуть копию продукта с значением стоимости 1г, вычисленной по выбранной позиции закупки
export function selectPurchaseOptionId(product: ProductCostCalculatorModel, id:number) : ProductCostCalculatorModel {
    return {...product, gramCost: calcGramCost(product, id), selected: product.purchase_options.find(o=>o.id==id)}
}

export function calcGramCost(product: ProductDTO, optionId?: number) {
    if(product.purchase_options?.length == 0) return 0
    let option = product.purchase_options?.find((o)=>o.id == optionId)
    if(option == undefined && product.purchase_options&&product.purchase_options.length > 0) option = product.purchase_options[0]
    return (option?.price && option?.net_weight) ? option?.price / option?.net_weight : 0
}

export function calcIngredientSourceWeight(ingredient: IngredientDTO){
    return (ingredient.item_weight??0)*(ingredient.amount??0) * 100
        / (100-(ingredient.avg_waste_percentage??0))
}