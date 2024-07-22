import { DataAction } from "."

export type DishFormState = {
    dataAction: DataAction
    id: number
    name: string
    dishIngredientForms: DishIngredientFormState[]
}

export type DishIngredientFormState = {
    dataAction: DataAction
    key: string
    id: number
    ingredientId: number
    ingredientName: string
    ingredientTypeId: number
    ingredientDataAction: DataAction
    ingredientRawWeight: number
    wastePercentage: number
}

export const DISH_FORM_INIT_STATE: DishFormState = {
    dataAction:DataAction.Create, 
    id:0, 
    name:"", 
    dishIngredientForms:[]
}