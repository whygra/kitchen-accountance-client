import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row, Table } from 'react-bootstrap';
import ProjectListItem from './ProjectListItem';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { getProjects, ProjectDTO } from '../../../api/projects';
import useProjectsTableHeader from '../../../hooks/useProjectsTableHeader';
import { projectContext } from '../../../context/ProjectContextProvider';

function ProjectList() 
{
  
    const [projects, setProjects] = useState(new Array<ProjectDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Блюда"}
    , [projects])
  
    async function loadProjects() {
        setIsLoading(true)    
        try{
          const res = await getProjects()
          setProjects(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadProjects()},[])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useProjectsTableHeader()

    const filtered = projects
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>Мои проекты</h2>
        <Link to={'/projects/create'}><Button variant='success'>Создать</Button></Link>
        </div>
        <Table>
            {header}
            <tbody>
            {filtered
                .slice(sliceLimits.start, sliceLimits.end)
                .map(d=>
                    <ProjectListItem project={d} onDeleted={async()=>{await loadProjects()}}/>
                )}
            </tbody>
        </Table>
        {nav}
        </>
    )
}

export default ProjectList;