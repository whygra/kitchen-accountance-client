import { v4 as uuid } from "uuid";
import { DataAction } from "."
import { DishDTO } from "../api/dishes"
import { IngredientDTO } from "../api/ingredients";
import { ServerImageData } from "../api/constants";

export interface DishFormState {
    categoryDataAction: DataAction
    id: number
    name: string
    categoryId: number
    categoryName: string
    dishIngredientForms: DishIngredientFormState[]
    image?: ServerImageData
}

export function constructDishForm(dto?: DishDTO): DishFormState{
    return {
        categoryDataAction: DataAction.None,
        image: dto?.image,
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        categoryId: dto?.category?.id ?? 0,
        categoryName: dto?.category?.name ?? '',
        dishIngredientForms: dto?.ingredients?.map(i=>constructDishIngredientForm(i)) ?? [],
    }
}

export function dishFormToDTO(formState: DishFormState): DishDTO{
    return {
        id: formState.id,
        name: formState.name,
        category: {
            id: formState.categoryDataAction == DataAction.Create ? 0 : formState.categoryId,
            name: formState.categoryName,
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
    categoryId: number
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
        typeId: dto?.type.id ?? 1,
        categoryId: dto?.category?.id ?? 0,
        ingredientAmount: dto?.ingredient_amount ?? 0,
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
        category: {
            id: formState.categoryId,
            name: ''
        },
        ingredient_amount: formState.ingredientAmount,
        waste_percentage: formState.wastePercentage,
    }
}
