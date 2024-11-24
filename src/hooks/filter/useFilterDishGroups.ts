import { useState } from "react"
import { DishGroupDTO } from "../../api/dishGroups"


export interface SearchParams {
    id: number
    name: string
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
}

export default function useFilterDishGroups() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:DishGroupDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
    }
    
    return {searchData, setSearchData, getPredicate}
}
