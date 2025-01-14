import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { IngredientGroupDTO } from "../../api/ingredientGroups"
import { IngredientDTO } from "../../api/ingredients";

export interface IngredientGroupFormState {
    id: number
    name: string
    ingredientGroupIngredientForms: IngredientGroupIngredientFormState[]
}

export function constructIngredientGroupForm(dto?: IngredientGroupDTO): IngredientGroupFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        ingredientGroupIngredientForms: dto?.ingredients?.map(i=>constructIngredientGroupIngredientForm(i)) ?? [],
    }
}

export function ingredientGroupFormToDTO(formState: IngredientGroupFormState): IngredientGroupDTO{
    return {
        id: formState.id,
        name: formState.name,
        ingredients: formState.ingredientGroupIngredientForms
            .map(f=>ingredientGroupIngredientToDTO(f)),
    }
}

export interface IngredientGroupIngredientFormState {
    ingredientDataAction: DataAction
    key: string
    id: number
    name: string
    itemWeight: number
    isItemMeasured: boolean
    typeId: number
}

export function constructIngredientGroupIngredientForm(dto?: IngredientDTO) : IngredientGroupIngredientFormState{
    
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

export function ingredientGroupIngredientToDTO(formState: IngredientGroupIngredientFormState): IngredientDTO {
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
