import { DataAction } from "."

export type DistributorFormState = {
    id: number
    name: string
    purchaseOptionForms: PurchaseOptionFormState[]
}

export type PurchaseOptionFormState = {
    key: string
    dataAction: DataAction
    id: number
    productId: number
    productName: string
    productDataAction: DataAction
    unitId: number
    unitShortName: string
    unitLongName: string
    unitDataAction: DataAction
    name: string
    netWeight: number
    price: number
}

export const DISTRIBUTOR_FORM_INIT_STATE: DistributorFormState = {
    id: 0,
    name: "",
    purchaseOptionForms: [],
}