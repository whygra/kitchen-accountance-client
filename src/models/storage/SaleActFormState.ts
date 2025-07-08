import { DataAction } from ".."
import { SaleActDTO } from "../../api/storage/saleActs"
import { v4 as uuid } from "uuid"
import { DishDTO } from "../../api/nomenclature/dishes"

export interface SaleActFormState {
    id: number
    date: string
    itemForms: SaleActItemFormState[]
}

export function constructSaleActForm(dto?: SaleActDTO): SaleActFormState{
    return {    
        id: dto?.id ?? 0,
        date: dto?.date ?? '',
        itemForms: dto?.items?.map(i=>constructSaleActItemForm(i)) ?? [],
    }
}

export function saleActFormToDTO(formState: SaleActFormState): SaleActDTO{
    return {
        id: formState.id,
        date: formState.date,
        items: formState.itemForms
            .filter(p=>p.dataAction!=DataAction.Delete)
            .map(p=>saleActItemToDTO(p))
    }
}

export interface SaleActItemFormState {
    key: string
    id: number
    name: string
    dataAction: DataAction
    amount: number
    price: number
}

export function constructSaleActItemForm(dto?: DishDTO): SaleActItemFormState{
    return {    
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        dataAction: DataAction.None,
        amount: dto?.amount ?? 1,
        price: dto?.price ?? 1,
    }
}

export function saleActItemToDTO(formState: SaleActItemFormState): DishDTO{
    return {
        id: formState.dataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        amount: formState.amount,
        price: formState.price,
    }
}