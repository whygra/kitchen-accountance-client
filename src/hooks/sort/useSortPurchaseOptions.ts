import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions"


export enum PurchaseOptionField {
    None = 'PurchaseOptionNone',
    Distributor = 'PurchaseOptionDistributor',
    Code = 'PurchaseOptionCode',
    Name = 'PurchaseOptionName',
    Unit = 'PurchaseOptionUnit',
    Product = 'PurchaseOptionProduct',
    NetWeight = 'PurchaseOptionNetWeight',
    Price = 'PurchaseOptionPrice'
}

class Comparers {
    // Поставщик
    static readonly DistributorAsc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o1.distributor&&o2.distributor ?o1.distributor.name.localeCompare(o2.distributor.name) :0
    static readonly DistributorDesc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o1.distributor&&o2.distributor ?o2.distributor.name.localeCompare(o1.distributor.name) :0
    
    // Код
    static readonly CodeAsc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        (o1.code ?? '').localeCompare(o2.code ?? '')
    static readonly CodeDesc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        (o2.code ?? '').localeCompare(o1.code ?? '')
    
    // Наименование
    static readonly NameAsc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o1.name.localeCompare(o2.name)
    static readonly NameDesc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o2.name.localeCompare(o1.name)

    // Ед. изм
    static readonly UnitAsc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        (o1.unit?.short ?? '').localeCompare(o2.unit?.short ?? '')
    static readonly UnitDesc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        (o2.unit?.short ?? '').localeCompare(o1.unit?.short ?? '')

    // Масса нетто
    static readonly NetWeightAsc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o1.net_weight - o2.net_weight
    static readonly NetWeightDesc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o2.net_weight - o1.net_weight
    
    // Цена
    static readonly PriceAsc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o1.price - o2.price
    static readonly PriceDesc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        o2.price - o1.price

    // Продукт
    static readonly ProductAsc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        (o1.products&&o1.products.length>0&&o2.products&&o2.products.length>0)
            ? o1.products[0].name.localeCompare(o2.products[0].name)
            // элементы без продуктов - в конец
            :!(o1.products&&o1.products.length>0)
                ?!(o2.products&&o2.products.length>0) 
                    ? 0 : 1
                : -1
    static readonly ProductDesc = (o1:PurchaseOptionDTO, o2:PurchaseOptionDTO)=>
        (o2.products&&o2.products.length>0&&o1.products&&o1.products.length>0)
            ? o2.products[0].name.localeCompare(o1.products[0].name)
            // элементы без продуктов - в конец
            :!(o2.products&&o2.products.length>0)
                ?!(o1.products&&o1.products.length>0) 
                    ? 0 : 1
                : -1
    // функция получения компаратора
    static readonly getComparer = (field: PurchaseOptionField, isDesc: boolean) => {
        switch (field) {
            case PurchaseOptionField.Distributor:
                return isDesc ?Comparers.DistributorDesc :Comparers.DistributorAsc
            case PurchaseOptionField.Code:
                return isDesc ?Comparers.CodeDesc :Comparers.CodeAsc
            case PurchaseOptionField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            case PurchaseOptionField.Unit:
                return isDesc ?Comparers.UnitDesc :Comparers.UnitAsc
            case PurchaseOptionField.NetWeight:
                return isDesc ?Comparers.NetWeightDesc :Comparers.NetWeightAsc
            case PurchaseOptionField.Price:
                return isDesc ?Comparers.PriceDesc :Comparers.PriceAsc
            case PurchaseOptionField.Product:
                return isDesc ?Comparers.ProductDesc :Comparers.ProductAsc
            default:
                return (o1:PurchaseOptionDTO,o2:PurchaseOptionDTO)=>0
        }
    }
}

export default function useSortPurchaseOptions() {
    const [sortField, setSortField] = useState<PurchaseOptionField>(PurchaseOptionField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: PurchaseOptionField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(PurchaseOptionField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}