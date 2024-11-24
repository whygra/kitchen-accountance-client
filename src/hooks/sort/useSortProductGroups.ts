import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { ProductGroupDTO } from "../../api/productGroups"

export enum ProductGroupField {
    None,
    Id,
    Name,
}

class Comparers {
    // id
    static readonly IdAsc = (i1:ProductGroupDTO, i2:ProductGroupDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:ProductGroupDTO, i2:ProductGroupDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:ProductGroupDTO, i2:ProductGroupDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:ProductGroupDTO, i2:ProductGroupDTO)=>
        i2.name.localeCompare(i1.name)


    // функция получения компаратора
    static readonly getComparer = (field: ProductGroupField, isDesc: boolean) => {
        switch (field) {
            case ProductGroupField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case ProductGroupField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            default:
                return (i1:ProductGroupDTO, i2:ProductGroupDTO)=>0
        }
    }
}

export default function useSortProductGroups() {
    const [sortField, setSortField] = useState(ProductGroupField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: ProductGroupField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(ProductGroupField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}