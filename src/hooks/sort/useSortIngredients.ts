import { useState } from "react"
import { IngredientDTO } from "../../api/nomenclature/ingredients"

export enum IngredientField {
    None = 'IngredientNone',
    Tags = 'IngredientTags',
    Id = 'IngredientId',
    Name = 'IngredientName',
    Type = 'IngredientType',
}

class Comparers {
    // id
    static readonly IdAsc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i2.name.localeCompare(i1.name)

    // Тип
    static readonly TypeAsc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i1.type?.name.localeCompare(i2.type?.name??'')??-1
    static readonly TypeDesc = (i1:IngredientDTO, i2:IngredientDTO)=>
        i2.type?.name.localeCompare(i1.type?.name??'')??-1

    // функция получения компаратора
    static readonly getComparer = (field: IngredientField, isDesc: boolean) => {
        switch (field) {
            case IngredientField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case IngredientField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            case IngredientField.Type:
                return isDesc ?Comparers.TypeDesc :Comparers.TypeAsc
            default:
                return (i1:IngredientDTO, i2:IngredientDTO)=>0
        }
    }
}

export default function useSortIngredients() {
    const [sortField, setSortField] = useState(IngredientField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: IngredientField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(IngredientField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}