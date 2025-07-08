import { useState } from "react"
import { InventoryActDTO } from "../../api/storage/inventoryActs"
import { IGetComparer } from "./useSort"


export enum InventoryActField {
    None = 'InventoryActNone',
    Date = 'InventoryActDate',
    Id = 'InventoryActId',
    NProducts = 'InventoryActNProducts',
    NIngredients = 'InventoryActNIngredients',
}

export class InventoryActComparers extends IGetComparer<InventoryActField, InventoryActDTO> {
    // id
    static readonly IdAsc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        o1.id - o2.id
    static readonly IdDesc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        o2.id - o1.id

    // дата
    static readonly DateAsc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        (Date.parse(o1.date) - Date.parse(o2.date))
    static readonly DateDesc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        (Date.parse(o2.date) - Date.parse(o1.date))
    
    // количество продуктов
    static readonly NProductsAsc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        (o1.products?.length ?? 0) - (o2.products?.length ?? 0)
    static readonly NProductsDesc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        (o2.products?.length ?? 0) - (o1.products?.length ?? 0)
    
    // количество продуктов
    static readonly NIngredientsAsc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        (o1.ingredients?.length ?? 0) - (o2.ingredients?.length ?? 0)
    static readonly NIngredientsDesc = (o1:InventoryActDTO, o2:InventoryActDTO)=>
        (o2.ingredients?.length ?? 0) - (o1.ingredients?.length ?? 0)
    
    // функция получения компаратора
    static readonly getComparer = (field: InventoryActField, isDesc: boolean) => {
        switch (field) {
            case InventoryActField.Id:
                return isDesc ?InventoryActComparers.IdDesc :InventoryActComparers.IdAsc
            case InventoryActField.Date:
                return isDesc ?InventoryActComparers.DateDesc :InventoryActComparers.DateAsc
            case InventoryActField.NProducts:
                return isDesc ?InventoryActComparers.NProductsDesc :InventoryActComparers.NProductsAsc
            case InventoryActField.NIngredients:
                return isDesc ?InventoryActComparers.NIngredientsDesc :InventoryActComparers.NIngredientsAsc
            default:
                return (o1:InventoryActDTO,o2:InventoryActDTO)=>0
        }
    }

    getComparer = InventoryActComparers.getComparer
}

export default function useSortInventoryActs() {
    const [sortField, setSortField] = useState<InventoryActField>(InventoryActField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: InventoryActField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(InventoryActField.None)
    }

    function getComparer() {
        return InventoryActComparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}