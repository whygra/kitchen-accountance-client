import { useState } from "react"
import { ProductTagDTO } from "../../api/nomenclature/productTags"

export enum ProductTagField {
    None = 'ProductTagNone',
    Id = 'ProductTagId',
    Name = 'ProductTagName',
    NProducts = 'ProductTagNProducts',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:ProductTagDTO, i2:ProductTagDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:ProductTagDTO, i2:ProductTagDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:ProductTagDTO, i2:ProductTagDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:ProductTagDTO, i2:ProductTagDTO)=>
        i2.name.localeCompare(i1.name)
    
    // 
    static readonly NProductsAsc = (i1:ProductTagDTO, i2:ProductTagDTO)=>
        (i1.products?.length??0) - (i2.products?.length??0)
    static readonly NProductsDesc = (i1:ProductTagDTO, i2:ProductTagDTO)=>
        (i2.products?.length??0) - (i1.products?.length??0)

    // функция получения компаратора
    static readonly getComparer = (field: ProductTagField, isDesc: boolean) => {
        switch (field) {
            case ProductTagField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case ProductTagField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            case ProductTagField.NProducts:
                return isDesc ?Comparers.NProductsDesc :Comparers.NProductsAsc
            default:
                return (i1:ProductTagDTO, i2:ProductTagDTO)=>0
        }
    }
}

export default function useSortProductTags() {
    const [sortField, setSortField] = useState(ProductTagField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: ProductTagField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(ProductTagField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}