import { useState } from "react"
import { IngredientDTO } from "../../api/nomenclature/ingredients"


export interface SearchParams {
    id: number
    name: string
    category: string    
    group: string    
    type: string
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    category: '', 
    group: '', 
    type: '', 
}

export default function useFilterIngredients() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:IngredientDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.category.length==0 || searchData.category.split(' ').every(s=>i.category?.name.toLocaleLowerCase().includes(s)))
            && (searchData.group.length==0 || searchData.group.split(' ').every(s=>i.group?.name.toLocaleLowerCase().includes(s)))
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            && (searchData.type=='' || i.type?.name.toLocaleLowerCase() == searchData.type.toLocaleLowerCase())
    }
    
    return {searchData, setSearchData, getPredicate}
}
