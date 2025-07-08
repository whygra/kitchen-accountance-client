import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { DishGroupDTO } from "../../api/nomenclature/dishGroups"
import { DishDTO } from "../../api/nomenclature/dishes";
import { ServerImageData } from "../../api/constants";

export interface DishGroupFormState {
    id: number
    name: string
    dishGroupDishForms: DishGroupDishFormState[]
}

export function constructDishGroupForm(dto?: DishGroupDTO): DishGroupFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        dishGroupDishForms: dto?.dishes?.map(i=>constructDishGroupDishForm(i)) ?? [],
    }
}

export function dishGroupFormToDTO(formState: DishGroupFormState): DishGroupDTO{
    return {
        id: formState.id,
        name: formState.name,
        dishes: formState.dishGroupDishForms
            .map(f=>dishGroupDishToDTO(f)),
    }
}

export interface DishGroupDishFormState {
    dishDataAction: DataAction
    key: string
    id: number
    name: string
    image?: ServerImageData
}

export function constructDishGroupDishForm(dto?: DishDTO) : DishGroupDishFormState{
    
    return {
        dishDataAction: DataAction.None,
        key: uuid(),
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        image: dto?.image,
    }
}

export function dishGroupDishToDTO(formState: DishGroupDishFormState): DishDTO {
    return {
        id: formState.dishDataAction==DataAction.Create ? 0 : formState.id,
        name: formState.name,
    }
}
