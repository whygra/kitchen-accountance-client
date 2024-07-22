import { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { GetIngredientWithProductsDTO, getIngredientsWithProducts } from '../../../api/ingredientWithProducts';

interface IngredientSelectProps {
  ingredientId : number
  setIngredientId : (id : number) => void
  ingredients : GetIngredientWithProductsDTO[]
}

function IngredientSelect({ingredientId, setIngredientId, ingredients} : IngredientSelectProps) {

  return (
    <Form.Select
      value={ingredientId}
      onChange={e=>setIngredientId(parseInt(e.target.value))}
    >
      {ingredients.map(c => <option value={c.id}>{`${c.id}. ${c.name} ${c.type.name}`}</option>)} 
    </Form.Select>
  )
}

export default IngredientSelect;