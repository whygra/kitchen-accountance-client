import { DataAction } from "."
import { ProductDTO } from "../api/nomenclature/products"
import { v4 as uuid } from "uuid";
import { PurchaseOptionDTO } from "../api/nomenclature/purchaseOptions";
import { DistributorDTO } from "../api/nomenclature/distributors";


export interface PurchaseOptionFormState {
    id: number;
    name: string 
    code?: string
    price: number
    distributorId: number
    unitAction: DataAction
    unitId: number
    unitShort: string
    unitLong: string
    netWeight: number
    productForms: ProductFormState[]
}

export function constructPurchaseOptionForm(o?: PurchaseOptionDTO): PurchaseOptionFormState{
    
    return {
        id: o?.id ?? 0,
        name: o?.name ?? '',
        code: o?.code,
        price: o?.price ?? 0,
        distributorId: o?.distributor?.id ?? 0,
        unitAction: DataAction.None,
        unitId: o?.unit?.id ?? 0,
        unitShort: o?.unit?.short ?? '',
        unitLong: o?.unit?.long ?? '',
        netWeight: o?.net_weight ?? 1000,
        productForms: o?.products?.map(p=>constructProductForm(p)) ?? []
    }
}

export function purchaseOptionFormToDTO (state: PurchaseOptionFormState) : PurchaseOptionDTO { 
    return {
        id: state.id,
        name: state.name,
        code: state.code,
        price: state.price,
        distributor: {id:state.distributorId, name:''},
        unit: {id:state.unitAction==DataAction.Create?0:state.unitId, long:state.unitLong, short:state.unitShort},
        net_weight: state.netWeight,
        products: state.productForms
            .map(p=>productFormToDTO(p))
    }
}

export interface ProductFormState {
    key: string
    dataAction: DataAction
    id: number
    name: string
    productShare: number
}

export function constructProductForm(product?: ProductDTO): ProductFormState {
    return {
        key: uuid(),
        dataAction: DataAction.None,
        id: product?.id ?? 0,
        name: product?.name ?? '',
        productShare: product?.product_share ?? 100,
    }
}

export function productFormToDTO (state: ProductFormState) : ProductDTO {
    return {
        id: state.dataAction==DataAction.Create ? 0 : state.id,
        name: state.name,
        product_share: state.productShare
    }
}