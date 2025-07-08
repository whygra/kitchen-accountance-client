import { useState } from "react"

export abstract class IGetComparer<F, T> {
    abstract getComparer: (field: F, isDesc: boolean) => (i1: T, i2: T)=>number
}

export default function useSort<F, T>(initField:F, comparerFactory:IGetComparer<F, T>) {
    const [sortField, setSortField] = useState<F>(initField)
    const [sortIsDesc, setSortIsDesc] = useState(false)

    //сортировка
    function toggleSort(field: F){
        if(sortField != field){
            setSortField(field)
            setSortIsDesc(false)
        }
        else if(!sortIsDesc)
            setSortIsDesc(true)
        else
            setSortField(initField)
    }

    function getComparer() {
        return comparerFactory.getComparer(sortField, sortIsDesc)
    }
    
    return {sortField, setSortField, sortIsDesc, setSortIsDesc, toggleSort, getComparer}
}