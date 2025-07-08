import { DataAction } from ".."
import { InventoryActDTO } from "../../api/storage/inventoryActs"
import { v4 as uuid } from "uuid"
import { ProductDTO } from "../../api/nomenclature/products"
import { IngredientDTO, IngredientTypeDTO } from "../../api/nomenclature/ingredients"

export interface InventoryActFormState {
    id: number
    date: string
    productForms: InventoryActProductFormState[]
    ingredientForms: InventoryActIngredientFormState[]
}

export interface InventoryActProductFormState {
    key: string
    id: number
    name: string
    dataAction: DataAction
    amount: number
    net_weight: number
}

export interface InventoryActIngredientFormState {
    key: string
    id: number
    itemWeight: number
    isItemMeasured: boolean
    name: string
    dataAction: DataAction
    amount: number
    netWeight: number
}

export function constructInventoryActForm(dto?: InventoryActDTO): InventoryActFormState{
    return {    
        id: dto?.id ?? 0,
        date: dto?.date ?? '',
        productForms: dto?.products?.map(i=>constructInventoryActProductForm(i)) ?? [],
        ingredientForms: dto?.ingredients?.map(i=>constructInventoryActIngredientForm(i)) ?? [],
    }
}

export function inventoryActFormToDTO(formState: InventoryActFormState): InventoryActDTO{
    return {
        id: formState.id,
        date: formState.date,
        products: formState.productForms
            .filter(p=>p.dataAction!=DataAction.Delete)
            .map(p=>inventoryActProductToDTO(p)),
        ingredients: formState.ingredientForms
            .filter(i=>i.dataAction!=DataAction.Delete)
            .map(i=>inventoryActIngredientToDTO(i))
    }
}

export function constructInventoryActProductForm(dto?: ProductDTO): InventoryActProductFormState{
    return {    
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        dataAction: DataAction.None,
        amount: dto?.amount ?? 1,
        net_weight: dto?.net_weight ?? 1,
    }
}

export function constructInventoryActIngredientForm(dto?: IngredientDTO): InventoryActIngredientFormState{
    return {    
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        isItemMeasured: dto?.is_item_measured ?? false,
        itemWeight: dto?.item_weight ?? 1,
        dataAction: DataAction.None,
        amount: dto?.amount ?? 1,
        netWeight: dto?.item_weight ?? 1,
    }
}

export function inventoryActProductToDTO(formState: InventoryActProductFormState): ProductDTO{
    return {
        id: formState.dataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        amount: formState.amount,
        net_weight: formState.net_weight,
    }
}

export function inventoryActIngredientToDTO(formState: InventoryActIngredientFormState): IngredientDTO{
    return {
        id: formState.dataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        amount: formState.amount,
        is_item_measured: formState.isItemMeasured,
        item_weight: formState.netWeight,
    }
}