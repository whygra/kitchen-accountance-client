import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterDishes"
import { DishField } from "../../../hooks/sort/useSortDishes"
import TagSearch from "../../shared/TagSearch"

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
    return (
        <thead className='text-center w-100'>
                <tr>
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Image)??-1)==-1
                        ?
                        <td
                            width='1%'
                        >                    
                            <HeaderSortButton
                            header='Фото'
                            field={DishField.Image}
                            onClick={()=>{}}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Id)??-1)==-1
                        ?
                        <td
                            width='1%'
                        >                    
                            <HeaderSortButton
                            header='Id'
                            field={DishField.Id}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Name)??-1)==-1
                        ?
                        <td
                            width='3%'>                    
                        <HeaderSortButton
                        header='Название'
                        field={DishField.Name}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Category)??-1)==-1
                        ?
                        <td
                            className=''
                            width='3%'>                    
                            <HeaderSortButton
                            header='Категория'
                            field={DishField.Category}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Group)??-1)==-1
                        ?
                        <td
                            className=''
                            width='3%'>                    
                            <HeaderSortButton
                            header='Группа'
                            field={DishField.Group}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Weight)??-1)==-1
                        ?
                        <td
                            className=''
                            width='2%'>
                            <HeaderSortButton
                            header='Вес блюда'
                            field={DishField.Weight}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    <td width={'0.1%'}>
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
                        (fieldsToExclude?.findIndex(o=>o==DishField.Image)??-1)==-1
                        ?
                        <td
                            className=''
                        >
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Id)??-1)==-1
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
                        (fieldsToExclude?.findIndex(o=>o==DishField.Name)??-1)==-1
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
                        (fieldsToExclude?.findIndex(o=>o==DishField.Category)??-1)==-1
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
                        (fieldsToExclude?.findIndex(o=>o==DishField.Group)??-1)==-1
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
                    {
                        (fieldsToExclude?.findIndex(o=>o==DishField.Weight)??-1)==-1
                        ?
                        <td
                            className=''
                        >
                            <Form.Control
                            className='mt-1'
                            type='number'
                            placeholder='от'
                            min={0}
                            value={searchData.minWeight ?? ''}
                            onChange={(e)=>setSearchData({...searchData, minWeight: parseInt(e.target.value)})}
                            />
                            <Form.Control
                            className='mt-1'
                            type='number'
                            placeholder='до'
                            min={0}
                            value={searchData.maxWeight ?? ''}
                            onChange={(e)=>setSearchData({...searchData, maxWeight: parseInt(e.target.value)})}
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
                        <i className='bi bi-x-circle'/>
                    </TooltipButton>
                    </td>
                </tr>
                <tr className={`${!searchOpen?'d-none':''} bg-light`}>                        
                    <td colSpan={7-(fieldsToExclude?.length??0)}
                            className='p-2'
                        >
                            <Form.Label className="w-100 text-center"><b>Продукты</b></Form.Label>
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

                    </td>
                </tr>
                
            </thead>
    )
}

export default DishesTableHeader