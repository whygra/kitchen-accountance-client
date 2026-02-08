import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import IngredientsTableHeader from '../views/ingredient/list/IngredientsTableHeader';
import useFilterIngredients from './filter/useFilterIngredients';
import useSortIngredients, { IngredientField } from './sort/useSortIngredients';
import { IngredientTypeDTO } from '../api/nomenclature/ingredients';


interface IngredientsHeaderHookProps {
    tags?: string[],
    filtersOpen?:boolean,
    ingredientTypes?: IngredientTypeDTO[]
    fieldsToExclude?:IngredientField[]
}

function useIngredientsTableHeader(
    {tags, 
    ingredientTypes = [{id: 0, name: 'ГП'},{id: 0, name: 'ПФ'}], 
    filtersOpen,
    fieldsToExclude} :IngredientsHeaderHookProps
) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterIngredients()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortIngredients()

    const header = 
        <IngredientsTableHeader
            tags={tags}
            filtersOpen={filtersOpen}
            ingredientTypes={ingredientTypes}
            fieldsToExclude={fieldsToExclude}
            toggleSort={toggleSort}
            activeField={sortField}
            sortIsDesc={sortIsDesc}
            searchData={searchData}
            setSearchData={setSearchData}
        />
        
    return {
        getPredicate,
        getComparer,
        header
    }
}

export default useIngredientsTableHeader;