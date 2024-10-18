import { useState } from "react"
import PaginationNav from "../views/shared/PaginationNav"

export default function usePagination(totalLength: number){
    // границы среза коллекции, отображаемого на странице
    const [sliceLimits, setSliceLimits] = useState({start:0, end:1})
    const [resetTo, setResetTo] = useState<number>()

    // функция назначает границы среза коллекции, вызывается компонентом пагинации
    function makeSlice(pageLength:number, pageNumber:number){
        setSliceLimits({start:pageLength*(pageNumber-1), end:pageLength*pageNumber})
    }

    const paginationNav = <PaginationNav
            totalLength={totalLength}
            makeSlice={makeSlice}
        />
    return {sliceLimits, setSliceLimits, makeSlice, paginationNav, setResetTo}
}