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

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>

            <h2>Единицы измерения</h2>
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
                <UnitListItem unit={u} onSubmited={async()=>{await loadUnits()}}/>
            )}
                <UnitListItem  onSubmited={async()=>{await loadUnits()}}/>

            </tbody>
        </Table>
        </Card>

        </>
    )
}

export default UnitList;