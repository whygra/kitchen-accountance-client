import { useState } from "react"
import HeaderSortButton from "../../../shared/HeaderSortButton"
import TooltipButton from "../../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../../hooks/filter/useFilterSaleActs"
import { SaleActField } from "../../../../hooks/sort/useSortSaleAct"
import GridTableRow, { WindowSize } from "../../../shared/GridTableRow"

interface SaleActsTableHeaderProps {
    filtersOpen?: boolean
    toggleSort: (field:SaleActField)=>void
    activeField: SaleActField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: SaleActField[]
}

function SaleActsTableHeader({
    filtersOpen,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:SaleActsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            displayAt: WindowSize.Lg,
            field: SaleActField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={SaleActField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: SaleActField.Date,
            element: 
                <HeaderSortButton
                    header='Дата'
                    field={SaleActField.Date}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: SaleActField.AmtItems,
            element: 
                <HeaderSortButton
                    header='Единиц продано'
                    field={SaleActField.AmtItems}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            field: SaleActField.TotalCost,
            element: 
                <HeaderSortButton
                    header='Общая стоимость'
                    field={SaleActField.TotalCost}
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
            field: SaleActField.Id,
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
            field: SaleActField.Date,
            element: 
                <>
                    <Form.Control
                        className='mb-1'
                        type='date'
                        placeholder='от'
                        value={searchData.dateFrom ?? ''}
                        onChange={(e)=>setSearchData({...searchData, dateFrom: e.target.value})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='date'
                        placeholder='до'
                        value={searchData.dateTo ?? ''}
                        onChange={(e)=>setSearchData({...searchData, dateTo: e.target.value})}
                    />
                </>,
            span: 3
        },
        {
            displayAt: WindowSize.Sm,
            field: SaleActField.AmtItems,
            element:       
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minAmtItems ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minAmtItems: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxAmtItems ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxAmtItems: parseInt(e.target.value)})}
                    />
                </>,
            span: 2
        },
        {
            displayAt: WindowSize.Sm,
            field: SaleActField.TotalCost,
            element:              
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minTotalCost ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minTotalCost: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxTotalCost ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxTotalCost: parseInt(e.target.value)})}
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

export default SaleActsTableHeader