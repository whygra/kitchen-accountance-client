import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterIngredients"
import { IngredientField } from "../../../hooks/sort/useSortIngredients"
import { IngredientTypeDTO } from "../../../api/ingredients"

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
    return (
        <thead>
            <tr className='text-center'>
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Id)??-1)==-1
                    ?
                    <th
                        style={{width: '1%'}}>                    
                        <HeaderSortButton
                        header='Id'
                        field={IngredientField.Id}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                    />
                    </th>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Name)??-1)==-1
                    ?
                    <th
                        style={{width: '4%'}}>                    
                    <HeaderSortButton
                    header='Название'
                    field={IngredientField.Name}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />
                    </th>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Type)??-1)==-1
                    ?
                    <th
                        style={{width: '2%'}}>                    
                    <HeaderSortButton
                    header='Тип'
                    field={IngredientField.Type}
                    onClick={toggleSort}
                    activeField={activeField}
                    sortIsDesc={sortIsDesc}
                    />
                    </th>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Category)??-1)==-1
                    ?
                    <th
                        className=''
                        style={{width: '4%'}}>                    
                        <HeaderSortButton
                        header='Категория'
                        field={IngredientField.Category}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />
                    </th>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Group)??-1)==-1
                    ?
                    <th
                        className=''
                        style={{width: '4%'}}>                    
                        <HeaderSortButton
                        header='Группа'
                        field={IngredientField.Group}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />
                    </th>
                    :<></>
                }
                <td style={{width: '0.1%'}}>
                    <TooltipButton
                        tooltip='поиск'
                        onClick={()=>setSearchOpen(!searchOpen)}
                        variant={searchOpen?'primary':'secondary'}
                        >
                        <i className='bi bi-search'/>
                    </TooltipButton>
                </td>
            </tr>
            <tr className={`${!searchOpen?'d-none':''} bg-light`}>
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Id)??-1)==-1
                    ?
                    <td
                        className=''
                    >
                    <Form.Control
                    type="number"
                    min={1}
                    value={Number.isNaN(searchData.id)?'':searchData.id}
                    placeholder='id'
                    onChange={(e)=>setSearchData({...searchData, id: parseInt(e.target.value)})}
                    />
                    </td>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Name)??-1)==-1
                    ?
                    <td
                        className=''
                    >
                        <Form.Control
                        autoFocus
                        value={searchData.name}
                        placeholder='наименование'
                        onChange={(e)=>setSearchData({...searchData, name: e.target.value.toLocaleLowerCase()})}
                    />
                    </td>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Name)??-1)==-1
                    ?
                    <td
                        className=''
                    >
                        <Form.Select
                        value={searchData.type}
                        onChange={(e)=>setSearchData({...searchData, type: e.target.value})}
                        >
                            <option value={NaN}>-любой-</option>
                            {ingredientTypes.map(t=><option value={t.name}>{t.name}</option>)}
                        </Form.Select>
                    </td>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Category)??-1)==-1
                    ?
                    <td
                        className=''
                    >
                        <Form.Control
                        value={searchData.category}
                        placeholder='категория'
                        onChange={(e)=>setSearchData({...searchData, category: e.target.value.toLocaleLowerCase()})}
                    />
                    </td>
                    :<></>
                }
                {
                    (fieldsToExclude?.findIndex(o=>o==IngredientField.Group)??-1)==-1
                    ?
                    <td
                        className=''
                    >
                        <Form.Control
                        value={searchData.group}
                        placeholder='группа'
                        onChange={(e)=>setSearchData({...searchData, group: e.target.value.toLocaleLowerCase()})}
                    />
                    </td>
                    :<></>
                }
                <td>
                    <TooltipButton
                    tooltip='очистить поля поиска'
                    onClick={()=>setSearchData(EMPTY_SEARCH_PARAMS)}
                    variant='secondary'
                    >
                    <i className='bi bi-x-lg'/>
                </TooltipButton>
                </td>
            </tr>
                
            </thead>
    )
}

export default IngredientsTableHeader