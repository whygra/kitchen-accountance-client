import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterIngredients"
import { IngredientField } from "../../../hooks/sort/useSortIngredients"
import { IngredientTypeDTO } from "../../../api/ingredients"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface IngredientsTableHeaderProps {
    filtersOpen?: boolean
    ingredientTypes: IngredientTypeDTO[]
    toggleSort: (field:IngredientField)=>void
    activeField: IngredientField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: IngredientField[]
}

function IngredientsTableHeader({
    filtersOpen,
    ingredientTypes,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:IngredientsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
            displayAt: WindowSize.Lg,
            field: IngredientField.Id,
            element: 
                <HeaderSortButton
                        header='Id'
                        field={IngredientField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            field: IngredientField.Name,
            element: 
                <HeaderSortButton
                    header='Название'
                    field={IngredientField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            field: IngredientField.Type,
            element: 
                <HeaderSortButton
                    header='Тип'
                    field={IngredientField.Type}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 1
        },
        {   
            displayAt: WindowSize.Sm,
            field: IngredientField.Category,
            element: 
                <HeaderSortButton
                    header='Категория'
                    field={IngredientField.Category}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: IngredientField.Group,
            element: 
                <HeaderSortButton
                    header='Группа'
                    field={IngredientField.Group}
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
            field: IngredientField.Id,
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
            field: IngredientField.Name,
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
            field: IngredientField.Type,
            element: 
                <Form.Select
                    value={searchData.type}
                    onChange={(e)=>setSearchData({...searchData, type: e.target.value.toLocaleLowerCase()})}
                >
                    {ingredientTypes.map(t=><option value={t.name}/>)}
                </Form.Select>,
            span: 1
        },
        {
            displayAt: WindowSize.Sm,
            field: IngredientField.Category,
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
            field: IngredientField.Group,
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

export default IngredientsTableHeader