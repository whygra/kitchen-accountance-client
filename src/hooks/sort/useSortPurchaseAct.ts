import { useState } from "react"
import { PurchaseActDTO } from "../../api/storage/purchaseActs"
import { IGetComparer } from "./useSort"


export enum PurchaseActField {
    None = 'PurchaseActNone',
    Id = 'PurchaseActId',
    Date = 'PurchaseActDate',
    NItems = 'PurchaseActNItems',
    Distributor = 'PurchaseActDistributor',
    TotalCost = 'PurchaseActTotalCost',
}

export class PurchaseActComparers extends IGetComparer<PurchaseActField, PurchaseActDTO> {
    // id
    static readonly IdAsc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        o1.id - o2.id
    static readonly IdDesc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        o2.id - o1.id

    // дата
    static readonly DateAsc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (Date.parse(o1.date) - Date.parse(o2.date))
    static readonly DateDesc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (Date.parse(o2.date) - Date.parse(o1.date))

    // поставщик
    static readonly DistributorAsc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (o1.distributor?.name ?? '').localeCompare(o2.distributor?.name ?? '')
    static readonly DistributorDesc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (o2.distributor?.name ?? '').localeCompare(o1.distributor?.name ?? '')
    
    // количество продуктов
    static readonly NItemsAsc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (o1.items?.length ?? 0) - (o2.items?.length ?? 0)
    static readonly NItemsDesc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (o2.items?.length ?? 0) - (o1.items?.length ?? 0)
    
    // количество продуктов
    static readonly TotalCostAsc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (o1.items?.reduce((total, i)=>total+i.price*(i.amount??0), 0) ?? 0) - (o2.items?.reduce((total, i)=>total+i.price*(i.amount??0), 0) ?? 0)
    static readonly TotalCostDesc = (o1:PurchaseActDTO, o2:PurchaseActDTO)=>
        (o2.items?.reduce((total, i)=>total+i.price*(i.amount??0), 0) ?? 0) - (o1.items?.reduce((total, i)=>total+i.price*(i.amount??0), 0) ?? 0)
    
    // функция получения компаратора
    static readonly getComparer = (field: PurchaseActField, isDesc: boolean) => {
        switch (field) {
            case PurchaseActField.Id:
                return isDesc ?PurchaseActComparers.IdDesc :PurchaseActComparers.IdAsc
            case PurchaseActField.Date:
                return isDesc ?PurchaseActComparers.DateDesc :PurchaseActComparers.DateAsc
            case PurchaseActField.NItems:
                return isDesc ?PurchaseActComparers.NItemsDesc :PurchaseActComparers.NItemsAsc
            case PurchaseActField.TotalCost:
                return isDesc ?PurchaseActComparers.TotalCostDesc :PurchaseActComparers.TotalCostAsc
            case PurchaseActField.Distributor:
                return isDesc ?PurchaseActComparers.DistributorDesc :PurchaseActComparers.DistributorAsc
            default:
                return (o1:PurchaseActDTO,o2:PurchaseActDTO)=>0
        }
    }

    getComparer = PurchaseActComparers.getComparer
}

export default function useSortPurchaseActs() {
    const [sortField, setSortField] = useState<PurchaseActField>(PurchaseActField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: PurchaseActField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(PurchaseActField.None)
    }

    function getComparer() {
        return PurchaseActComparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}