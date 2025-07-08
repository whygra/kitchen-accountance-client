import { useState } from "react"
import HeaderSortButton from "../../../shared/HeaderSortButton"
import TooltipButton from "../../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../../hooks/filter/useFilterPurchaseActs"
import { PurchaseActField } from "../../../../hooks/sort/useSortPurchaseAct"
import GridTableRow, { WindowSize } from "../../../shared/GridTableRow"

interface PurchaseActsTableHeaderProps {
    filtersOpen?: boolean
    toggleSort: (field:PurchaseActField)=>void
    activeField: PurchaseActField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: PurchaseActField[]
}

function PurchaseActsTableHeader({
    filtersOpen,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:PurchaseActsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            displayAt: WindowSize.Lg,
            field: PurchaseActField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={PurchaseActField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: PurchaseActField.Date,
            element: 
                <HeaderSortButton
                    header='Дата'
                    field={PurchaseActField.Date}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            field: PurchaseActField.Distributor,
            element: 
                <HeaderSortButton
                    header='Поставщик'
                    field={PurchaseActField.Distributor}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: PurchaseActField.TotalCost,
            element: 
                <HeaderSortButton
                    header='Сумма'
                    field={PurchaseActField.TotalCost}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        {   
            displayAt: WindowSize.Md,
            field: PurchaseActField.NItems,
            element: 
                <HeaderSortButton
                    header='Кол-во позиций'
                    field={PurchaseActField.NItems}
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
            field: PurchaseActField.Id,
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
            field: PurchaseActField.Date,
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
            field: PurchaseActField.Distributor,
            element:              
                <>
                    <Form.Control
                        className='mb-1'
                        type='text'
                        placeholder='поставщик'
                        min={0}
                        value={searchData.distributor ?? ''}
                        onChange={(e)=>setSearchData({...searchData, distributor: e.target.value})}
                        />
                </>,
            span: 3
        },  
        {
            displayAt: WindowSize.Sm,
            field: PurchaseActField.TotalCost,
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
        {
            displayAt: WindowSize.Md,
            field: PurchaseActField.NItems,
            element:       
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minNItems ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minNItems: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxNItems ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxNItems: parseInt(e.target.value)})}
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

export default PurchaseActsTableHeader