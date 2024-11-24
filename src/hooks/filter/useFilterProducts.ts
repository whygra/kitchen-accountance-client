import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { ProductDTO } from "../../api/products"


export interface SearchParams {
    id: number
    name: string
    category: string    
    group: string    
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    category: '', 
    group: '', 
}

export default function useFilterProducts() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:ProductDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
        && (searchData.category.length==0 || searchData.category.split(' ').every(s=>i.category?.name.toLocaleLowerCase().includes(s)))
        && (searchData.group.length==0 || searchData.group.split(' ').every(s=>i.group?.name.toLocaleLowerCase().includes(s)))
        && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
    }
    
    return {searchData, setSearchData, getPredicate}
}
