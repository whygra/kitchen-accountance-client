import { useState } from "react"
import { InventoryActDTO } from "../../api/storage/inventoryActs"


export interface SearchParams {
    id: number
    dateFrom: string
    dateTo: string
    minNProducts: number    
    maxNProducts: number    
    minNIngredients: number
    maxNIngredients: number
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    dateFrom: '', 
    dateTo: '', 
    minNProducts: NaN,    
    maxNProducts: NaN,    
    minNIngredients: NaN,
    maxNIngredients: NaN,
}

export default function useFilterInventoryActs() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:InventoryActDTO) =>
            (searchData.dateFrom=='' || Date.parse(searchData.dateFrom) <= Date.parse(i.date))
            && (searchData.dateTo=='' || Date.parse(searchData.dateTo) >= Date.parse(i.date))
            && (Number.isNaN(searchData.minNProducts) || (i.products && i.products.length >= searchData.minNProducts))
            && (Number.isNaN(searchData.maxNProducts) || (i.products && i.products.length <= searchData.maxNProducts))
            && (Number.isNaN(searchData.minNIngredients) || (i.products && i.products.length >= searchData.minNIngredients))
            && (Number.isNaN(searchData.maxNIngredients) || (i.products && i.products.length <= searchData.maxNIngredients))
    }
    
    return {searchData, setSearchData, getPredicate}
}
