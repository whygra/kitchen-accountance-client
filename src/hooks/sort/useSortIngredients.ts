import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { IngredientDTO } from "../../api/ingredients"

export enum IngredientField {
    None,
    Id,
    Name,
    Category,
    TypeId,
}

class Comparers {
    // id
    static readonly IdAsc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i2.id - i1.id
    
            // Наименование
    static readonly NameAsc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i2.name.localeCompare(i1.name)

    // Категория
    static readonly CategoryAsc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i1.category?.name.localeCompare(i2.category?.name??'')??-1
    static readonly CategoryDesc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i2.category?.name.localeCompare(i1.category?.name??'')??-1

    // Тип
    static readonly TypeAsc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i1.type.id - i2.type.id
    static readonly TypeDesc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i2.type.id - i1.type.id

    // функция получения компаратора
    static readonly getComparer = (field: IngredientField, isDesc: boolean) => {
        switch (field) {
            case IngredientField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case IngredientField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            case IngredientField.TypeId:
                return isDesc ?Comparers.TypeDesc :Comparers.TypeAsc
            case IngredientField.Category:
                return isDesc ?Comparers.CategoryDesc :Comparers.CategoryAsc
            default:
                return (i1:IngredientDTO, i2:IngredientDTO)=>0
        }
    }
}

export default function useSortIngredients() {
    const [sortField, setSortField] = useState(IngredientField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: IngredientField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(IngredientField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}