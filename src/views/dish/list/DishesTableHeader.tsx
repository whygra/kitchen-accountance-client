import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterDishes"
import { DishField } from "../../../hooks/sort/useSortDishes"
import TagSearch from "../../shared/TagSearch"
import { COLUMN_SPANS, useGridFrames } from "../../../hooks/useGridFrames"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface DishesTableHeaderProps {
    filtersOpen? : boolean
    toggleSort: (field:DishField)=>void
    activeField: DishField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: DishField[]
}

function DishesTableHeader({
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude,
    filtersOpen
}:DishesTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            field: DishField.Image,
            element: 
                <HeaderSortButton
                    header='Фото'
                    field={DishField.Image}
                    onClick={()=>{}}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                />,
            span: 1
        },
        {   
            displayAt: WindowSize.Lg,
            field: DishField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={DishField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: DishField.Name,
            element: 
                <HeaderSortButton
                    header='Название'
                    field={DishField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Md,
            field: DishField.Category,
            element:
                <HeaderSortButton
                        header='Категория'
                        field={DishField.Category}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />,
            span: 2
        },
        {   
            displayAt: WindowSize.Md,
            field: DishField.Group,
            element:
                <HeaderSortButton
                        header='Группа'
                        field={DishField.Group}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />,
            span: 2
        },
        {   
            displayAt: WindowSize.Lg,
            field: DishField.Weight,
            element:
                <HeaderSortButton
                        header='Вес блюда'
                        field={DishField.Weight}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />,
            span: 2
        },
    ]
    const filterCells = [
        {
            field: DishField.Image,
            element: 
                <></>,
            span: 1
        },
        {
            displayAt: WindowSize.Lg,
            field: DishField.Id,
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
            field: DishField.Name,
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
            displayAt: WindowSize.Md,
            field: DishField.Category,
            element:
                <Form.Control
                        value={searchData.category}
                        placeholder='категория'
                        onChange={(e)=>setSearchData({...searchData, category: e.target.value.toLocaleLowerCase()})}
                    />,
            span: 2
        },
        {
            displayAt: WindowSize.Md,
            field: DishField.Group,
            element:
                <Form.Control
                        value={searchData.group}
                        placeholder='группа'
                        onChange={(e)=>setSearchData({...searchData, group: e.target.value.toLocaleLowerCase()})}
                    />,
            span: 2
        },
        {
            displayAt: WindowSize.Lg,
            field: DishField.Weight,
            element:
                <>
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='от'
                        min={0}
                        value={searchData.minWeight ?? ''}
                        onChange={(e)=>setSearchData({...searchData, minWeight: parseInt(e.target.value)})}
                        />
                    <Form.Control
                        className='mb-1'
                        type='number'
                        placeholder='до'
                        min={0}
                        value={searchData.maxWeight ?? ''}
                        onChange={(e)=>setSearchData({...searchData, maxWeight: parseInt(e.target.value)})}
                    />
                </>,
            span: 2
        },
    ]
    const productsFilterCells = [
        {   
            field: DishField.Products,
            element:
                <>
                    <Form.Label className="w-100 text-center"><b>Фильтрация по продуктам</b></Form.Label>
                    <TagSearch
                        variant='primary'
                        label='выбрать'
                        items={searchData.hasAnyProducts}
                        onItemsChanged={(items)=>setSearchData({...searchData, hasAnyProducts: items})}
                    />
                    <TagSearch
                        variant='danger'
                        label='исключить'
                        items={searchData.excludesProducts}
                        onItemsChanged={(items)=>setSearchData({...searchData, excludesProducts: items})}
                    />
                </>,
            span: 1
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
                <GridTableRow cells={productsFilterCells} fieldsToExclude={fieldsToExclude}/>
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

export default DishesTableHeader