import { DataAction } from "."
import { ProductDTO } from "../api/nomenclature/products"
import { v4 as uuid } from "uuid";
import { PurchaseOptionDTO } from "../api/nomenclature/purchaseOptions";
import { DistributorDTO } from "../api/nomenclature/distributors";


export interface PurchaseOptionFormState {
    id: number;
    isRelevant: boolean 
    name: string 
    code?: string
    price: number
    distributorId: number
    unitAction: DataAction
    unitId: number
    unitShort: string
    unitLong: string
    productAction: DataAction
    productId: number
    productName: string
    netWeight: number
}

export function constructPurchaseOptionForm(o?: PurchaseOptionDTO): PurchaseOptionFormState{
    
    return {
        id: o?.id ?? 0,
        isRelevant: o?.is_relevant ?? true,
        name: o?.name ?? '',
        code: o?.code,
        price: o?.price ?? 0,
        distributorId: o?.distributor?.id ?? 0,
        unitAction: DataAction.None,
        unitId: o?.unit?.id ?? 0,
        unitShort: o?.unit?.short ?? '',
        unitLong: o?.unit?.long ?? '',
        productAction: DataAction.None,
        productId: o?.product?.id ?? 0,
        productName: o?.product?.name ?? '',
        netWeight: o?.net_weight ?? 1000,
    }
}

export function purchaseOptionFormToDTO (state: PurchaseOptionFormState) : PurchaseOptionDTO { 
    return {
        id: state.id,
        is_relevant: state.isRelevant,
        name: state.name,
        code: state.code,
        price: state.price,
        distributor: {id:state.distributorId, name:''},
        unit: {id:state.unitAction==DataAction.Create?0:state.unitId, long:state.unitLong, short:state.unitShort},
        product: {id:state.productAction==DataAction.Create?0:state.productId, name:state.productName},
        net_weight: state.netWeight,
    }
}

export interface ProductFormState {
    key: string
    dataAction: DataAction
    id: number
    name: string
}

export function constructProductForm(product?: ProductDTO): ProductFormState {
    return {
        key: uuid(),
        dataAction: DataAction.None,
        id: product?.id ?? 0,
        name: product?.name ?? '',
    }
}

export function productFormToDTO (state: ProductFormState) : ProductDTO {
    return {
        id: state.dataAction==DataAction.Create ? 0 : state.id,
        name: state.name,
    }
}