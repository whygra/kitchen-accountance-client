import { ReactNode, useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getIngredientTypes, IngredientTypeDTO } from '../../../api/ingredientTypes';

interface IngredientTypeSelectProps {
  typeId: number,
  setTypeId: (id:number)=>void,
  ingredientTypes: IngredientTypeDTO[],
}

function IngredientTypeSelect({ingredientTypes, typeId, setTypeId}: IngredientTypeSelectProps) {

  function getOptions() : ReactNode {
    return ingredientTypes.map(ingredientType => <option value={ingredientType.id}>{ingredientType.name}</option>)
  }
  
  return (
        <Form.Select
          defaultValue={typeId}
          onChange={e=>setTypeId(parseInt(e.target.value))}
        >
            {getOptions()}
        </Form.Select>
  )
}

export default IngredientTypeSelect;