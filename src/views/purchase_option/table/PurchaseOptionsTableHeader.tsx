import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { SearchParams, EMPTY_SEARCH_PARAMS } from "../../../hooks/filter/useFilterPurchaseOptions"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface PurchaseOptionsTableHeaderProps {
    filtersOpen?: boolean
    toggleSort: (field:PurchaseOptionField)=>void
    activeField: PurchaseOptionField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: PurchaseOptionField[]
}

function PurchaseOptionsTableHeader({
    filtersOpen,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:PurchaseOptionsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen ?? false)
    const sortCells = [
        {   
            displayAt: WindowSize.Lg,
            field: PurchaseOptionField.Code,
            element: 
                <HeaderSortButton
                    header='Код'
                    field={PurchaseOptionField.Code}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        {   
            field: PurchaseOptionField.Name,
            element: 
                <HeaderSortButton
                    header='Название'
                    field={PurchaseOptionField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: PurchaseOptionField.Distributor,
            element: 
                <HeaderSortButton
                    header='Поставщик'
                    field={PurchaseOptionField.Distributor}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Md,
            field: PurchaseOptionField.Product,
            element: 
                <HeaderSortButton
                    header='Продукт'
                    field={PurchaseOptionField.Product}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Md,
            field: PurchaseOptionField.NetWeight,
            element: 
                <HeaderSortButton
                    header='Масса Нетто'
                    field={PurchaseOptionField.NetWeight}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            field: PurchaseOptionField.Price,
            element: 
                <HeaderSortButton
                    header='Цена'
                    field={PurchaseOptionField.Price}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        {   
            displayAt: WindowSize.Lg,
            field: PurchaseOptionField.Unit,
            element: 
                <HeaderSortButton
                    header='Ед. изм.'
                    field={PurchaseOptionField.Unit}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 2
        },
        
    ]
    const filterCells = [
        
        {
            displayAt: WindowSize.Sm,
            field: PurchaseOptionField.Code,
            element: 
                <Form.Control
                    type="number"
                    min={1}
                    value={Number.isNaN(searchData.code)?'':searchData.code}
                    placeholder='код'
                    onChange={(e)=>setSearchData({...searchData, code: e.target.value.toLocaleLowerCase()})}
                    />,
            span: 2
        },
        {
            field: PurchaseOptionField.Name,
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
            field: PurchaseOptionField.Distributor,
            element: 
                <Form.Control
                    
                    value={searchData.distributor}
                    placeholder='поставщик'
                    onChange={(e)=>setSearchData({...searchData, distributor: e.target.value.toLocaleLowerCase()})}
                />,
            span: 3
        },
        {
            displayAt: WindowSize.Md,
            field: PurchaseOptionField.Product,
            element: 
                <Form.Control
                        
                        value={searchData.product}
                        placeholder='продукт'
                        onChange={(e)=>setSearchData({...searchData, product: e.target.value.toLocaleLowerCase()})}
                    />,
            span: 3
        },
        {
            displayAt: WindowSize.Md,
            field: PurchaseOptionField.NetWeight,
            element:
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minNetWeight ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minNetWeight: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxNetWeight ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxNetWeight: parseInt(e.target.value)})}
                    />
                </>,
            span: 2
        },
        {
            displayAt: WindowSize.Md,
            field: PurchaseOptionField.Price,
            element:
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minNetWeight ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minPrice: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxNetWeight ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxPrice: parseInt(e.target.value)})}
                    />
                </>,
            span: 2
        },
        {
            displayAt: WindowSize.Md,
            field: PurchaseOptionField.Unit,
            element: 
                <Form.Control
                        
                        value={searchData.unit}
                        placeholder='ед. изм.'
                        onChange={(e)=>setSearchData({...searchData, unit: e.target.value.toLocaleLowerCase()})}
                    />,
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

export default PurchaseOptionsTableHeader