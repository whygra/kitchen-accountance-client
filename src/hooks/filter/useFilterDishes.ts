import { useState } from "react"
import { DishDTO } from "../../api/nomenclature/dishes"
import { getDishProducts } from "../../api/nomenclature/dishes"


export interface SearchParams {
    id: number
    name: string
    minWeight: number
    maxWeight: number
    tags: string[]
    hasAnyProducts: string[]
    excludesProducts: string[]
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    minWeight: NaN, 
    maxWeight: NaN, 
    tags: [],
    hasAnyProducts: [],
    excludesProducts: [],
}

export default function useFilterDishes() {
    const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

    function getPredicate () {

        return (d:DishDTO) => {

            const products = getDishProducts(d)
            
            const dishWeight = d.total_net_weight ?? 0
            return (
                (searchData.name.length==0 || searchData.name.split(' ').every(s=>d.name.toLocaleLowerCase().includes(s)))
                //id
                && (Number.isNaN(searchData.id) || searchData.id == d.id)
                //weight
                && (Number.isNaN(searchData.minWeight) || dishWeight >= searchData.minWeight)
                && (Number.isNaN(searchData.maxWeight) || dishWeight <= searchData.maxWeight)
                // products
                && (searchData.hasAnyProducts.length==0 || searchData.hasAnyProducts.some(s=>products.some(p=>p.name.toLocaleLowerCase().includes(s))))
                && (searchData.excludesProducts.length==0 || !searchData.excludesProducts.some(s=>products.some(p=>(p.name.toLocaleLowerCase().includes(s)))))
                // tags
                && (searchData.tags.length==0 || searchData.tags.some(t=>d.tags?.some(p=>p.name.toLocaleLowerCase() == t.toLocaleLowerCase())))
            )
        }
    }
    
    return {searchData, setSearchData, getPredicate}
}
