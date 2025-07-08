import { DataAction } from ".."
import { PurchaseActDTO } from "../../api/storage/purchaseActs"
import { v4 as uuid } from "uuid"
import { ProductDTO } from "../../api/nomenclature/products"
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions"
import { DistributorDTO } from "../../api/nomenclature/distributors"

export interface PurchaseActFormState {
    id: number
    date: string
    distributor: DistributorDTO
    itemForms: PurchaseActItemFormState[]
}

export function constructPurchaseActForm(dto?: PurchaseActDTO): PurchaseActFormState{
    return {    
        id: dto?.id ?? 0,
        distributor: dto?.distributor ?? {id:0, name:''},
        date: dto?.date ?? '',
        itemForms: dto?.items?.map(i=>constructPurchaseActItemForm(i)) ?? [],
    }
}

export function purchaseActFormToDTO(formState: PurchaseActFormState): PurchaseActDTO{
    return {
        distributor: formState.distributor,
        id: formState.id,
        date: formState.date,
        items: formState.itemForms
            .filter(p=>p.dataAction!=DataAction.Delete)
            .map(p=>purchaseActItemToDTO(p))
    }
}

export interface PurchaseActItemFormState {
    key: string
    updateItem: boolean
    id: number
    unitId: number
    name: string
    dataAction: DataAction
    amount: number
    net_weight: number
    price: number
}

export function constructPurchaseActItemForm(dto?: PurchaseOptionDTO): PurchaseActItemFormState{
    return {    
        key: uuid(),
        id: dto?.id ?? 0,
        updateItem: false,
        unitId: dto?.unit?.id ?? 0,
        name: dto?.name ?? '',
        dataAction: DataAction.None,
        amount: dto?.amount ?? 1,
        net_weight: dto?.net_weight ?? 1,
        price: dto?.price ?? 1,
    }
}

export function purchaseActItemToDTO(formState: PurchaseActItemFormState): PurchaseOptionDTO{
    return {
        id: formState.dataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        amount: formState.amount,
        unit: {id: formState.unitId, long:'', short:''},
        net_weight: formState.net_weight,
        price: formState.price,
    }
}