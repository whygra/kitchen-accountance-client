import { useState } from "react"
import { IngredientTagDTO } from "../../api/nomenclature/ingredientTags"


export interface SearchParams {
    id: number
    name: string
    minNIngredients: number
    maxNIngredients: number
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    minNIngredients: NaN,
    maxNIngredients: NaN
}

export default function useFilterIngredientTags() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:IngredientTagDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            && (searchData.minNIngredients || searchData.minNIngredients <= (i.ingredients?.length??0))
            && (searchData.maxNIngredients || searchData.maxNIngredients >= (i.ingredients?.length??0))
    }
    
    return {searchData, setSearchData, getPredicate}
}
