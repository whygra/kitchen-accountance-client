import { useState } from "react"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { getDishProducts } from "../../api/dishes"


export interface SearchParams {
    id: number
    name: string
    category: string
    minWeight: number
    maxWeight: number
    hasAnyProducts: string[]
    excludesProducts: string[]
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
    id: NaN,
    name: '', 
    category: '', 
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
            let hasAnyProducts = false
            for(const product of searchData.hasAnyProducts.filter(p=>p!=''&&p!=' ')){
                if (products.find(p=>p.name.toLocaleLowerCase().includes(product.toLocaleLowerCase()))!=undefined){
                    hasAnyProducts = true
                    break
                }
            }

            let excludesProducts = true
            for(const product of searchData.excludesProducts.filter(p=>p!=''&&p!=' ')){
                if (products.find(p=>p.name.toLocaleLowerCase().includes(product.toLocaleLowerCase()))!=undefined){
                    excludesProducts = false
                    break
                }
            }
            
            const dishWeight = calcDishWeight(i)
            return (searchData.name.length==0 || i.name.toLocaleLowerCase().includes(searchData.name))
            && (searchData.category.length==0 || i.category?.name.toLocaleLowerCase().includes(searchData.category))
            //id
            && (Number.isNaN(searchData.id) || searchData.id == i.id)
            //weight
            && (Number.isNaN(searchData.minWeight) || dishWeight >= searchData.minWeight)
            && (Number.isNaN(searchData.maxWeight) || dishWeight <= searchData.maxWeight)
            // products
            && (searchData.hasAnyProducts.length==0 || hasAnyProducts)
            && (searchData.excludesProducts.length==0 || excludesProducts)
        }
    }
    
    return {searchData, setSearchData, getPredicate}
}
