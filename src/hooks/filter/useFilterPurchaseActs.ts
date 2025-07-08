import { useState } from "react"
import { PurchaseActDTO } from "../../api/storage/purchaseActs"


export interface SearchParams {
    id: number
    dateFrom: string
    dateTo: string
    minNItems: number    
    maxNItems: number    
    minTotalCost: number    
    maxTotalCost: number    
    distributor: string
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    dateFrom: '', 
    dateTo: '', 
    distributor: '',    
    minNItems: NaN,
    maxNItems: NaN,
    minTotalCost: NaN,
    maxTotalCost: NaN,
}

export default function useFilterPurchaseActs() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:PurchaseActDTO) =>
            (searchData.dateFrom=='' || Date.parse(searchData.dateFrom) <= Date.parse(i.date))
            && (searchData.dateTo=='' || Date.parse(searchData.dateTo) >= Date.parse(i.date))
            && (searchData.distributor.length==0 || searchData.distributor.split(' ').every(s=>i.distributor?.name.toLocaleLowerCase().includes(s)))
            && (Number.isNaN(searchData.minTotalCost) || (i.items && i.items.length >= searchData.minTotalCost))
            && (Number.isNaN(searchData.maxTotalCost) || (i.items && i.items.length >= searchData.maxTotalCost))
            && (Number.isNaN(searchData.minNItems) || (i.items && i.items.length >= searchData.minNItems))
            && (Number.isNaN(searchData.maxNItems) || (i.items && i.items.length <= searchData.maxNItems))
    }
    
    return {searchData, setSearchData, getPredicate}
}
