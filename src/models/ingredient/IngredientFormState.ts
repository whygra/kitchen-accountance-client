import { DataAction } from ".."
import { IngredientDTO } from "../../api/nomenclature/ingredients"
import { v4 as uuid } from "uuid"
import { ProductDTO } from "../../api/nomenclature/products"
import { IngredientTagDTO } from "../../api/nomenclature/ingredientTags"

export interface IngredientFormState {
    id: number
    name: string
    description: string
    tags: IngredientTagDTO[]
    typeId: number
    itemWeight: number
    isItemMeasured: boolean
    ingredientProductForms: IngredientProductFormState[]
    ingredientIngredientForms: IngredientIngredientFormState[]

}

export function constructIngredientForm(dto?: IngredientDTO): IngredientFormState{
    return {    
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        description: dto?.description ?? '',
        tags: dto?.tags ?? [],
        typeId: dto?.type?.id ?? 0,
        itemWeight: dto?.item_weight ?? 1,
        isItemMeasured: dto?.is_item_measured ?? false,
        ingredientProductForms: dto?.products?.map(p=>constructIngredientProductForm(p, dto.total_gross_weight)) ?? [],
        ingredientIngredientForms: dto?.ingredients?.map(p=>constructIngredientIngredientForm(p, dto.total_gross_weight)) ?? [],
    }
}

export function ingredientFormToDTO(formState: IngredientFormState): IngredientDTO{
    return {
        id: formState.id,
        name: formState.name,
        description: formState.description,
        item_weight: formState.isItemMeasured ? formState.itemWeight : 1,
        is_item_measured: formState.isItemMeasured,
        tags: formState.tags,
        type: {
            id: formState.typeId,
            name: ''
        },
        products: formState.ingredientProductForms
            .filter(p=>p.dataAction!=DataAction.Delete)
            .map(p=>ingredientProductToDTO(p)),
        ingredients: formState.ingredientIngredientForms
            .filter(i=>i.dataAction!=DataAction.Delete)
            .map(i=>ingredientIngredientToDTO(i))
    }
}

export interface IngredientProductFormState {
    key: string
    id: number
    name: string
    dataAction: DataAction
    grossWeight: number
    weightPercentage: number
    netWeight: number
    wastePercentage: number
}

export function constructIngredientProductForm(dto?: ProductDTO, totalGrossWeight?: number): IngredientProductFormState{
    return {    
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        dataAction: DataAction.None,
        grossWeight: dto?.gross_weight ?? 1,
        weightPercentage: (dto?.gross_weight && totalGrossWeight) ? dto?.gross_weight / totalGrossWeight : 1,
        netWeight: dto?.net_weight ?? 1,
        wastePercentage: dto?.waste_percentage ?? 0,
    }
}

export function ingredientProductToDTO(formState: IngredientProductFormState): ProductDTO{
    return {
        id: formState.dataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        gross_weight: formState.grossWeight,
        net_weight: formState.netWeight,
    }
}

export interface IngredientIngredientFormState {
    key: string
    id: number
    name: string
    dataAction: DataAction
    amount: number
    itemWeight: number
    weightPercentage: number
    typeId: number
    isItemMeasured: boolean
    netWeight: number
    wastePercentage: number
}

export function constructIngredientIngredientForm(dto?: IngredientDTO, totalGrossWeight?: number): IngredientIngredientFormState{
    return {
        key: uuid(),
        typeId: dto?.type?.id ?? 0,
        isItemMeasured: dto?.is_item_measured ?? false,
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        dataAction: DataAction.None,
        amount: dto?.amount ?? 1,
        itemWeight: dto?.item_weight ?? 1,
        weightPercentage: (dto?.amount && dto?.item_weight && totalGrossWeight) ? dto?.amount * dto?.item_weight / totalGrossWeight : 1,
        netWeight: dto?.net_weight ?? 1,
        wastePercentage: dto?.waste_percentage ?? 0,
    }
}

export function ingredientIngredientToDTO(formState: IngredientIngredientFormState): IngredientDTO{
    return {
        id: formState.dataAction == DataAction.Create ? 0 : formState.id,
        type: {name:'', id:formState.typeId},
        is_item_measured: formState.isItemMeasured,
        name: formState.name,
        amount: formState.amount,
        net_weight: formState.netWeight,
    }
}

export interface IngredientTagFormState {
    dataAction: DataAction
    key: string
    id: number
    name: string
}

export function constructIngredientTagForm(dto?: IngredientTagDTO) : IngredientTagFormState{
    return {
        dataAction: DataAction.None,
        key: uuid(),
        id: dto?.id ?? 1,
        name: dto?.name ?? '',
    }
}

export function ingredientTagToDTO(formState: IngredientTagFormState): IngredientTagDTO {
    return {
        id: formState.dataAction==DataAction.Create ? 0 : formState.id,
        name: formState.name,
    }
}
