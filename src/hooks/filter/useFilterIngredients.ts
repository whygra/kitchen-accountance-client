import { useState } from "react"
import { IngredientDTO } from "../../api/nomenclature/ingredients"


export interface SearchParams {
    id: number
    name: string
    category: string    
    tags: string[]
    type: string
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    category: '', 
    tags: [], 
    type: '', 
}

export default function useFilterIngredients() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:IngredientDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            && (searchData.type=='' || i.type?.name.toLocaleLowerCase() == searchData.type.toLocaleLowerCase())
            
            // tags
            && (searchData.tags.length==0 || searchData.tags.some(t=>i.tags?.some(p=>p.name.toLocaleLowerCase() == t.toLocaleLowerCase())))
    }
    
    return {searchData, setSearchData, getPredicate}
}
