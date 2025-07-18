import { DataAction } from ".."
import { IngredientDTO } from "../../api/nomenclature/ingredients"
import { v4 as uuid } from "uuid"
import { ProductDTO } from "../../api/nomenclature/products"

export interface IngredientFormState {
    id: number
    name: string
    description: string
    categoryDataAction: DataAction
    categoryId: number
    categoryName: string
    groupDataAction: DataAction
    groupId: number
    groupName: string
    typeId: number
    itemWeight: number
    isItemMeasured: boolean
    ingredientProductForms: IngredientProductFormState[]

}

export function constructIngredientForm(dto?: IngredientDTO): IngredientFormState{
    return {    
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        description: dto?.description ?? '',
        categoryDataAction: DataAction.None,
        categoryId: dto?.category?.id ?? 0,
        categoryName: dto?.category?.name ?? '',
        groupDataAction: DataAction.None,
        groupId: dto?.group?.id ?? 0,
        groupName: dto?.group?.name ?? '',
        typeId: dto?.type?.id ?? 0,
        itemWeight: dto?.item_weight ?? 1,
        isItemMeasured: dto?.is_item_measured ?? false,
        ingredientProductForms: dto?.products?.map(p=>constructIngredientProductForm(p, dto.total_gross_weight)) ?? [],
    }
}

export function ingredientFormToDTO(formState: IngredientFormState): IngredientDTO{
    return {
        id: formState.id,
        name: formState.name,
        description: formState.description,
        item_weight: formState.isItemMeasured ? formState.itemWeight : 1,
        is_item_measured: formState.isItemMeasured,
        category: {
            id: formState.categoryDataAction == DataAction.Create ? 0 : formState.categoryId,
            name: formState.categoryDataAction == DataAction.Create ? formState.categoryName : '',
        },
        group: {
            id: formState.groupDataAction == DataAction.Create ? 0 : formState.groupId,
            name: formState.groupDataAction == DataAction.Create ? formState.groupName : '',
        },
        type: {
            id: formState.typeId,
            name: ''
        },
        products: formState.ingredientProductForms
            .filter(p=>p.productDataAction!=DataAction.Delete)
            .map(p=>ingredientProductToDTO(p))
    }
}

export interface IngredientProductFormState {
    key: string
    id: number
    name: string
    productDataAction: DataAction
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
        productDataAction: DataAction.None,
        grossWeight: dto?.gross_weight ?? 1,
        weightPercentage: (dto?.gross_weight && totalGrossWeight) ? dto?.gross_weight / totalGrossWeight : 1,
        netWeight: dto?.net_weight ?? 1,
        wastePercentage: dto?.waste_percentage ?? 0,
    }
}

export function ingredientProductToDTO(formState: IngredientProductFormState): ProductDTO{
    return {
        id: formState.productDataAction == DataAction.Create ? 0 : formState.id,
        name: formState.name,
        gross_weight: formState.grossWeight,
        net_weight: formState.netWeight,
    }
}