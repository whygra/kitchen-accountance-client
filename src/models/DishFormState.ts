import { DataAction } from "."

export type DishFormState = {
    dataAction: DataAction
    id: number
    name: string
    dishComponentForms: DishComponentFormState[]
}

export type DishComponentFormState = {
    dataAction: DataAction
    key: string
    id: number
    componentId: number
    componentName: string
    componentTypeId: number
    componentDataAction: DataAction
    componentRawWeight: number
    wastePercentage: number
}

export const DISH_FORM_INIT_STATE: DishFormState = {
    dataAction:DataAction.Create, 
    id:0, 
    name:"", 
    dishComponentForms:[]
}