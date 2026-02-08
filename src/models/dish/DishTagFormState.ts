import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { DishTagDTO } from "../../api/nomenclature/dishTags"
import { DishDTO } from "../../api/nomenclature/dishes";
import { ServerImageData } from "../../api/constants";

export interface DishTagFormState {
    id: number
    name: string
    dishTagDishForms: DishTagDishFormState[]
}

export function constructDishTagForm(dto?: DishTagDTO): DishTagFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        dishTagDishForms: dto?.dishes?.map(i=>constructDishTagDishForm(i)) ?? [],
    }
}

export function dishTagFormToDTO(formState: DishTagFormState): DishTagDTO{
    return {
        id: formState.id,
        name: formState.name,
        dishes: formState.dishTagDishForms
            .map(f=>dishTagDishToDTO(f)),
    }
}

export interface DishTagDishFormState {
    dishDataAction: DataAction
    key: string
    id: number
    name: string
    image?: ServerImageData
}

export function constructDishTagDishForm(dto?: DishDTO) : DishTagDishFormState{
    
    return {
        dishDataAction: DataAction.None,
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        image: dto?.image,
    }
}

export function dishTagDishToDTO(formState: DishTagDishFormState): DishDTO {
    return {
        id: formState.dishDataAction==DataAction.Create ? 0 : formState.id,
        name: formState.name,
    }
}
