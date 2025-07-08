import { useState } from "react"
import { IngredientCategoryDTO } from "../../api/nomenclature/ingredientCategories"

export enum IngredientCategoryField {
    None = 'IngredientCategoryNone',
    Id = 'IngredientCategoryId',
    Name = 'IngredientCategoryName',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:IngredientCategoryDTO, i2:IngredientCategoryDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:IngredientCategoryDTO, i2:IngredientCategoryDTO)=>
        i2.id - i1.id
    
            // Наименование
    static readonly NameAsc = (i1:IngredientCategoryDTO, i2:IngredientCategoryDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:IngredientCategoryDTO, i2:IngredientCategoryDTO)=>
        i2.name.localeCompare(i1.name)


    // функция получения компаратора
    static readonly getComparer = (field: IngredientCategoryField, isDesc: boolean) => {
        switch (field) {
            case IngredientCategoryField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case IngredientCategoryField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            default:
                return (i1:IngredientCategoryDTO, i2:IngredientCategoryDTO)=>0
        }
    }
}

export default function useSortIngredientCatrgories() {
    const [sortField, setSortField] = useState(IngredientCategoryField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: IngredientCategoryField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(IngredientCategoryField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}