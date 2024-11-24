import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import { PurchaseOptionField } from "../../../hooks/sort/useSortPurchaseOptions"
import TagSearch from "../../shared/TagSearch"
import { ProjectField } from "../../../hooks/sort/useSortProjects"
import { EMPTY_SEARCH_PARAMS, SearchParams } from "../../../hooks/filter/useFilterProjects"

interface ProjectsTableHeaderProps {
    filtersOpen? : boolean
    toggleSort: (field:ProjectField)=>void
    activeField: ProjectField
    sortIsDesc: boolean
    setSearchData: (data:SearchParams)=>void
    searchData: SearchParams
    fieldsToExclude?: ProjectField[]
}

function ProjectsTableHeader({
    toggleSort,
    activeField,
    sortIsDesc,
    searchData,
    setSearchData,
    fieldsToExclude,
    filtersOpen
}:ProjectsTableHeaderProps){
    const [searchOpen, setSearchOpen] = useState(filtersOpen??false)
    return (
        <thead>
                <tr className='text-center'>
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Logo)??-1)==-1
                        ?
                        <th
                            style={{width: '2%'}}>                    
                            <HeaderSortButton
                            header='Логотип'
                            field={ProjectField.Logo}
                            onClick={()=>{}}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                        />
                        </th>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Id)??-1)==-1
                        ?
                        <th
                            style={{width: '2%'}}>                    
                            <HeaderSortButton
                            header='Id'
                            field={ProjectField.Id}
                            onClick={toggleSort}
                            activeField={activeField}
                            sortIsDesc={sortIsDesc}
                        />
                        </th>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Name)??-1)==-1
                        ?
                        <th
                            style={{width: '4%'}}>                    
                        <HeaderSortButton
                        header='Название'
                        field={ProjectField.Name}
                        onClick={toggleSort}
                        activeField={activeField}
                        sortIsDesc={sortIsDesc}
                        />
                        </th>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Name)??-1)==-1
                        ?
                        <th
                            style={{width: '4%'}}>                    
                        <HeaderSortButton
                        header='Роль'
                        field={ProjectField.Role}
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
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Logo)??-1)==-1
                        ?
                        <td
                            className=''
                        >
                        </td>
                        :<></>
                    }
                    {
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Id)??-1)==-1
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
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Name)??-1)==-1
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
                        (fieldsToExclude?.findIndex(o=>o==ProjectField.Name)??-1)==-1
                        ?
                        <td
                            className=''
                        >
                            <Form.Control
                            autoFocus
                            value={searchData.role}
                            placeholder='роль'
                            onChange={(e)=>setSearchData({...searchData, role: e.target.value.toLocaleLowerCase()})}
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
                
            </thead>
    )
}

export default ProjectsTableHeader