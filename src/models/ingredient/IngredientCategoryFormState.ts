import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { IngredientCategoryDTO } from "../../api/ingredientCategories"
import { IngredientDTO } from "../../api/ingredients";

export interface IngredientCategoryFormState {
    id: number
    name: string
    ingredientCategoryIngredientForms: IngredientCategoryIngredientFormState[]
}

export function constructIngredientCategoryForm(dto?: IngredientCategoryDTO): IngredientCategoryFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        ingredientCategoryIngredientForms: dto?.ingredients?.map(i=>constructIngredientCategoryIngredientForm(i)) ?? [],
    }
}

export function ingredientCategoryFormToDTO(formState: IngredientCategoryFormState): IngredientCategoryDTO{
    return {
        id: formState.id,
        name: formState.name,
        ingredients: formState.ingredientCategoryIngredientForms
            .map(f=>ingredientCategoryIngredientToDTO(f)),

    }
}

export interface IngredientCategoryIngredientFormState {
    ingredientDataAction: DataAction
    key: string
    id: number
    name: string
    itemWeight: number
    isItemMeasured: boolean
    typeId: number
}

export function constructIngredientCategoryIngredientForm(dto?: IngredientDTO) : IngredientCategoryIngredientFormState{
    return {
        ingredientDataAction: DataAction.None,
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        itemWeight: dto?.item_weight ?? 1,
        isItemMeasured: dto?.is_item_measured ?? false,
        typeId: dto?.type?.id ?? 0
    }
}

export function ingredientCategoryIngredientToDTO(formState: IngredientCategoryIngredientFormState): IngredientDTO {
    return {
        id: formState.ingredientDataAction==DataAction.Create ? 0 : formState.id,
        name: formState.name,
        item_weight: formState.itemWeight,
        is_item_measured: formState.isItemMeasured,
        type: {
            id: formState.typeId,
            name: '',
        },
    }
}
