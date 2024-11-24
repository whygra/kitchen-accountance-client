import { v4 as uuid } from "uuid";
import { DataAction } from ".."
import { ProductCategoryDTO } from "../../api/productCategories"
import { ProductDTO } from "../../api/products";

export interface ProductCategoryFormState {
    id: number
    name: string
    productCategoryProductForms: ProductCategoryProductFormState[]
}

export function constructProductCategoryForm(dto?: ProductCategoryDTO): ProductCategoryFormState{
    return {
        id: dto?.id ?? 0,
        name: dto?.name ?? '',
        productCategoryProductForms: dto?.products?.map(i=>constructProductCategoryProductForm(i)) ?? [],
    }
}

export function productCategoryFormToDTO(formState: ProductCategoryFormState): ProductCategoryDTO{
    return {
        id: formState.id,
        name: formState.name,
        products: formState.productCategoryProductForms
            .map(f=>productCategoryProductToDTO(f)),

    }
}

export interface ProductCategoryProductFormState {
    key: string
    id: number
}

export function constructProductCategoryProductForm(dto?: ProductDTO) : ProductCategoryProductFormState{
    return {
        key: uuid(),
        id: dto?.id ?? 0,
    }
}

export function productCategoryProductToDTO(formState: ProductCategoryProductFormState): ProductDTO {
    return {
        id: formState.id,
        name: '',
    }
}
