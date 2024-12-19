import { Link } from 'react-router-dom';
import { IngredientDTO } from '../../../api/ingredients';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';


interface IngredientsTableItemProps {
    ingredient: IngredientDTO
    fieldsToExclude?: IngredientField[]
  }

function IngredientsTableItem({ingredient, fieldsToExclude}: IngredientsTableItemProps) 
{      
    return (
        <>
            {fieldsToExclude && fieldsToExclude?.find(f=>f==IngredientField.Id)
                ? <></>
                : <td width={2} className='text-center'>{ingredient.id}</td>
            }
            {fieldsToExclude && fieldsToExclude?.find(f=>f==IngredientField.Name)
                ? <></>
                : <td width={4} className='text-center'><Link to={`/ingredients/details/${ingredient.id}`}>{ingredient.name}</Link></td>
            }
            {fieldsToExclude && fieldsToExclude?.find(f=>f==IngredientField.Type)
                ? <></>
                : <td width={2} className='text-center'>{ingredient.type?.name}</td>
            }
            {fieldsToExclude && fieldsToExclude?.find(f=>f==IngredientField.Category)
                ? <></>
                : <td width={4} className='text-center'>{ingredient.category?.name??'без категории'}</td>
            }
            {fieldsToExclude && fieldsToExclude?.find(f=>f==IngredientField.Group)
                ? <></>
                : <td width={4} className='text-center'>{ingredient.category?.name??'без группы'}</td>
            }
        </>
    )
}

export default IngredientsTableItem;