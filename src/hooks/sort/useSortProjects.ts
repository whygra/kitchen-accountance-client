import { useState } from "react"
import { PurchaseOptionDTO } from "../../api/purchaseOptions"
import { calcDishWeight, DishDTO } from "../../api/dishes"
import { ProjectDTO } from "../../api/projects"

export enum ProjectField {
    None,
    Logo,
    Id,
    Name,
    Role,
}

class Comparers {
    // id
    static readonly IdAsc = (i1:ProjectDTO, i2:ProjectDTO)=>
        i1.id - i2.id
    static readonly IdDesc = (i1:ProjectDTO, i2:ProjectDTO)=>
        i2.id - i1.id
    
    // Наименование
    static readonly NameAsc = (i1:ProjectDTO, i2:ProjectDTO)=>
        i1.name.localeCompare(i2.name)
    static readonly NameDesc = (i1:ProjectDTO, i2:ProjectDTO)=>
        i2.name.localeCompare(i1.name)

    // функция получения компаратора
    static readonly getComparer = (field: ProjectField, isDesc: boolean) => {
        switch (field) {
            case ProjectField.Id:
                return isDesc ?Comparers.IdDesc :Comparers.IdAsc
            case ProjectField.Name:
                return isDesc ?Comparers.NameDesc :Comparers.NameAsc
            default:
                return (i1:ProjectDTO, i2:ProjectDTO)=>0
        }
    }
}

export default function useSortProjects() {
    const [sortField, setSortField] = useState(ProjectField.None)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: ProjectField){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(ProjectField.None)
    }

    function getComparer() {
        return Comparers.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}