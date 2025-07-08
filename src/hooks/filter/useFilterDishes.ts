import { useState } from "react"
import { DishDTO } from "../../api/nomenclature/dishes"
import { getDishProducts } from "../../api/nomenclature/dishes"


export interface SearchParams {
    id: number
    name: string
    category: string
    group: string
    minWeight: number
    maxWeight: number
    hasAnyProducts: string[]
    excludesProducts: string[]
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    category: '', 
    group: '', 
    minWeight: NaN, 
    maxWeight: NaN, 
    hasAnyProducts: [],
    excludesProducts: [],
}

export default function useFilterDishes() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate () {

        return (i:DishDTO) => {

            const products = getDishProducts(i)
            
            const dishWeight = i.total_net_weight ?? 0
            return (
                (searchData.name.length==0 || searchData.name.split(' ').every(s=>i.name.toLocaleLowerCase().includes(s)))
            && (searchData.category.length==0 || searchData.category.split(' ').every(s=>i.category?.name.toLocaleLowerCase().includes(s)))
            && (searchData.group.length==0 || searchData.group.split(' ').every(s=>i.group?.name.toLocaleLowerCase().includes(s)))
            //id
            && (Number.isNaN(searchData.id) || searchData.id == i.id)
            //weight
            && (Number.isNaN(searchData.minWeight) || dishWeight >= searchData.minWeight)
            && (Number.isNaN(searchData.maxWeight) || dishWeight <= searchData.maxWeight)
            // products
            && (searchData.hasAnyProducts.length==0 || searchData.hasAnyProducts.some(s=>products.some(p=>p.name.toLocaleLowerCase().includes(s))))
            && (searchData.excludesProducts.length==0 || !searchData.excludesProducts.some(s=>products.some(p=>(p.name.toLocaleLowerCase().includes(s)))))
            )
        }
    }
    
    return {searchData, setSearchData, getPredicate}
}
