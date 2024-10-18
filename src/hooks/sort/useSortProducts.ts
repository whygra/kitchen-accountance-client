import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { ProductDTO } from "../../api/products"

export enum ProductField {
    None,
    Id,
    Name,
    Category,
}

class Comparers {
    // id
    static readonly IdAsc = (i1:ProductDTO, i2:ProductDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:ProductDTO, i2:ProductDTO)=>
        i2.id - i1.id
    
            // Наименование
    static readonly NameAsc = (i1:ProductDTO, i2:ProductDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:ProductDTO, i2:ProductDTO)=>
        i2.name.localeCompare(i1.name)

    // Категория
    static readonly CategoryAsc = (i1:ProductDTO, i2:ProductDTO)=>
        i1.category?.name.localeCompare(i2.category?.name??'')??-1
    static readonly CategoryDesc = (i1:ProductDTO, i2:ProductDTO)=>
        i2.category?.name.localeCompare(i1.category?.name??'')??-1

    // функция получения компаратора
    static readonly getComparer = (field: ProductField, isDesc: boolean) => {
        switch (field) {
            case ProductField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case ProductField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            case ProductField.Category:
                return isDesc ?Comparers.CategoryDesc :Comparers.CategoryAsc
            default:
                return (i1:ProductDTO, i2:ProductDTO)=>0
        }
    }
}

export default function useSortProducts() {
    const [sortField, setSortField] = useState(ProductField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: ProductField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(ProductField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}