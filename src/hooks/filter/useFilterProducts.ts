import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/nomenclature/purchaseOptions"
import { ProductDTO } from "../../api/nomenclature/products"


export interface SearchParams {
  id: number
  name: string
  amountFrom: number,
  amountTo: number,
  tags: string[]
}

export const EMPTY_SEARCH_PARAMS: SearchParams = {
  id: NaN,
  name: '',
  amountFrom: NaN,
  amountTo: NaN,
  tags: [],
}

export default function useFilterProducts() {
  const [searchData, setSearchData] = useState(EMPTY_SEARCH_PARAMS)

  function getPredicate() {
    return (i: ProductDTO) =>
      (Number.isNaN(searchData.id) || i.id == searchData.id)
      && (searchData.name.length == 0 || searchData.name.split(' ').every(s => i.name.toLocaleLowerCase().includes(s)))
      && (Number.isNaN(searchData.amountFrom) || searchData.amountFrom <= (i.amount ?? 0))
      && (Number.isNaN(searchData.amountTo) || searchData.amountTo >= (i.amount ?? 0))
      // tags
      && (searchData.tags.length == 0 || searchData.tags.some(t => i.tags?.some(p => p.name.toLocaleLowerCase() == t.toLocaleLowerCase())))
  }

  return { searchData, setSearchData, getPredicate }
}
