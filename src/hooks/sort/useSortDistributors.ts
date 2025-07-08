import { useState } from "react"
import { DishDTO } from "../../api/nomenclature/dishes"


export enum DistributorField {
    None = 'DistributorNone',
    Id = 'DistributorId',
    Name = 'DistributorName',
}

class Comparers {
        // id
        static readonly IdAsc = (i1:DishDTO, i2:DishDTO)=>
            i1.id - i2.id
        static readonly IdDesc = (i1:DishDTO, i2:DishDTO)=>
            i2.id - i1.id
    
        // Наименование
        static readonly NameAsc = (i1:DishDTO, i2:DishDTO)=>
            i1.name.localeCompare(i2.name)
        static readonly NameDesc = (i1:DishDTO, i2:DishDTO)=>
            i2.name.localeCompare(i1.name)
    
        // функция получения компаратора
        static readonly getComparer = (field: DistributorField, isDesc: boolean) => {
            switch (field) {
                case DistributorField.Name:
                    return isDesc ?Comparers.NameDesc :Comparers.NameAsc
                case DistributorField.Id:
                    return isDesc ?Comparers.IdDesc :Comparers.IdAsc
                default:
                    return (i1:DishDTO, i2:DishDTO)=>0
            }
        }
}

export default function useSortDistributors() {
    const [sortField, setSortField] = useState<DistributorField>(DistributorField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: DistributorField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(DistributorField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}