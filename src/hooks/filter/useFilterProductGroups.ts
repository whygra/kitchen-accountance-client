import { useState } from "react"
import { ProductGroupDTO } from "../../api/productGroups"


export interface SearchParams {
    id: number
    name: string
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
}

export default function useFilterProductGroups() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:ProductGroupDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
    }
    
    return {searchData, setSearchData, getPredicate}
}
