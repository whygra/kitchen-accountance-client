import { DataAction } from "."
import { DistributorWithPurchaseOptionsDTO } from "../api/distributors"
import { v4 as uuid } from "uuid";
import { DistributorPurchaseOptionDTO } from "../api/purchaseOptions";

export interface DistributorFormState {
    id: number
    name: string
    purchaseOptionForms: PurchaseOptionFormState[]

}

export function constructDistributorForm(distributor?: DistributorWithPurchaseOptionsDTO): DistributorFormState{
    return {
        id: distributor?.id ?? 0,
        name: distributor?.name ?? '',
        purchaseOptionForms: distributor?.purchase_options.map(o=>constructDistributorPurchaseOptionForm(o)) ?? [],
    }
}

export function distributorFormToDTO (state: DistributorFormState) : DistributorWithPurchaseOptionsDTO {
    return {
        id: state.id,
        name: state.name,
        purchase_options: state.purchaseOptionForms
          // исключить данные, помеченные на удаление
          .filter(o=>o.dataAction!=DataAction.Delete)
          .map(o=>purchaseOptionFormToDTO(o)),
    }
}

export interface PurchaseOptionFormState {
    key: string;
    dataAction: DataAction;
    productDataAction: DataAction;
    productId: number;
    productName: string;
    id: number;
    productIsEditable: boolean;
    unitId: number;
    unitShortName: string;
    unitLongName: string;
    unitDataAction: DataAction;
    name: string;
    netWeight: number;
    price: number;

}

export function constructDistributorPurchaseOptionForm(o?: DistributorPurchaseOptionDTO): PurchaseOptionFormState{
    const product = o?.products[0]

    return {
        dataAction: DataAction.None,
        key: uuid(),
        id: o?.id ?? 0,
        productIsEditable: (o?.products.length??0) <= 1,
        productDataAction: DataAction.None,
        productId: product?.id ?? 1,
        productName: product?.name ?? '',
        unitId: o?.unit.id ?? 1,
        unitLongName: o?.unit.long ?? '',
        unitShortName: o?.unit.short ?? '',
        unitDataAction: DataAction.None,
        name: o?.name ?? '',
        netWeight: o?.net_weight ?? 0,
        price: o?.price ?? 0,
    }
}


export function purchaseOptionFormToDTO (state: PurchaseOptionFormState) : DistributorPurchaseOptionDTO { 
    return {
        id: state.dataAction==DataAction.Create ? 0 : state.id,
        products: [{
            id: state.productDataAction==DataAction.Create ? 0 : state.productId,
            category_id: 1,
            name: state.productName,
            product_share: 100,
        }],
        unit: {
            id: state.unitDataAction==DataAction.Create ? 0 : state.unitId,
            long: state.unitLongName,
            short: state.unitShortName,
        },
        name: state.name,
        net_weight: state.netWeight,
        price: state.price,
    }
}