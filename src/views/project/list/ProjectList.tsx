import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Col, Collapse, Form, Image, Row, Table } from 'react-bootstrap';
import ProjectListItem from './ProjectListItem';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import usePagination from '../../../hooks/usePagination';
import Loading from '../../shared/Loading';
import { getProjects, getPublicProjects, ProjectDTO } from '../../../api/projects';
import useProjectsTableHeader from '../../../hooks/useProjectsTableHeader';
import { projectContext } from '../../../context/ProjectContextProvider';
import { getCookie } from '../../../cookies';
import { ProjectField } from '../../../hooks/sort/useSortProjects';

function ProjectList() 
{
    const {user, isSignedIn} = useContext(authContext)
    const [isPublic, setIsPublic] = useState(user==null)
    const [projects, setProjects] = useState(new Array<ProjectDTO>)
    const [isLoading, setIsLoading] = useState(false)

    const {showBoundary} = useErrorBoundary()

    const {hasPermission} = useContext(projectContext)

    useEffect(()=>{
        document.title = "Проекты"}
    , [projects])
  
    async function loadProjects() {
        setIsLoading(true)    
        try{
          const res = await (isPublic ? getPublicProjects() : getProjects())
          setProjects(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadProjects()},[isPublic])

    // заголовок и фильтры
    const {getComparer, getPredicate, header} = useProjectsTableHeader(isSignedIn()?undefined:[ProjectField.Role])

    const filtered = projects
        .filter(getPredicate())
        .sort(getComparer())

    const {sliceLimits, nav} = usePagination(filtered.length)

    function toggleIsPublic() {
        setIsPublic(!isPublic)       
    }

    return isLoading ? (<Loading/>) : (
        <>
        <div className='d-flex justify-content-between'>
            <h2>{isPublic ? 'Общедоступные проекты' : 'Мои проекты'}</h2>
            {isPublic 
                ? <></> 
                : <Link to={'/projects/create'}><Button variant='success'>Создать</Button></Link>
            }
        </div>
        {user != null
           ? <Link to='#' onClick={toggleIsPublic}>{isPublic ? 'Мои проекты' : 'Общедоступные проекты'}</Link>
           : <></>
        }
        <hr/>
        <Table>
            <thead>
                <tr>
                    <td colSpan={2}>{header}</td>
                </tr>
            </thead>
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