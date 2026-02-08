import { DataAction } from ".."
import { ProductDTO } from "../../api/nomenclature/products"
import { v4 as uuid } from "uuid";
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions";
import { UnitDTO } from "../../api/nomenclature/units";
import { ProductTagDTO } from "../../api/nomenclature/productTags";

export interface ProductFormState {
    id: number
    name: string
    tags: ProductTagDTO[]
    purchaseOptionForms: PurchaseOptionFormState[]
}

export function constructProductForm(product?: ProductDTO): ProductFormState{
    return {
        id: product?.id ?? 0,
        name: product?.name ?? '',
        tags: product?.tags ?? [],
        purchaseOptionForms: product?.purchase_options?.map(o=>constructProductPurchaseOptionForm(o)) ?? [],
    }
}

export function productFormToDTO (state: ProductFormState) : ProductDTO {
    return {
        id: state.id,
        name: state.name,
        tags: state.tags,
        purchase_options: state.purchaseOptionForms
            .map(o=>purchaseOptionFormToDTO(o)),
    }
}

export interface PurchaseOptionFormState {
    key: string;
    id: number;
    unitId: number
    name: string
    netWeight: number
    price: number
}

export function constructProductPurchaseOptionForm(o?: PurchaseOptionDTO): PurchaseOptionFormState{

    return {
        key: uuid(),
        id: o?.id ?? 0,
        unitId: o?.unit?.id ?? 0,
        name: o?.name ?? '',
        netWeight: o?.net_weight ?? 0,
        price: o?.price ?? 0,
    }
}

export function purchaseOptionFormToDTO (state: PurchaseOptionFormState) : PurchaseOptionDTO { 
    return {
        id: state.id,
        unit: {id: state.unitId, long: '', short: ''},
        name: state.name,
        net_weight: state.netWeight,
        price: state.price,
    }
}

export interface ProductTagFormState {
    key: string;
    dataAction: DataAction;
    id: number;
    name: string;
}

export function constructProductTagForm(o?: ProductTagDTO): ProductTagFormState{

    return {
        key: uuid(),
        dataAction: DataAction.None,
        id: o?.id ?? 0,
        name: o?.name ?? '',
    }
}

export function productTagToDTO (state: ProductTagFormState) : ProductTagDTO { 
    return {
        id: state.dataAction == DataAction.Create ? 0 : state.id,
        name: state.name,
    }
}