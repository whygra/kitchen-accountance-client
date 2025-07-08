import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { DishCategoryDTO } from "../../api/nomenclature/dishCategories"
import { DishDTO } from "../../api/nomenclature/dishes";
import { ServerImageData } from "../../api/constants";

export interface DishCategoryFormState {
    id: number
    name: string
    dishCategoryDishForms: DishCategoryDishFormState[]
}

export function constructDishCategoryForm(dto?: DishCategoryDTO): DishCategoryFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        dishCategoryDishForms: dto?.dishes?.map(i=>constructDishCategoryDishForm(i)) ?? [],
    }
}

export function dishCategoryFormToDTO(formState: DishCategoryFormState): DishCategoryDTO{
    return {
        id: formState.id,
        name: formState.name,
        dishes: formState.dishCategoryDishForms
            .map(f=>dishCategoryDishToDTO(f)),

    }
}

export interface DishCategoryDishFormState {
    dishDataAction: DataAction
    key: string
    id: number
    name: string
    image?: ServerImageData
}

export function constructDishCategoryDishForm(dto?: DishDTO) : DishCategoryDishFormState{
    return {
        dishDataAction: DataAction.None,
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        image: dto?.image
    }
}

export function dishCategoryDishToDTO(formState: DishCategoryDishFormState): DishDTO {
    return {
        id: formState.dishDataAction==DataAction.Create ? 0 : formState.id,
        name: formState.name,
    }
}
