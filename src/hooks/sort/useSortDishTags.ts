import { useState } from "react"
import { DishTagDTO } from "../../api/nomenclature/dishTags"

export enum DishTagField {
    None = 'DishTagNone',
    Id = 'DishTagId',
    Name = 'DishTagName',
    NDishes = 'DishTagNDishes',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:DishTagDTO, i2:DishTagDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:DishTagDTO, i2:DishTagDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:DishTagDTO, i2:DishTagDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:DishTagDTO, i2:DishTagDTO)=>
        i2.name.localeCompare(i1.name)
    
    // Наименование
    static readonly NDishesAsc = (i1:DishTagDTO, i2:DishTagDTO)=>
        (i1.dishes?.length??0) - (i2.dishes?.length??0)
    static readonly NDishesDesc = (i1:DishTagDTO, i2:DishTagDTO)=>
        (i2.dishes?.length??0) - (i1.dishes?.length??0)

    // функция получения компаратора
    static readonly getComparer = (field: DishTagField, isDesc: boolean) => {
        switch (field) {
            case DishTagField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case DishTagField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            case DishTagField.NDishes:
                return isDesc ?Comparers.NDishesDesc :Comparers.NDishesAsc
            default:
                return (i1:DishTagDTO, i2:DishTagDTO)=>0
        }
    }
}

export default function useSortDishTags() {
    const [sortField, setSortField] = useState(DishTagField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: DishTagField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(DishTagField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}