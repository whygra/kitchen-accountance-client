import { DataAction } from "."
import { DistributorDTO } from "../api/distributors"
import { v4 as uuid } from "uuid";
import { DistributorPurchaseOptionDTO } from "../api/purchaseOptions";

export interface DistributorFormState {
    id: number
    name: string
    purchaseOptionForms: PurchaseOptionFormState[]

}

export function constructDistributorForm(distributor?: DistributorDTO): DistributorFormState{
    return {
        id: distributor?.id ?? 0,
        name: distributor?.name ?? '',
        purchaseOptionForms: distributor?.purchase_options?.map(o=>constructDistributorPurchaseOptionForm(o)) ?? [],
    }
}

export function distributorFormToDTO (state: DistributorFormState, initDTO?: DistributorDTO) : DistributorDTO {
    const dto = {
        id: state.id,
        name: state.name,
        purchase_options: state.purchaseOptionForms
          .map(o=>purchaseOptionFormToDTO(o)),
    }

    if(initDTO == undefined)
        return dto

    return getDistributorDiffDTO(initDTO, dto)
}

function getDistributorDiffDTO(initDTO: DistributorDTO, dto: DistributorDTO) : DistributorDTO {
    // отобрать измененные и новые позиции закупки
    const purchase_options = dto.purchase_options?.filter(
        po=>initDTO.purchase_options?.find(i=>
            i.code==po.code
            &&i.name==po.name
            &&i.unit?.id==po.unit?.id
            &&i.net_weight==po.net_weight
            &&i.price==po.price
            &&(i.products??[]).find(n=>true)?.id == (po.products??[]).find(n=>true)?.id
        ) == undefined
    ) ?? []
    const purchase_options_to_delete = initDTO.purchase_options?.filter(
        po=>dto.purchase_options?.find(i=>i.id==po.id)==undefined
    )

    return {
        ...dto,
        purchase_options,
        purchase_options_to_delete,
    }
}

export interface PurchaseOptionFormState {
    key: string;
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
    code?: string;
    netWeight: number;
    price: number;

}

export function constructDistributorPurchaseOptionForm(o?: DistributorPurchaseOptionDTO): PurchaseOptionFormState{
    const product = o?.products[0]

    return {
        key: uuid(),
        id: o?.id ?? 0,
        productIsEditable: (o?.products.length??0) <= 1,
        productDataAction: DataAction.None,
        productId: product?.id ?? 0,
        productName: product?.name ?? '',
        unitId: o?.unit?.id ?? 1,
        unitLongName: o?.unit?.long ?? '',
        unitShortName: o?.unit?.short ?? '',
        unitDataAction: DataAction.None,
        name: o?.name ?? '',
        code: o?.code,
        netWeight: o?.net_weight ?? 0,
        price: o?.price ?? 0,
    }
}


export function purchaseOptionFormToDTO (state: PurchaseOptionFormState) : DistributorPurchaseOptionDTO { 
    return {
        id: state.id,
        products: (state.productDataAction!=DataAction.Create && state.productId==0) ? [] : [{
            id: state.productDataAction==DataAction.Create ? 0 : state.productId,
            name: state.productName,
            product_share: 100,
        }],
        unit: {
            id: state.unitDataAction==DataAction.Create ? 0 : state.unitId,
            long: state.unitLongName,
            short: state.unitShortName,
        },
        code: state.code,
        name: state.name,
        net_weight: state.netWeight,
        price: state.price,
    }
}


export function isInvalid(o: PurchaseOptionFormState): boolean{
    return o.name == '' 
        || o.netWeight < 1 || isNaN(o.netWeight)
        || o.price < 0 || isNaN(o.price)
        || (o.productDataAction==DataAction.Create && o.productName=='')
        || (o.unitDataAction==DataAction.Create && (o.unitLongName==''||o.unitShortName==''))
  }