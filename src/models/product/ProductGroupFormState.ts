import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { ProductGroupDTO } from "../../api/productGroups"
import { ProductDTO } from "../../api/products";

export interface ProductGroupFormState {
    id: number
    name: string
    productGroupProductForms: ProductGroupProductFormState[]
}

export function constructProductGroupForm(dto?: ProductGroupDTO): ProductGroupFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        productGroupProductForms: dto?.products?.map(i=>constructProductGroupProductForm(i)) ?? [],
    }
}

export function productGroupFormToDTO(formState: ProductGroupFormState): ProductGroupDTO{
    return {
        id: formState.id,
        name: formState.name,
        products: formState.productGroupProductForms
            .map(f=>productGroupProductToDTO(f)),
    }
}

export interface ProductGroupProductFormState {
    key: string
    id: number
}

export function constructProductGroupProductForm(dto?: ProductDTO) : ProductGroupProductFormState{
    return {
        key: uuid(),
        id: dto?.id ?? 0,
    }
}

export function productGroupProductToDTO(formState: ProductGroupProductFormState): ProductDTO {
    return {
        id: formState.id,
        name: '',
    }
}
