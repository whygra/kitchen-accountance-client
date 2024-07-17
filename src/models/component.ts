export type ComponentFormState = {
    submitAction: SubmitActionType
    id: number
    name: string
    componentTypeId: number
    componentProductForms: ComponentProductFormState[]
}

export type ComponentProductFormState = {
    dataAction: SubmitActionType
    key: string
    id: number
    productId: number
    productName: string
    productDataAction: SubmitActionType
    rawContentPercentage: number
    wastePercentage: number
}

export const COMPONENT_FORM_INIT_STATE: ComponentFormState = {
    submitAction:SubmitActionType.Create, 
    id:0, 
    name:"", 
    componentTypeId:1, 
    componentProductForms:[]
}