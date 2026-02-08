import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { ProductTagDTO } from "../../api/nomenclature/productTags"
import { ProductDTO } from "../../api/nomenclature/products";

export interface ProductTagFormState {
    id: number
    name: string
    productTagProductForms: ProductTagProductFormState[]
}

export function constructProductTagForm(dto?: ProductTagDTO): ProductTagFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        productTagProductForms: dto?.products?.map(i=>constructProductTagProductForm(i)) ?? [],
    }
}

export function productTagFormToDTO(formState: ProductTagFormState): ProductTagDTO{
    return {
        id: formState.id,
        name: formState.name,
        products: formState.productTagProductForms
            .map(f=>productTagProductToDTO(f)),
    }
}

export interface ProductTagProductFormState {
    key: string
    id: number
}

export function constructProductTagProductForm(dto?: ProductDTO) : ProductTagProductFormState{
    return {
        key: uuid(),
        id: dto?.id ?? 0,
    }
}

export function productTagProductToDTO(formState: ProductTagProductFormState): ProductDTO {
    return {
        id: formState.id,
        name: '',
    }
}
