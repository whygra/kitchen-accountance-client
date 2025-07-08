import { useState } from "react"
import { SaleActDTO } from "../../api/storage/saleActs"
import { IGetComparer } from "./useSort"


export enum SaleActField {
    None = 'SaleActNone',
    Id = 'SaleActId',
    Date = 'SaleActDate',
    AmtItems = 'SaleActNItems',
    TotalCost = 'SaleActTotalCost',
}

export class SaleActComparers extends IGetComparer<SaleActField, SaleActDTO> {
    // id
    static readonly IdAsc = (o1:SaleActDTO, o2:SaleActDTO)=>
        o1.id - o2.id
    static readonly IdDesc = (o1:SaleActDTO, o2:SaleActDTO)=>
        o2.id - o1.id

    // дата
    static readonly DateAsc = (o1:SaleActDTO, o2:SaleActDTO)=>
        (Date.parse(o1.date) - Date.parse(o2.date))
    static readonly DateDesc = (o1:SaleActDTO, o2:SaleActDTO)=>
        (Date.parse(o2.date) - Date.parse(o1.date))

    // количество продуктов
    static readonly AmtItemsAsc = (o1:SaleActDTO, o2:SaleActDTO)=>
        (o1.items?.length ?? 0) - (o2.items?.length ?? 0)
    static readonly AmtItemsDesc = (o1:SaleActDTO, o2:SaleActDTO)=>
        (o2.items?.length ?? 0) - (o1.items?.length ?? 0)
    
    // количество продуктов
    static readonly TotalCostAsc = (o1:SaleActDTO, o2:SaleActDTO)=>
        (o1.items?.reduce((total, i)=>total+(i.price??0)*(i.amount??0), 0) ?? 0) - (o2.items?.reduce((total, i)=>total+(i.price??0)*(i.amount??0), 0) ?? 0)
    static readonly TotalCostDesc = (o1:SaleActDTO, o2:SaleActDTO)=>
        (o2.items?.reduce((total, i)=>total+(i.price??0)*(i.amount??0), 0) ?? 0) - (o1.items?.reduce((total, i)=>total+(i.price??0)*(i.amount??0), 0) ?? 0)
    
    // функция получения компаратора
    static readonly getComparer = (field: SaleActField, isDesc: boolean) => {
        switch (field) {
            case SaleActField.Id:
                return isDesc ?SaleActComparers.IdDesc :SaleActComparers.IdAsc
            case SaleActField.Date:
                return isDesc ?SaleActComparers.DateDesc :SaleActComparers.DateAsc
            case SaleActField.AmtItems:
                return isDesc ?SaleActComparers.AmtItemsDesc :SaleActComparers.AmtItemsAsc
            case SaleActField.TotalCost:
                return isDesc ?SaleActComparers.TotalCostDesc :SaleActComparers.TotalCostAsc
            default:
                return (o1:SaleActDTO,o2:SaleActDTO)=>0
        }
    }

    getComparer = SaleActComparers.getComparer
}

export default function useSortSaleActs() {
    const [sortField, setSortField] = useState<SaleActField>(SaleActField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: SaleActField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(SaleActField.None)
    }

    function getComparer() {
        return SaleActComparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}