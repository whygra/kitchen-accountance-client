import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { ProductDTO } from "../../api/products"


export interface SearchParams {
    id: number
    name: string
    category: string    
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    category: '', 
}

export default function useFilterProducts() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:ProductDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.category.length==0 || i.category?.name.toLocaleLowerCase().includes(searchData.category))
            && (searchData.name.length==0 || i.name.toLocaleLowerCase().includes(searchData.name))
    }
    
    return {searchData, setSearchData, getPredicate}
}
