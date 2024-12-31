import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterDishGroups"
import { DishGroupField } from "../../../hooks/sort/useSortDishGroups"
import TagSearch from "../../shared/TagSearch"
import GridTableRow from "../../shared/GridTableRow"

interface DishGroupsTableHeaderProps {
    filtersOpen? : boolean
    toggleSort: (field:DishGroupField)=>void
    activeField: DishGroupField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: DishGroupField[]
}

function DishGroupsTableHeader({
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude,
    filtersOpen
}:DishGroupsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            field: DishGroupField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={DishGroupField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: DishGroupField.Name,
            element: 
                <HeaderSortButton
                    header='Название'
                    field={DishGroupField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
    ]
    const filterCells = [
        {
            field: DishGroupField.Id,
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
            field: DishGroupField.Name,
            element: 
                <Form.Control
                        autoFocus
                        value={searchData.name}
                        placeholder='наименование'
                        onChange={(e)=>setSearchData({...searchData, name: e.target.value.toLocaleLowerCase()})}
                    />,
            span: 3
        }
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

export default DishGroupsTableHeader