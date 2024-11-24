import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { ProjectDTO } from "../../api/projects"


export interface SearchParams {
    id: number
    name: string
    role: string
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    role: '', 
}

export default function useFilterProducts() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:ProjectDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            && (searchData.role.length==0 || searchData.name.split(' ').every(s=>i.role?.name.toLocaleLowerCase().includes(s)))
    }
    
    return {searchData, setSearchData, getPredicate}
}
