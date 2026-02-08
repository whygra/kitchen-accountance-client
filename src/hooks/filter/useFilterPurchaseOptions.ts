import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions"

export interface SearchParams {
    distributor: string
    isRelevant?: boolean
    code: string
    name: string
    unit: string
    product: string
    minNetWeight: number
    maxNetWeight: number
    minPrice: number
    maxPrice: number
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    distributor: '', 
    isRelevant: undefined, 
    code: '', 
    name: '', 
    unit: '', 
    product: '',
    minNetWeight: NaN,
    maxNetWeight: NaN,
    minPrice: NaN,
    maxPrice: NaN,  
}

export default function useFilterPurchaseOptions() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate(): (p:PurchaseOptionDTO)=>boolean {
        return (p:PurchaseOptionDTO) =>
            (searchData.distributor.length==0 || searchData.distributor.split(' ').every(s=>p.distributor?.name.toLocaleLowerCase().includes(s)))
            && (searchData.isRelevant == undefined || (p.is_relevant == searchData.isRelevant))
            && (searchData.code.length==0 || (p.code??'').includes(searchData.code))
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>p.name.toLocaleLowerCase().includes(s)))
            && (searchData.product.length==0 || searchData.product.split(' ').every(s=>p.product?.name.toLocaleLowerCase().includes(s)))
            && (searchData.unit.length==0 
                || (p.unit?.short.toLocaleLowerCase().includes(searchData.unit)??false)
                || (p.unit?.long.toLocaleLowerCase().includes(searchData.unit)??false)
            )
            && (Number.isNaN(searchData.minNetWeight) || p.net_weight >= searchData.minNetWeight)
            && (Number.isNaN(searchData.maxNetWeight) || p.net_weight <= searchData.maxNetWeight)
            && (Number.isNaN(searchData.minPrice) || p.price >= searchData.minPrice)
            && (Number.isNaN(searchData.maxPrice) || p.price <= searchData.maxPrice)
    }
    
    return {searchData, setSearchData, getPredicate}
}
