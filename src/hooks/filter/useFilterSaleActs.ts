import { useState } from "react"
import { SaleActDTO } from "../../api/storage/saleActs"


export interface SearchParams {
    id: number
    dateFrom: string
    dateTo: string
    minAmtItems: number    
    maxAmtItems: number    
    minTotalCost: number    
    maxTotalCost: number    
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    dateFrom: '', 
    dateTo: '', 
    minAmtItems: NaN,
    maxAmtItems: NaN,
    minTotalCost: NaN,
    maxTotalCost: NaN,
}

export default function useFilterSaleActs() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:SaleActDTO) =>
            (searchData.dateFrom=='' || Date.parse(searchData.dateFrom) <= Date.parse(i.date))
            && (searchData.dateTo=='' || Date.parse(searchData.dateTo) >= Date.parse(i.date))
            && (Number.isNaN(searchData.minTotalCost) || (i.items && i.items.length >= searchData.minTotalCost))
            && (Number.isNaN(searchData.maxTotalCost) || (i.items && i.items.length >= searchData.maxTotalCost))
            && (Number.isNaN(searchData.minAmtItems) || (i.items && i.items.length >= searchData.minAmtItems))
            && (Number.isNaN(searchData.maxAmtItems) || (i.items && i.items.length <= searchData.maxAmtItems))
    }
    
    return {searchData, setSearchData, getPredicate}
}
