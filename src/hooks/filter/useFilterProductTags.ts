import { useState } from "react"
import { ProductTagDTO } from "../../api/nomenclature/productTags"


export interface SearchParams {
    id: number
    name: string
    minNProducts: number
    maxNProducts: number
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    minNProducts: NaN,
    maxNProducts: NaN,
}

export default function useFilterProductTags() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:ProductTagDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            && (searchData.minNProducts || searchData.minNProducts <= (i.products?.length??0))
            && (searchData.maxNProducts || searchData.maxNProducts >= (i.products?.length??0))
    }
    
    return {searchData, setSearchData, getPredicate}
}
