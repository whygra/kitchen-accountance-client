import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterProductGroups"
import { ProductGroupField } from "../../../hooks/sort/useSortProductGroups"
import TagSearch from "../../shared/TagSearch"
import GridTableRow from "../../shared/GridTableRow"

interface ProductGroupsTableHeaderProps {
    filtersOpen? : boolean
    toggleSort: (field:ProductGroupField)=>void
    activeField: ProductGroupField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: ProductGroupField[]
}

function ProductGroupsTableHeader({
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude,
    filtersOpen
}:ProductGroupsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            field: ProductGroupField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={ProductGroupField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: ProductGroupField.Name,
            element: 
                <HeaderSortButton
                    header='Название'
                    field={ProductGroupField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
    ]
    const filterCells = [
        {
            field: ProductGroupField.Id,
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
            field: ProductGroupField.Name,
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
            <div className='fw-bold w-100 position-relative bg-light rounded-2 ps-2 pe-5'>
                <GridTableRow cells={filterCells} fieldsToExclude={fieldsToExclude}/>
                <div className="position-absolute translate-middle-y end-0 top-50 me-1">
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

export default ProductGroupsTableHeader