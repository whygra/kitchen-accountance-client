import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { IngredientDTO } from "../../api/nomenclature/ingredients";
import { ServerImageData } from "../../api/constants";
import { ProjectDTO } from "../../api/nomenclature/projects";

export interface ProjectFormState {
    id: number
    name: string
    logo?: ServerImageData
    backdrop?: ServerImageData
}

export function constructProjectForm(dto?: ProjectDTO): ProjectFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        logo: dto?.logo,
        backdrop: dto?.backdrop,
    }
}

export function projectFormToDTO(formState: ProjectFormState): ProjectDTO{
    return {
        id: formState.id,
        name: formState.name,
        logo: formState.logo,
        backdrop: formState.backdrop,
    }
}

export interface ProjectIngredientFormState {
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

