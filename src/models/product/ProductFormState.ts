import { DataAction } from ".."
import { ProductDTO } from "../../api/products"
import { v4 as uuid } from "uuid";
import { ProductPurchaseOptionDTO, PurchaseOptionDTO } from "../../api/purchaseOptions";

export interface ProductFormState {
    id: number
    name: string
    categoryDataAction: DataAction
    categoryId: number
    categoryName: string
    groupDataAction: DataAction
    groupId: number
    groupName: string
    purchaseOptionForms: PurchaseOptionFormState[]
}

export function constructProductForm(product?: ProductDTO): ProductFormState{
    return {
        id: product?.id ?? 0,
        categoryDataAction: DataAction.None,
        categoryId: product?.category?.id ?? 0,
        categoryName: '',
        groupDataAction: DataAction.None,
        groupId: product?.category?.id ?? 0,
        groupName: '',
        name: product?.name ?? '',
        purchaseOptionForms: product?.purchase_options?.map(o=>constructProductPurchaseOptionForm(o)) ?? [],
    }
}

export function productFormToDTO (state: ProductFormState) : ProductDTO {
    return {
        id: state.id,
        name: state.name,
        category: {
            name: state.categoryDataAction==DataAction.Create ? state.categoryName : '', 
            id: state.categoryDataAction==DataAction.Create ? 0 : state.categoryId
        },
        group: {
            name: state.groupDataAction==DataAction.Create ? state.groupName : '', 
            id: state.groupDataAction==DataAction.Create ? 0 : state.groupId
        },
        purchase_options: state.purchaseOptionForms
            .map(o=>purchaseOptionFormToDTO(o)),
    }
}

export interface PurchaseOptionFormState {
    key: string;
    id: number;
    productShare: number;
}

export function constructProductPurchaseOptionForm(o?: ProductPurchaseOptionDTO): PurchaseOptionFormState{

    return {
        key: uuid(),
        id: o?.id ?? 0,
        productShare: o?.product_share ?? 100,
    }
}

export function purchaseOptionFormToDTO (state: PurchaseOptionFormState) : ProductPurchaseOptionDTO { 
    return {
        id: state.id,
        product_share: state.productShare,
    }
}