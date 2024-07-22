import { DataAction } from "."

export type IngredientFormState = {
    submitAction: DataAction
    id: number
    name: string
    ingredientTypeId: number
    ingredientProductForms: IngredientProductFormState[]
}

export type IngredientProductFormState = {
    dataAction: DataAction
    key: string
    id: number
    productId: number
    productName: string
    productDataAction: DataAction
    rawContentPercentage: number
    wastePercentage: number
}

export const INGREDIENT_FORM_INIT_STATE: IngredientFormState = {
    submitAction:DataAction.Create, 
    id:0, 
    name:"",
    ingredientTypeId:1,
    ingredientProductForms:[]
}