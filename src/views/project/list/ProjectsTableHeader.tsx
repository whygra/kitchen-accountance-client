import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import TagSearch from "../../shared/TagSearch"
import { ProjectField } from "../../../hooks/sort/useSortProjects"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterProjects"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface ProjectsTableHeaderProps {
    filtersOpen? : boolean
    toggleSort: (field:ProjectField)=>void
    activeField: ProjectField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: ProjectField[]
}

function ProjectsTableHeader({
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude,
    filtersOpen
}:ProjectsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            displayAt: WindowSize.Sm,
            field: ProjectField.Id,
            element: 
                <HeaderSortButton
                        header='Логотип'
                        field={ProjectField.None}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            displayAt: WindowSize.Lg,
            field: ProjectField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={ProjectField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: ProjectField.Name,
            element: 
                <HeaderSortButton
                    header='Название'
                    field={ProjectField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: ProjectField.Role,
            element: 
                <HeaderSortButton
                    header='Роль'
                    field={ProjectField.Role}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        
    ]
    const filterCells = [
        
        {   
            displayAt: WindowSize.Sm,
            element: <></>,
            span: 1
        },
        {
            displayAt: WindowSize.Lg,
            field: ProjectField.Id,
            element: 
                <Form.Control
                    type="number"
                    min={1}
                    value={Number.isNaN(searchData.id)?'':searchData.id}
                    placeholder='id'
                    onChange={(e)=>setSearchData({...searchData, id: parseInt(e.target.value)})}
                />,
            span: 1
        },
        {
            field: ProjectField.Name,
            element: 
                <Form.Control
                    autoFocus
                    value={searchData.name}
                    placeholder='наименование'
                    onChange={(e)=>setSearchData({...searchData, name: e.target.value.toLocaleLowerCase()})}
                />,
            span: 3
        },
        {
            displayAt: WindowSize.Sm,
            field: ProjectField.Role,
            element: 
                <Form.Control
                        
                        value={searchData.role}
                        placeholder='роль'
                        onChange={(e)=>setSearchData({...searchData, role: e.target.value.toLocaleLowerCase()})}
                    />,
            span: 3
        },
        
    ]
    return (
        <>
            <div className='fw-bold w-100 position-relative pe-5'>
                <GridTableRow cells={sortCells} fieldsToExclude={fieldsToExclude}/>
                <div className="position-absolute translate-middle-y end-0 top-50 me-1">
                    <TooltipButton
                        tooltip='поиск'
                        onClick={()=>setSearchOpen(!searchOpen)}
                        variant={searchOpen?'primary':'secondary'}
                        >
                        <i className='bi bi-search'/>
                    </TooltipButton>
                </div>
            </div>
            {searchOpen
            ?
            <div className='fw-bold w-100 position-relative bg-light rounded-2 pe-5'>
                <GridTableRow cells={filterCells} fieldsToExclude={fieldsToExclude}/>
                <div className="position-absolute end-0 top-0 me-1 mt-2">
                    <TooltipButton
                        tooltip='сбросить фильтры'
                        onClick={()=>setSearchData(EMPTY_SEARCH_PARAMS)}
                        variant='secondary'
                        >
                        <i className='bi bi-x-circle'/>
                    </TooltipButton>
                </div>
            </div>
            :<></>
            }
        </>
    )
}

export default ProjectsTableHeader