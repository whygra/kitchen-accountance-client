import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { IngredientTagDTO } from "../../api/nomenclature/ingredientTags"
import { IngredientDTO } from "../../api/nomenclature/ingredients";

export interface IngredientTagFormState {
    id: number
    name: string
    ingredientTagIngredientForms: IngredientTagIngredientFormState[]
}

export function constructIngredientTagForm(dto?: IngredientTagDTO): IngredientTagFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        ingredientTagIngredientForms: dto?.ingredients?.map(i=>constructIngredientTagIngredientForm(i)) ?? [],
    }
}

export function ingredientTagFormToDTO(formState: IngredientTagFormState): IngredientTagDTO{
    return {
        id: formState.id,
        name: formState.name,
        ingredients: formState.ingredientTagIngredientForms
            .map(f=>ingredientTagIngredientToDTO(f)),
    }
}

export interface IngredientTagIngredientFormState {
    ingredientDataAction: DataAction
    key: string
    id: number
    name: string
    itemWeight: number
    isItemMeasured: boolean
    typeId: number
}

export function constructIngredientTagIngredientForm(dto?: IngredientDTO) : IngredientTagIngredientFormState{
    
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

export function ingredientTagIngredientToDTO(formState: IngredientTagIngredientFormState): IngredientDTO {
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
