import { useState } from "react"
import { DishTagDTO } from "../../api/nomenclature/dishTags"


export interface SearchParams {
    id: number
    name: string
    minNDishes: number
    maxNDishes: number
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    minNDishes: NaN, 
    maxNDishes: NaN
}

export default function useFilterDishTags() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:DishTagDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            && (searchData.minNDishes || searchData.minNDishes <= (i.dishes?.length??0))
            && (searchData.maxNDishes || searchData.maxNDishes >= (i.dishes?.length??0))
            
    }
    
    return {searchData, setSearchData, getPredicate}
}
