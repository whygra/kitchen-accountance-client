import { useState } from "react"
import { ProductDTO } from "../../api/nomenclature/products"

export enum ProductField {
  None = 'ProductNone',
  Id = 'ProductId',
  Tags = 'ProductTags',
  Name = 'ProductName',
  Amount = 'ProductWeight',
}

class Comparers {
  // id
  static readonly IdAsc = (i1: ProductDTO, i2: ProductDTO) =>
    i1.id - i2.id
  static readonly IdDesc = (i1: ProductDTO, i2: ProductDTO) =>
    i2.id - i1.id

  // Наименование
  static readonly NameAsc = (i1: ProductDTO, i2: ProductDTO) =>
    i1.name.localeCompare(i2.name)
  static readonly NameDesc = (i1: ProductDTO, i2: ProductDTO) =>
    i2.name.localeCompare(i1.name)

  // Количество
  static readonly AmountAsc = (i1: ProductDTO, i2: ProductDTO) =>
    (i1.amount ?? 0) - (i2.amount ?? 0)
  static readonly AmountDesc = (i1: ProductDTO, i2: ProductDTO) =>
    (i2.amount ?? 0) - (i1.amount ?? 0)

  // функция получения компаратора
  static readonly getComparer = (field: ProductField, isDesc: boolean) => {
    switch (field) {
      case ProductField.Id:
        return isDesc ? Comparers.IdDesc : Comparers.IdAsc
      case ProductField.Name:
        return isDesc ? Comparers.NameDesc : Comparers.NameAsc
      case ProductField.Amount:
        return isDesc ? Comparers.AmountDesc : Comparers.AmountAsc
      default:
        return (i1: ProductDTO, i2: ProductDTO) => 0
    }
  }
}

export default function useSortProducts() {
  const [sortField, setSortField] = useState(ProductField.None)
  const [sortIsDesc, setSortIsDesc] = useState(false)

  //сортировка
  function toggleSort(field: ProductField) {
    if (sortField != field) {
      setSortField(field)
      setSortIsDesc(false)
    }
    else if (!sortIsDesc)
      setSortIsDesc(true)
    else
      setSortField(ProductField.None)
  }

  function getComparer() {
    return Comparers.getComparer(sortField, sortIsDesc)
  }

  return { sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer }
}
