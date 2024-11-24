import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { DishDTO } from "../../api/dishes"
import { IngredientDTO } from "../../api/ingredients";
import { ServerImageData } from "../../api/constants";

export interface DishFormState {
    categoryDataAction: DataAction
    groupDataAction: DataAction
    id: number
    name: string
    categoryId: number
    categoryName: string
    groupId: number
    groupName: string
    dishIngredientForms: DishIngredientFormState[]
    image?: ServerImageData
}

export function constructDishForm(dto?: DishDTO): DishFormState{
    return {
        categoryDataAction: DataAction.None,
        groupDataAction: DataAction.None,
        image: dto?.image,
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        categoryId: dto?.category?.id ?? 0,
        categoryName: dto?.category?.name ?? '',
        groupId: dto?.group?.id ?? 0,
        groupName: dto?.group?.name ?? '',
        dishIngredientForms: dto?.ingredients?.map(i=>constructDishIngredientForm(i)) ?? [],
    }
}

export function dishFormToDTO(formState: DishFormState): DishDTO{
    return {
        id: formState.id,
        name: formState.name,
        category: {
            id: formState.categoryDataAction == DataAction.Create ? 0 : formState.categoryId,
            name: formState.categoryDataAction == DataAction.Create ? formState.categoryName : '',
        },
        group: {
            id: formState.groupDataAction == DataAction.Create ? 0 : formState.groupId,
            name: formState.groupDataAction == DataAction.Create ? formState.groupName : '',
        },
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
        ingredientAmount: dto?.ingredient_amount ?? 1,
        wastePercentage: dto?.waste_percentage ?? 0,
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
        ingredient_amount: formState.ingredientAmount,
        waste_percentage: formState.wastePercentage,
    }
}
