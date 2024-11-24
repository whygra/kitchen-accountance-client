import useSortProjects, { ProjectField } from './sort/useSortProjects';
import useFilterProjects from './filter/useFilterProjects';
import ProjectsTableHeader from '../views/project/list/ProjectsTableHeader';

function useProjectsTableHeader(fieldsToExclude?:ProjectField[]) 
{
    // поиск
    const {searchData, setSearchData, getPredicate} = useFilterProjects()
    const {toggleSort, sortField, sortIsDesc, getComparer} = useSortProjects()
    const header = 
        <ProjectsTableHeader
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

export default useProjectsTableHeader;