import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterProducts"
import { ProductField } from "../../../hooks/sort/useSortProducts"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface ProductsTableHeaderProps {
    filtersOpen?: boolean
    toggleSort: (field:ProductField)=>void
    activeField: ProductField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: ProductField[]
}

function ProductsTableHeader({
    filtersOpen,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:ProductsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            displayAt: WindowSize.Lg,
            field: ProductField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={ProductField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: ProductField.Name,
            element: 
                <HeaderSortButton
                    header='Название'
                    field={ProductField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: ProductField.Category,
            element: 
                <HeaderSortButton
                    header='Категория'
                    field={ProductField.Category}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: ProductField.Group,
            element: 
                <HeaderSortButton
                    header='Группа'
                    field={ProductField.Group}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        
    ]
    const filterCells = [
        
        {
            displayAt: WindowSize.Lg,
            field: ProductField.Id,
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
            field: ProductField.Name,
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
            field: ProductField.Category,
            element: 
                <Form.Control
                        
                        value={searchData.category}
                        placeholder='категория'
                        onChange={(e)=>setSearchData({...searchData, category: e.target.value.toLocaleLowerCase()})}
                    />,
            span: 3
        },
        {
            displayAt: WindowSize.Sm,
            field: ProductField.Group,
            element: 
                <Form.Control
                        
                        value={searchData.group}
                        placeholder='группа'
                        onChange={(e)=>setSearchData({...searchData, group: e.target.value.toLocaleLowerCase()})}
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

export default ProductsTableHeader