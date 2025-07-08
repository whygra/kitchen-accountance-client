import { DataAction } from ".."
import { WriteOffActDTO } from "../../api/storage/writeOffActs"
import { v4 as uuid } from "uuid"
import { ProductDTO } from "../../api/nomenclature/products"

export interface WriteOffActFormState {
    id: number
    date: string
    products: WriteOffActProductFormState[]
}

export function constructWriteOffActForm(dto?: WriteOffActDTO): WriteOffActFormState{
    return {    
        id: dto?.id ?? 0,
        date: dto?.date ?? '',
        products: dto?.products?.map(i=>constructWriteOffActProductForm(i)) ?? [],
    }
}

export function inventoryActFormToDTO(formState: WriteOffActFormState): WriteOffActDTO{
    return {
        id: formState.id,
        date: formState.date,
        products: formState.products
            .filter(p=>p.productDataAction!=DataAction.Delete)
            .map(p=>inventoryActProductToDTO(p))
    }
}

export interface WriteOffActProductFormState {
    key: string
    id: number
    name: string
    productDataAction: DataAction
    amount: number
    net_weight: number
}

export interface WriteOffActIngredientFormState {
    key: string
    id: number
    name: string
    productDataAction: DataAction
    amount: number
    net_weight: number
}

export function constructWriteOffActProductForm(dto?: ProductDTO): WriteOffActProductFormState{
    return {    
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        productDataAction: DataAction.None,
        amount: dto?.amount ?? 1,
        net_weight: dto?.net_weight ?? 1,
    }
}

export function inventoryActProductToDTO(formState: WriteOffActProductFormState): ProductDTO{
    return {
        id: formState.productDataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        amount: formState.amount,
        net_weight: formState.net_weight,
    }
}

export function inventoryActIngredientToDTO(formState: WriteOffActProductFormState): ProductDTO{
    return {
        id: formState.productDataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        amount: formState.amount,
        net_weight: formState.net_weight,
    }
}