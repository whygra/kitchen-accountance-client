import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import { DistributorField } from "../../../hooks/sort/useSortDistributors"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterDistributors"

interface DistributorsTableHeaderProps {
    toggleSort: (field:DistributorField)=>void
    activeField: DistributorField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: DistributorField[]
}

function DistributorsTableHeader({
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude
}:DistributorsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(false)
    return (
        <thead>
                <tr className='text-center'>
                    {
                        (fieldsToExclude?.findIndex(o=>o==DistributorField.Id)??-1)==-1
                        ?
                        <th
                            style={{width: '2%'}}>                    
                            <HeaderSortButton
                            header='Id'
                            field={DistributorField.Id}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                        />
                        </th>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==DistributorField.Name)??-1)==-1
                        ?
                        <th
                            style={{width: '10%'}}>                    
                        <HeaderSortButton
                        header='Название'
                        field={DistributorField.Name}
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
                        (fieldsToExclude?.findIndex(o=>o==DistributorField.Id)??-1)==-1
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
                        (fieldsToExclude?.findIndex(o=>o==DistributorField.Name)??-1)==-1
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

export default DistributorsTableHeader