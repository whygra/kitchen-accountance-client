import { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { IngredientDTO, IngredientWithProductsDTO, getIngredientsWithProducts } from '../../../api/ingredients';

interface IngredientSelectProps {
  ingredientId : number
  setIngredientId : (id : number) => void
  ingredients : IngredientDTO[]
}

function IngredientSelect({ingredientId, setIngredientId, ingredients} : IngredientSelectProps) {

  return (
    <Form.Select
      value={ingredientId}
      onChange={e=>setIngredientId(parseInt(e.target.value))}
    >
      {ingredients.map(c => <option value={c.id}>{`${c.id}. ${c.name} ${c.type.name} ${c.is_item_measured?'('+c.item_weight+' г/шт)':''}`}</option>)} 
    </Form.Select>
  )
}

export default IngredientSelect;