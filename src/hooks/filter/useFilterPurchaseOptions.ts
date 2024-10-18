import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"

export interface SearchParams {
    distributor: string
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

    function getPredicate() {
        return (p:PurchaseOptionDTO) =>
            (searchData.distributor.length==0 || p.distributor?.name.toLocaleLowerCase().includes(searchData.distributor))
            && (searchData.code.length==0 || p.code?.toString().includes(searchData.code))
            && (searchData.name.length==0 || p.name.toLocaleLowerCase().includes(searchData.name))
            && (searchData.product.length==0 || ((p.products?.length??0>0) && p.products!.findIndex(p=>p.name.toLocaleLowerCase().includes(searchData.product))!=-1))
            && (searchData.unit.length==0 || p.unit.short.toLocaleLowerCase().includes(searchData.unit)||p.unit.long.toLocaleLowerCase().includes(searchData.unit))
            && (Number.isNaN(searchData.minNetWeight) || p.net_weight >= searchData.minNetWeight)
            && (Number.isNaN(searchData.maxNetWeight) || p.net_weight <= searchData.maxNetWeight)
            && (Number.isNaN(searchData.minPrice) || p.price >= searchData.minPrice)
            && (Number.isNaN(searchData.maxPrice) || p.price <= searchData.maxPrice)
    }
    
    return {searchData, setSearchData, getPredicate}
}