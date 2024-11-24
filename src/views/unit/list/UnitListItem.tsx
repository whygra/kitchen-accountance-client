import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UnitDTO, postUnit, putUnit, deleteUnit as requestDeleteUnit } from '../../../api/units';
import { useContext, useState } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { DataAction, UserPermissions } from '../../../models';
import TableRowUnitForm from '../form/TableRowUnitForm';
import TableRowUnitElement from './TableRowUnitElement';
import TooltipButton from '../../shared/TooltipButton';
import { projectContext } from '../../../context/ProjectContextProvider';

interface UnitListItemProps {
    unit: UnitDTO
    formAction: DataAction
    onSubmited: ()=>void
  }

function UnitListItem({unit, formAction, onSubmited}: UnitListItemProps) 
{   
    const {hasPermission} = useContext(projectContext)
    const [formUnit, setFormUnit] = useState(unit)
    const [displayForm, setDisplayForm] = useState(formAction==DataAction.Create)
    const {showModal, hideModal} = useContext(appContext)

    function cancelEdit() {
        setDisplayForm(false)
        setFormUnit(unit)
    }
    
    const deleteUnit = (id: number) => {
        requestDeleteUnit(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onSubmited()
                hideModal()
            })
    }

    function commit() {
        if (formAction = DataAction.Create)
            postUnit(formUnit)
                .catch(e=>showModal(<>{e.message}</>))
                .then(res=>onSubmited())
        if (formAction = DataAction.Update)
            putUnit(formUnit)
                .catch(e=>showModal(<>{e.message}</>))
                .then(res=>onSubmited())
    }

    const canEdit = hasPermission(UserPermissions.CRUD_DISTRIBUTORS)

    return (
        <tr>
            { canEdit && (displayForm || formAction==DataAction.Create)
                ? <><TableRowUnitForm unit={formUnit} setUnit={setFormUnit}/> 
                    <td>
                        <TooltipButton
                            tooltip={formAction==DataAction.Update ? 'обновить' : 'создать'}
                            variant={formAction==DataAction.Update ? 'warning' : 'success'}
                            onClick={commit}
                        >
                            <i className='bi bi-check-lg'/>
                        </TooltipButton>
                        {formAction==DataAction.Create
                            ?<TooltipButton
                                tooltip='отмена'
                                variant='secondary'
                                onClick={cancelEdit}
                            >
                                <i className='bi bi-arrow-return-left'/>
                            </TooltipButton>
                            :<></>
                        }
                    </td>
                </>
                : <><TableRowUnitElement unit={unit}/> 
                    {canEdit
                    ?<td>
                        <TooltipButton
                            tooltip='изменить'
                            variant='warning'
                            onClick={()=>setDisplayForm(true)}
                        >
                            <i className='bi bi-pen'/>
                        </TooltipButton>
                        <TooltipButton
                            tooltip='удалить'
                            variant='danger'
                            onClick={()=>deleteUnit(unit.id)}
                            >
                            <i className='bi bi-trash3'/>
                        </TooltipButton>
                    </td>
                    :<></>
                    }
                </>
            } 
        </tr>
    )
}

export default UnitListItem;