import { DataAction } from "."

export type ComponentFormState = {
    submitAction: DataAction
    id: number
    name: string
    componentTypeId: number
    componentProductForms: ComponentProductFormState[]
}

export type ComponentProductFormState = {
    dataAction: DataAction
    key: string
    id: number
    productId: number
    productName: string
    productDataAction: DataAction
    rawContentPercentage: number
    wastePercentage: number
}

export const COMPONENT_FORM_INIT_STATE: ComponentFormState = {
    submitAction:DataAction.Create, 
    id:0, 
    name:"",
    componentTypeId:1,
    componentProductForms:[]
}