import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { IngredientDTO } from "../../api/ingredients"


export interface SearchParams {
    id: number
    name: string
    category: string    
    typeId: number
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    category: '', 
    typeId: NaN, 
}

export default function useFilterIngredients() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate() {
        return (i:IngredientDTO) =>
            (Number.isNaN(searchData.id) || i.id == searchData.id)
            && (searchData.category.length==0 || i.category?.name.toLocaleLowerCase().includes(searchData.category))
            && (searchData.name.length==0 || i.name.toLocaleLowerCase().includes(searchData.name))
            && (Number.isNaN(searchData.typeId) || i.type.id == searchData.typeId)
    }
    
    return {searchData, setSearchData, getPredicate}
}
