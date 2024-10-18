import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"


export enum DishField {
    None,
    Id,
    Name,
    Category,
    Products,
    Weight,
}

class Comparers {
        // id
        static readonly IdAsc = (i1:DishDTO, i2:DishDTO)=>
            i1.id - i2.id
        static readonly IdDesc = (i1:DishDTO, i2:DishDTO)=>
            i2.id - i1.id
    
        // вес
        static readonly WeightAsc = (i1:DishDTO, i2:DishDTO)=>
            calcDishWeight(i1) - calcDishWeight(i2)
        static readonly WeightDesc = (i1:DishDTO, i2:DishDTO)=>
            calcDishWeight(i2) - calcDishWeight(i1)
    
        // Наименование
        static readonly NameAsc = (i1:DishDTO, i2:DishDTO)=>
            i1.name.localeCompare(i2.name)
        static readonly NameDesc = (i1:DishDTO, i2:DishDTO)=>
            i2.name.localeCompare(i1.name)
    
        // Категория
        static readonly CategoryAsc = (i1:DishDTO, i2:DishDTO)=>{
            return i1.category?.name.localeCompare(i2.category?.name??'')??-1
        }
        static readonly CategoryDesc = (i1:DishDTO, i2:DishDTO)=>
            i2.category?.name.localeCompare(i1.category?.name??'')??-1
    
        // функция получения компаратора
        static readonly getComparer = (field: DishField, isDesc: boolean) => {
            switch (field) {
                case DishField.Name:
                    return isDesc ?Comparers.NameDesc :Comparers.NameAsc
                case DishField.Category:
                    return isDesc ?Comparers.CategoryDesc :Comparers.CategoryAsc
                case DishField.Weight:
                    return isDesc ?Comparers.WeightDesc :Comparers.WeightAsc
                case DishField.Id:
                    return isDesc ?Comparers.IdDesc :Comparers.IdAsc
                default:
                    return (i1:DishDTO, i2:DishDTO)=>0
            }
        }
}

export default function useSortDishes() {
    const [sortField, setSortField] = useState(DishField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: DishField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(DishField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}