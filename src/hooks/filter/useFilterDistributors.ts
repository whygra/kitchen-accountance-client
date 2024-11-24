import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { DistributorDTO } from "../../api/distributors"

export interface SearchParams {
    id: number
    name: string
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
}

export default function useFilterDistributors() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate () {
        return (i:DistributorDTO) => {
            return (
            (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            //id
            && (Number.isNaN(searchData.id) || searchData.id == i.id)
            )
        }
    }
    
    return {searchData, setSearchData, getPredicate}
}
