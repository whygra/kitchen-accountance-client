import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { ProductCategoryDTO } from "../../api/productCategories"

export enum ProductCategoryField {
    None = 'ProductCategoryNone',
    Id = 'ProductCategoryId',
    Name = 'ProductCategoryName',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:ProductCategoryDTO, i2:ProductCategoryDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:ProductCategoryDTO, i2:ProductCategoryDTO)=>
        i2.id - i1.id
    
            // Наименование
    static readonly NameAsc = (i1:ProductCategoryDTO, i2:ProductCategoryDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:ProductCategoryDTO, i2:ProductCategoryDTO)=>
        i2.name.localeCompare(i1.name)


    // функция получения компаратора
    static readonly getComparer = (field: ProductCategoryField, isDesc: boolean) => {
        switch (field) {
            case ProductCategoryField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case ProductCategoryField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            default:
                return (i1:ProductCategoryDTO, i2:ProductCategoryDTO)=>0
        }
    }
}

export default function useSortProductCatrgories() {
    const [sortField, setSortField] = useState(ProductCategoryField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: ProductCategoryField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(ProductCategoryField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}