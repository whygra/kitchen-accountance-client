import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Col, Form, Row } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterProducts"
import { ProductField } from "../../../hooks/sort/useSortProducts"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"
import TagInput from "../../shared/tags/TagInput"
import { DishField } from "../../../hooks/sort/useSortDishes"

interface ProductsTableHeaderProps {
    tags?: string[]
    filtersOpen?: boolean
    toggleSort: (field:ProductField)=>void
    activeField: ProductField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: ProductField[]
}

function ProductsTableHeader({
    tags,
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
            displayAt: WindowSize.Xl,
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
        
    ]
    const filterCells = [
        
        {
            displayAt: WindowSize.Xl,
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
        }        
    ]
    const tagsFilterCells = [
        {
            field: ProductField.Tags,
            element: (tags == undefined 
                        ?<></>
                        :<Row><Col>
                            <TagInput
                                selectTag={t=>setSearchData({...searchData, tags: [...searchData.tags, t]})}
                                unselectTag={t=>setSearchData({...searchData, tags: searchData.tags.filter(e=>e.localeCompare(t)!=0)})}
                                tags={tags}
                                selectedTags={searchData.tags}
                            />
                        </Col></Row>),
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
                <GridTableRow cells={tagsFilterCells}/>
                <div className="position-absolute end-0 top-0 mt-2 me-1">
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