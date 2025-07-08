import { useState } from "react"
import { DishCategoryDTO } from "../../api/nomenclature/dishCategories"

export enum DishCategoryField {
    None = 'DishCategoryNone',
    Id = 'DishCategoryId',
    Name = 'DishCategoryName',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:DishCategoryDTO, i2:DishCategoryDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:DishCategoryDTO, i2:DishCategoryDTO)=>
        i2.id - i1.id
    
            // Наименование
    static readonly NameAsc = (i1:DishCategoryDTO, i2:DishCategoryDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:DishCategoryDTO, i2:DishCategoryDTO)=>
        i2.name.localeCompare(i1.name)


    // функция получения компаратора
    static readonly getComparer = (field: DishCategoryField, isDesc: boolean) => {
        switch (field) {
            case DishCategoryField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case DishCategoryField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            default:
                return (i1:DishCategoryDTO, i2:DishCategoryDTO)=>0
        }
    }
}

export default function useSortDishCatrgories() {
    const [sortField, setSortField] = useState(DishCategoryField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: DishCategoryField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(DishCategoryField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}