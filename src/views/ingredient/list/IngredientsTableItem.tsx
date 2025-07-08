import { Link } from 'react-router-dom';
import { IngredientDTO } from '../../../api/nomenclature/ingredients';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';
import GridTableRow, { WindowSize } from '../../shared/GridTableRow';


interface IngredientsTableItemProps {
    ingredient: IngredientDTO
    fieldsToExclude?: IngredientField[]
  }

function IngredientsTableItem({ingredient, fieldsToExclude}: IngredientsTableItemProps) 
{  
    const cells = [
        {   
            displayAt: WindowSize.Lg,
            field: IngredientField.Id,
            element: 
                <>{ingredient.id}</>,
            span: 1
        },
        {   
            field: IngredientField.Name,
            element: 
                <Link to={`/ingredients/details/${ingredient.id}`}>{ingredient.name}</Link>,
            span: 3
        },
        {   
            field: IngredientField.Type,
            element: 
                <>{ingredient.type?.name}</>,
            span: 1
        },
        {   
            displayAt: WindowSize.Sm,
            field: IngredientField.Category,
            element: 
                ingredient.category?<Link to={`/ingredient-categories/details/${ingredient.category.id}`}>{ingredient.name}</Link>:<>-без группы-</>,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: IngredientField.Group,
            element: 
                ingredient.group?<Link to={`/ingredient-groups/details/${ingredient.group.id}`}>{ingredient.name}</Link>:<>-без группы-</>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default IngredientsTableItem;