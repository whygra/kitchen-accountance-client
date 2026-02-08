import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions"
import { ProductDTO } from "../../api/nomenclature/products"


export interface SearchParams {
    id: number
    name: string
    tags: string[]
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    tags: [], 
}

export default function useFilterProducts() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:ProductDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
        && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))      
        // tags
        && (searchData.tags.length==0 || searchData.tags.some(t=>i.tags?.some(p=>p.name.toLocaleLowerCase() == t.toLocaleLowerCase())))
    }
    
    return {searchData, setSearchData, getPredicate}
}
