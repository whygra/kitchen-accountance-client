import { ReactElement, useState } from "react"
import { Table } from "react-bootstrap"
import usePagination from "../../hooks/usePagination"
import { NamedEntity } from "../../api/constants"
import ExpansionBtn, { ExpansionBtnProps } from "./ExpansionBtn"

export interface GenericTableProps<T extends NamedEntity> {
    items: T[]
    getHeader: ()=>ReactElement
    constructRow: (item:T)=>ReactElement
}

function GenericTable<T extends NamedEntity>({items, getHeader, constructRow}:GenericTableProps<T>): ReactElement{

    const {sliceLimits, nav, makeSlice} = usePagination(items?.length??0) 
    
    return (
        <>
        <Table className="m-0 w-100">
            {getHeader()}
            <tbody>
                {items.slice(sliceLimits.start, sliceLimits.end)
                    .map(i=><tr className="text-center">{constructRow(i)}</tr>)}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default GenericTable