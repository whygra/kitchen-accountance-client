import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { SearchParams, EMPTY_SEARCH_PARAMS } from "../../../hooks/filter/useFilterPurchaseOptions"

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
    return (
        <thead>
                <tr className='text-center align-text-top'>
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Distributor)??-1)==-1
                        ?
                        <td
                            className=' d-none d-md-table-cell'
                            style={{width:'2%'}}>                    
                        <HeaderSortButton
                        header='Поставщик'
                        field={PurchaseOptionField.Distributor}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Code)??-1)==-1
                        ?
                        <td
                            className='  d-none d-lg-table-cell'
                            style={{width:'1%'}}>                    
                        <HeaderSortButton
                        header='Код'
                        field={PurchaseOptionField.Code}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Name)??-1)==-1
                        ?
                        <td
                            className=' '
                            style={{width:'2%'}}>                    
                            <HeaderSortButton
                            header='Наименование'
                            field={PurchaseOptionField.Name}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Product)??-1)==-1
                        ?
                        <td
                            className='  d-none d-md-table-cell'
                            style={{width:'2%'}}>
                            <HeaderSortButton
                            header='Продукт'
                            field={PurchaseOptionField.Product}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Unit)??-1)==-1
                        ?
                        <td
                            className='  d-none d-lg-table-cell'
                            style={{width:'1%'}}>
                            <HeaderSortButton
                            header='Единица измерения'
                            field={PurchaseOptionField.Unit}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Unit)??-1)==-1
                        ?
                        <td
                            className='  d-none d-md-table-cell'
                            style={{width:'2%'}}>
                            <HeaderSortButton
                            header='Масса нетто'
                            field={PurchaseOptionField.NetWeight}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Unit)??-1)==-1
                        ?
                        <td
                            className=' '
                            style={{width:'1%'}}>
                            <HeaderSortButton
                            header='Цена'
                            field={PurchaseOptionField.Price}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                            />
                        </td>
                        :<></>
                    }
                    <td style={{width:'0.01%'}}>
                        <TooltipButton
                            tooltip='поиск'
                            onClick={()=>setSearchOpen(!searchOpen)}
                            variant={searchOpen?'primary':'secondary'}
                            >
                            <i className='bi bi-search'/>
                        </TooltipButton>
                    </td>
                </tr>
                <tr className={`${!searchOpen?'d-none':''} align-text-top`}>
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Distributor)??-1)==-1
                        ?
                        <td
                            className='  d-none d-md-table-cell'
                        >
                        <Form.Control
                        value={searchData.distributor}
                        placeholder='поставщик'
                        onChange={(e)=>setSearchData({...searchData, distributor: e.target.value.toLocaleLowerCase()})}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Code)??-1)==-1
                        ?
                        <td
                            className='  d-none d-lg-table-cell'
                        >
                            <Form.Control
                            value={searchData.code}
                            placeholder='код'
                            onChange={(e)=>setSearchData({...searchData, code: e.target.value.toLocaleLowerCase()})}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Name)??-1)==-1
                        ?
                        <td
                            className=' '
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
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Product)??-1)==-1
                        ?
                        <td
                            className='  d-none d-md-table-cell'
                        >
                            <Form.Control
                            value={searchData.product}
                            placeholder='продукт'
                            onChange={(e)=>setSearchData({...searchData, product: e.target.value.toLocaleLowerCase()})}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Unit)??-1)==-1
                        ?
                        <td
                            className='  d-none d-lg-table-cell'
                        >
                            <Form.Control
                            value={searchData.unit}
                            placeholder='ед. изм.'
                            onChange={(e)=>setSearchData({...searchData, unit: e.target.value.toLocaleLowerCase()})}
                        />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.NetWeight)??-1)==-1
                        ?
                        <td
                            className='  d-none d-md-table-cell'
                        >
                            <Form.Control
                            className='mt-1'
                            type='number'
                            placeholder='от'
                            min={0}
                            value={searchData.minNetWeight ?? ''}
                            onChange={(e)=>setSearchData({...searchData, minNetWeight: parseInt(e.target.value.toLocaleLowerCase())})}
                            />
                        <Form.Control
                            className='mt-1'
                            type='number'
                            placeholder='до'
                            min={0}
                            value={searchData.maxNetWeight ?? ''}
                            onChange={(e)=>setSearchData({...searchData, maxNetWeight: parseInt(e.target.value.toLocaleLowerCase())})}
                            />
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==PurchaseOptionField.Price)??-1)==-1
                        ?
                        <td
                            className=' '
                        >
                            <Form.Control
                            className='mt-1'
                            type='number'
                            placeholder='от'
                            min={0}
                            value={searchData.minPrice ?? ''}
                            onChange={(e)=>setSearchData({...searchData, minPrice: parseInt(e.target.value.toLocaleLowerCase())})}
                            />
                            <Form.Control
                            className='mt-1'
                            type='number'
                            placeholder='до'
                            min={0}
                            value={searchData.maxPrice ?? ''}
                            onChange={(e)=>setSearchData({...searchData, maxPrice: parseInt(e.target.value.toLocaleLowerCase())})}
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

export default PurchaseOptionsTableHeader