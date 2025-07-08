import { useState } from "react"
import { WriteOffActDTO } from "../../api/storage/writeOffActs"
import { IGetComparer } from "./useSort"


export enum WriteOffActField {
    None = 'WriteOffActNone',
    Date = 'WriteOffActDate',
    Id = 'WriteOffActId',
    NProducts = 'WriteOffActNProducts',
    NIngredients = 'WriteOffActNIngredients',
}

export class WriteOffActComparers extends IGetComparer<WriteOffActField, WriteOffActDTO> {
    // дата
    static readonly DateAsc = (o1:WriteOffActDTO, o2:WriteOffActDTO)=>
        (Date.parse(o1.date) - Date.parse(o2.date))
    static readonly DateDesc = (o1:WriteOffActDTO, o2:WriteOffActDTO)=>
        (Date.parse(o2.date) - Date.parse(o1.date))
    
    // количество продуктов
    static readonly NProductsAsc = (o1:WriteOffActDTO, o2:WriteOffActDTO)=>
        (o1.products?.length ?? 0) - (o2.products?.length ?? 0)
    static readonly NProductsDesc = (o1:WriteOffActDTO, o2:WriteOffActDTO)=>
        (o2.products?.length ?? 0) - (o1.products?.length ?? 0)
    
    // количество продуктов
    static readonly NIngredientsAsc = (o1:WriteOffActDTO, o2:WriteOffActDTO)=>
        (o1.ingredients?.length ?? 0) - (o2.ingredients?.length ?? 0)
    static readonly NIngredientsDesc = (o1:WriteOffActDTO, o2:WriteOffActDTO)=>
        (o2.ingredients?.length ?? 0) - (o1.ingredients?.length ?? 0)
    
    // функция получения компаратора
    static readonly getComparer = (field: WriteOffActField, isDesc: boolean) => {
        switch (field) {
            case WriteOffActField.Date:
                return isDesc ?WriteOffActComparers.DateDesc :WriteOffActComparers.DateAsc
            case WriteOffActField.NProducts:
                return isDesc ?WriteOffActComparers.NProductsDesc :WriteOffActComparers.NProductsAsc
            case WriteOffActField.NIngredients:
                return isDesc ?WriteOffActComparers.NIngredientsDesc :WriteOffActComparers.NIngredientsAsc
            default:
                return (o1:WriteOffActDTO,o2:WriteOffActDTO)=>0
        }
    }

    getComparer = WriteOffActComparers.getComparer
}

export default function useSortWriteOffActs() {
    const [sortField, setSortField] = useState<WriteOffActField>(WriteOffActField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: WriteOffActField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(WriteOffActField.None)
    }

    function getComparer() {
        return WriteOffActComparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}