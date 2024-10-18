import useSortDishes from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import useSortDistributors, { DistributorField } from './sort/useSortDistributors';
import useFilterDistributors from './filter/useFilterDistributors';
import DistributorsTableHeader from '../views/distributor/list/DistributorsTableHeader';

function useDistributorsTableHeader(fieldsToExclude?:DistributorField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterDistributors()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortDistributors()
    const header = 
        <DistributorsTableHeader
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

export default useDistributorsTableHeader;