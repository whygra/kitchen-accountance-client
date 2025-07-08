import WriteOffActsTableHeader from '../views/storage/writeOffAct/list/WriteOffActsTableHeader';
import useFilterWriteOffActs from './filter/useFilterWriteOffActs';
import useSort from './sort/useSort';
import { WriteOffActDTO } from '../api/storage/writeOffActs';
import { WriteOffActComparers, WriteOffActField } from './sort/useSortWriteOffAct';

function useWriteOffActsTableHeader(filtersOpen?: boolean, fieldsToExclude?:WriteOffActField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterWriteOffActs()
    const {toggleSort, sortField, sortIsDesc, getComparer} = 
        useSort<WriteOffActField, WriteOffActDTO>(WriteOffActField.None, WriteOffActComparers)

    const header = 
        <WriteOffActsTableHeader
            filtersOpen={filtersOpen}
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

export default useWriteOffActsTableHeader;