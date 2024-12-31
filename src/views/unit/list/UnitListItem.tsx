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
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';

interface UnitListItemProps {
    unit?: UnitDTO
    onSubmited: ()=>void
  }

function UnitListItem({unit, onSubmited}: UnitListItemProps) 
{   
    const {hasPermission} = useContext(projectContext)
    const [formUnit, setFormUnit] = useState(unit??{id:0, long:'', short:''})
    const [displayForm, setDisplayForm] = useState(false)
    const {showModal, hideModal} = useContext(appContext)
    const [disabled, setDisabled] = useState(false)

    function cancelEdit() {
        setDisplayForm(false)
        setFormUnit(unit??{id:0, long:'', short:''})
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

    async function commit() {
        setDisabled(true)
        try {
            if (unit == undefined)
                await postUnit(formUnit)
            else
                await putUnit(formUnit)
        } catch (err: any) {
            showModal(<>{err.message}</>)
        }
        onSubmited()
        setDisabled(false)
    }

    const canEdit = hasPermission(UserPermissions.CRUD_DISTRIBUTORS)

    return (
        <tr>
            { canEdit && displayForm
                // форма
                ? <><td><TableRowUnitForm unit={formUnit} setUnit={setFormUnit}/> </td>
                    <td>
                        <TooltipButton
                            disabled={disabled}
                            tooltip={unit ? 'обновить' : 'создать'}
                            variant={unit ? 'warning' : 'success'}
                            onClick={commit}
                        >
                            <i className='bi bi-check-lg'/>
                        </TooltipButton>
                        <TooltipButton
                            disabled={disabled}
                            tooltip='отмена'
                            variant='secondary'
                            onClick={cancelEdit}
                        >
                            <i className='bi bi-arrow-return-left'/>
                        </TooltipButton>
                        
                    </td>
                </>
                // представление
                : <>
                    {unit
                        ? <><td><TableRowUnitElement unit={formUnit}/></td>
                        {canEdit 
                            ?
                                <td>
                                    <TooltipButton
                                        tooltip='изменить'
                                        variant='warning'
                                        onClick={()=>setDisplayForm(true)}
                                    >
                                        <i className='bi bi-pen'/>
                                    </TooltipButton>
                                    
                                    <BtnAskConfirmation
                                        prompt={`Вы действительно хотите удалить единицу измерения "${unit.id}. ${unit.long}"?`}
                                        tooltip='удалить'
                                        variant='danger'
                                        onConfirm={()=>deleteUnit(unit.id)}
                                        >
                                        <i className='bi bi-trash3'/>
                                    </BtnAskConfirmation>
                                </td>
                            : <td></td>
                        }</>
                        :
                            <td colSpan={2}>
                                <TooltipButton
                                    tooltip='создать'
                                    variant='success'
                                    onClick={()=>setDisplayForm(true)}
                                    >
                                    создать
                                </TooltipButton>
                            </td>
                    }
                </>
            } 
        </tr>
    )
}

export default UnitListItem;