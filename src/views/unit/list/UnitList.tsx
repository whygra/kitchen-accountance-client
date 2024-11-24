import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Collapse, Form, Image, Row, Table } from 'react-bootstrap';
import UnitListItem from './UnitListItem';
import { getUnits, UnitDTO } from '../../../api/units';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { DataAction, UserPermissions } from '../../../models';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';

function UnitList() 
{
  
    const [units, setUnits] = useState(new Array<UnitDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Единицы измерения"}
    , [units])
  
    async function loadUnits() {
        setIsLoading(true)    
        try{
          const res = await getUnits()
          setUnits(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadUnits()},[])

    const [displayCreateForm, setDisplayCreateForm] = useState(false)

    function showCreateForm() {
        setDisplayCreateForm(true)
    }

    function hideCreateForm() {
        setDisplayCreateForm(false)
    }

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>

            <h2>Единицы измерения</h2>
        {
            hasPermission(UserPermissions.CRUD_DISTRIBUTORS)
            ? <Button variant='success' onClick={showCreateForm}>Создать</Button>
            : <></>
        }
        </div>
        <Card>

        <Table className='text-center'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Краткое наименование</th>
                    <th>Полное наименование</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

            {units.map(u=>
                <UnitListItem formAction={DataAction.Update} unit={u} onSubmited={async()=>{await loadUnits()}}/>
            )}
            </tbody>
            {displayCreateForm
                ? <UnitListItem formAction={DataAction.Create} unit={{id:0,long:'',short:''}} onSubmited={async()=>{await loadUnits()}}/>
                : <></>
            }
        </Table>
        </Card>

        </>
    )
}

export default UnitList;