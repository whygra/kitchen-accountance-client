import { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { IngredientCategoryDTO } from '../../api/ingredientCategories'

interface SelectProps {
  selectedId : number
  items: {id: number; name: string}[]
  setId : (id : number) => void
}

function Select({selectedId, items, setId} : SelectProps) {
  return (
    <Form.Select
      required
      value={selectedId}
      onChange={e=>setId(parseInt(e.target.value))}
    >
      {items?.map(item => <option value={item.id}>{`${item.id}. ${item.name}`}</option>)} 
    </Form.Select>
  )
}

export default Select;