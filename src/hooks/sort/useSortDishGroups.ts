import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { DishGroupDTO } from "../../api/dishGroups"

export enum DishGroupField {
    None,
    Id,
    Name,
}

class Comparers {
    // id
    static readonly IdAsc = (i1:DishGroupDTO, i2:DishGroupDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:DishGroupDTO, i2:DishGroupDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:DishGroupDTO, i2:DishGroupDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:DishGroupDTO, i2:DishGroupDTO)=>
        i2.name.localeCompare(i1.name)


    // функция получения компаратора
    static readonly getComparer = (field: DishGroupField, isDesc: boolean) => {
        switch (field) {
            case DishGroupField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case DishGroupField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            default:
                return (i1:DishGroupDTO, i2:DishGroupDTO)=>0
        }
    }
}

export default function useSortDishGroups() {
    const [sortField, setSortField] = useState(DishGroupField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: DishGroupField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(DishGroupField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}