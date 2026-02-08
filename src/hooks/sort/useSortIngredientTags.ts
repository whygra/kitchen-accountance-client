import { useState } from "react"
import { IngredientTagDTO } from "../../api/nomenclature/ingredientTags"

export enum IngredientTagField {
    None = 'IngredientTagNone',
    Id = 'IngredientTagId',
    Name = 'IngredientTagName',
    NIngredients = 'IngredientTagNIngredients',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:IngredientTagDTO, i2:IngredientTagDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:IngredientTagDTO, i2:IngredientTagDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:IngredientTagDTO, i2:IngredientTagDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:IngredientTagDTO, i2:IngredientTagDTO)=>
        i2.name.localeCompare(i1.name)

    static readonly NIngredientsAsc = (i1:IngredientTagDTO, i2:IngredientTagDTO)=>
        (i1.ingredients?.length ?? 0) - (i2.ingredients?.length ?? 0)
    static readonly NIngredientsDesc = (i1:IngredientTagDTO, i2:IngredientTagDTO)=>
        (i2.ingredients?.length ?? 0) - (i1.ingredients?.length ?? 0)


    // функция получения компаратора
    static readonly getComparer = (field: IngredientTagField, isDesc: boolean) => {
        switch (field) {
            case IngredientTagField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case IngredientTagField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            case IngredientTagField.NIngredients:
                return isDesc ?Comparers.NIngredientsDesc :Comparers.NIngredientsAsc
            default:
                return (i1:IngredientTagDTO, i2:IngredientTagDTO)=>0
        }
    }
}

export default function useSortIngredientTags() {
    const [sortField, setSortField] = useState(IngredientTagField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: IngredientTagField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(IngredientTagField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}