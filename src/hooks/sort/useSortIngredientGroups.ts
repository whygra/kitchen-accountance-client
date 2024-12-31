import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { IngredientGroupDTO } from "../../api/ingredientGroups"

export enum IngredientGroupField {
    None = 'IngredientGroupNone',
    Id = 'IngredientGroupId',
    Name = 'IngredientGroupName',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:IngredientGroupDTO, i2:IngredientGroupDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:IngredientGroupDTO, i2:IngredientGroupDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:IngredientGroupDTO, i2:IngredientGroupDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:IngredientGroupDTO, i2:IngredientGroupDTO)=>
        i2.name.localeCompare(i1.name)


    // функция получения компаратора
    static readonly getComparer = (field: IngredientGroupField, isDesc: boolean) => {
        switch (field) {
            case IngredientGroupField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case IngredientGroupField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            default:
                return (i1:IngredientGroupDTO, i2:IngredientGroupDTO)=>0
        }
    }
}

export default function useSortIngredientGroups() {
    const [sortField, setSortField] = useState(IngredientGroupField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: IngredientGroupField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(IngredientGroupField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}