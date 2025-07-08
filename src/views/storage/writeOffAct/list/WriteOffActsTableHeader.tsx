import { useState } from "react"
import HeaderSortButton from "../../../shared/HeaderSortButton"
import TooltipButton from "../../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../../hooks/filter/useFilterWriteOffActs"
import { WriteOffActField } from "../../../../hooks/sort/useSortWriteOffAct"
import GridTableRow, { WindowSize } from "../../../shared/GridTableRow"

interface WriteOffActsTableHeaderProps {
    filtersOpen?: boolean
    toggleSort: (field:WriteOffActField)=>void
    activeField: WriteOffActField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: WriteOffActField[]
}

function WriteOffActsTableHeader({
    filtersOpen,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:WriteOffActsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            displayAt: WindowSize.Lg,
            field: WriteOffActField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={WriteOffActField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: WriteOffActField.Date,
            element: 
                <HeaderSortButton
                    header='Дата'
                    field={WriteOffActField.Date}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: WriteOffActField.NProducts,
            element: 
                <HeaderSortButton
                    header='Тип'
                    field={WriteOffActField.NProducts}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            field: WriteOffActField.NIngredients,
            element: 
                <HeaderSortButton
                    header='Категория'
                    field={WriteOffActField.NIngredients}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        
    ]
    const filterCells = [
        
        {
            displayAt: WindowSize.Lg,
            field: WriteOffActField.Id,
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
            field: WriteOffActField.Date,
            element: 
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.dateFrom ?? ''}
                        onChange={(e)=>setSearchData({...searchData, dateFrom: e.target.value})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.dateTo ?? ''}
                        onChange={(e)=>setSearchData({...searchData, dateTo: e.target.value})}
                    />
                </>,
            span: 3
        },
        {
            displayAt: WindowSize.Sm,
            field: WriteOffActField.NProducts,
            element:       
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minNProducts ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minNProducts: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxNProducts ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxNProducts: parseInt(e.target.value)})}
                    />
                </>,
            span: 2
        },
        {
            displayAt: WindowSize.Sm,
            field: WriteOffActField.NIngredients,
            element:              
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minNIngredients ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minNIngredients: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxNIngredients ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxNIngredients: parseInt(e.target.value)})}
                    />
                </>,
            span: 2
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

export default WriteOffActsTableHeader