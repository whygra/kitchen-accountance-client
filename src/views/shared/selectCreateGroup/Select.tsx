import { ReactElement, useContext, useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import { appContext } from '../../../context/AppContextProvider'
import { NamedEntity } from '../../../api/constants'
import GenericTable, { GenericTableProps } from '../GenericTable'

interface SelectProps<T extends NamedEntity> {
  selectedId : number
  items: T[]
  setId : (id : number) => void
}

function Select<T extends NamedEntity>({selectedId, items, setId} : SelectProps<T>) {

  useEffect(()=>{
    // если выбранного id нет в коллекции
    // выбрать первый элемент
    if(items.length > 0 && items.findIndex(i=>i.id==selectedId)==-1)
      setId(items[0].id)

  }, [])
  
  return(
    <Form.Group>
      <Form.Select
        required
        value={selectedId}
        onChange={e=>setId(parseInt(e.target.value))}
      >
        {items?.map(item => <option value={item.id}>{item.name}</option>)} 
      </Form.Select>
      <Form.Control.Feedback type="invalid">
            выберите элемент
          </Form.Control.Feedback>
    </Form.Group>
    )
    
      

}

export default Select;