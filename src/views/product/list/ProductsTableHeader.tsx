import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterProducts"
import { ProductField } from "../../../hooks/sort/useSortProducts"

interface ProductsTableHeaderProps {
    filtersOpen?: boolean
    toggleSort: (field:ProductField)=>void
    activeField: ProductField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: ProductField[]
}

function ProductsTableHeader({
    filtersOpen,
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:ProductsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    return (
        <thead>
                <tr className='text-center'>
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProductField.Id)??-1)==-1
                        ?
                        <th
                            style={{width: '1%'}}>                    
                            <HeaderSortButton
                            header='Id'
                            field={ProductField.Id}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                        />
                        </th>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProductField.Name)??-1)==-1
                        ?
                        <th
                            style={{width: '6%'}}>                    
                        <HeaderSortButton
                        header='Название'
                        field={ProductField.Name}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />
                        </th>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProductField.Category)??-1)==-1
                        ?
                        <th
                            className=''
                            style={{width: '5%'}}>                    
                            <HeaderSortButton
                            header='Категория'
                            field={ProductField.Category}
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
                        (fieldsToExclude?.findIndex(o=>o==ProductField.Id)??-1)==-1
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
                        (fieldsToExclude?.findIndex(o=>o==ProductField.Name)??-1)==-1
                        ?
                        <td
                            className=''
                        >
                            <Form.Control
                            value={searchData.name}
                            placeholder='наименование'
                            onChange={(e)=>setSearchData({...searchData, name: e.target.value.toLocaleLowerCase()})}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProductField.Category)??-1)==-1
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

export default ProductsTableHeader