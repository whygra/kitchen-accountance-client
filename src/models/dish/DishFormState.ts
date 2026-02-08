import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { DishDTO } from "../../api/nomenclature/dishes"
import { IngredientDTO } from "../../api/nomenclature/ingredients";
import { ServerImageData } from "../../api/constants";
import { DishTagDTO } from "../../api/nomenclature/dishTags";

export interface DishFormState {
    id: number
    name: string
    description: string
    tags: DishTagDTO[]
    dishIngredientForms: DishIngredientFormState[]
    image?: ServerImageData
}

export function constructDishForm(dto?: DishDTO): DishFormState{
    return {
        image: dto?.image,
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        description: dto?.description ?? '',
        tags: dto?.tags ?? [],
        dishIngredientForms: dto?.ingredients?.map(i=>constructDishIngredientForm(i)) ?? [],
    }
}

export function dishFormToDTO(formState: DishFormState): DishDTO{
    return {
        id: formState.id,
        name: formState.name,
        description: formState.description,
        tags: formState.tags,
        ingredients: formState.dishIngredientForms
            .filter(f=>f.ingredientDataAction!=DataAction.Delete)
            .map(f=>dishIngredientToDTO(f)),

        image: formState.image,
    }
}

export interface DishIngredientFormState {
    ingredientDataAction: DataAction
    key: string
    id: number
    name: string
    itemWeight: number
    isItemMeasured: boolean
    typeId: number
    ingredientAmount: number
    wastePercentage: number
    netWeight: number
}

export function constructDishIngredientForm(dto?: IngredientDTO) : DishIngredientFormState{
    return {
        ingredientDataAction: DataAction.None,
        key: uuid(),
        id: dto?.id ?? 1,
        name: dto?.name ?? '',
        itemWeight: dto?.item_weight ?? 1,
        isItemMeasured: dto?.is_item_measured ?? false,
        typeId: dto?.type?.id ?? 0,
        ingredientAmount: dto?.amount ?? 1,
        wastePercentage: dto?.waste_percentage ?? 0,
        netWeight: dto?.net_weight ?? 0,
    }
}

export function dishIngredientToDTO(formState: DishIngredientFormState): IngredientDTO {
    return {
        id: formState.ingredientDataAction==DataAction.Create ? 0 : formState.id,
        name: formState.name,
        item_weight: formState.itemWeight,
        is_item_measured: formState.isItemMeasured,
        type: {
            id: formState.typeId,
            name: '',
        },
        amount: formState.ingredientAmount,
        net_weight: formState.netWeight,
    }
}

export interface DishTagFormState {
    dataAction: DataAction
    key: string
    id: number
    name: string
}

export function constructDishTagForm(dto?: DishTagDTO) : DishTagFormState{
    return {
        dataAction: DataAction.None,
        key: uuid(),
        id: dto?.id ?? 1,
        name: dto?.name ?? '',
    }
}

export function dishTagToDTO(formState: DishTagFormState): DishTagDTO {
    return {
        id: formState.dataAction==DataAction.Create ? 0 : formState.id,
        name: formState.name,
    }
}
