import { ReactElement, useContext, useEffect, useState } from 'react'
import {Button, Form, Modal, Table} from 'react-bootstrap'
import { IngredientCategoryDTO } from '../../../api/nomenclature/ingredientCategories'
import { appContext } from '../../../context/AppContextProvider'
import { NamedEntity } from '../../../api/constants'
import GenericTable, { GenericTableProps } from '../GenericTable'
import usePagination from '../../../hooks/usePagination'

interface TableSelectProps<T extends NamedEntity> {
  items: T[]
  constructRow: (item:T)=>ReactElement
  
  header: ReactElement
  selectedId : number
  setId : (id : number) => void
}

function TableSelect<T extends NamedEntity>({constructRow, header, selectedId, setId, items} : TableSelectProps<T>) {

  const {nav, sliceLimits} = usePagination(items.length)
  
  return(
    <div>
        <Table className="m-0 w-100" hover>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody className='text-center'>
            {items.slice(sliceLimits.start, sliceLimits.end)
              .map(i=><tr className={`${i.id==selectedId?'table-active fw-bold':''} border-bottom`} onClick={()=>setId(i.id)}>{constructRow(i)}</tr>)}
          </tbody>
        </Table>
        {nav}
    </div>
    )
}

export default TableSelect;