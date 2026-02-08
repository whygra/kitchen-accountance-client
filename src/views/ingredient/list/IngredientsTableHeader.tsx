import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Col, Form, Row } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterIngredients"
import { IngredientField } from "../../../hooks/sort/useSortIngredients"
import { IngredientTypeDTO } from "../../../api/nomenclature/ingredients"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"
import TagInput from "../../shared/tags/TagInput"

interface IngredientsTableHeaderProps {
    filtersOpen?: boolean
    ingredientTypes: IngredientTypeDTO[]
    toggleSort: (field:IngredientField)=>void
    activeField: IngredientField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: IngredientField[]
    tags?: string[]
}

function IngredientsTableHeader({
    filtersOpen,
    ingredientTypes,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude,
    tags = []
}:IngredientsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    const sortCells = [
        {   
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
        }
        
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
                    onChange={(e)=>setSearchData({...searchData, type: e.target.value})}
                >
                    {ingredientTypes.map(t=><option value={t.name}>{t.name}</option>)}
                    <option value=''>-/-</option>
                </Form.Select>,
            span: 1
        }
        
    ]
    const tagsFilter = [
        {
            field: IngredientField.Tags,
            element: <TagInput
                            selectTag={t=>setSearchData({...searchData, tags: [...searchData.tags, t]})}
                            unselectTag={t=>setSearchData({...searchData, tags: searchData.tags.filter(e=>e.localeCompare(t)!=0)})}
                            tags={tags}
                            selectedTags={searchData.tags}
                        />,
            span: 1
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
                <GridTableRow cells={tagsFilter}/>
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