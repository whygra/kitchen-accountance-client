import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProject, getProject, ProjectDTO } from '../../../api/projects';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import { projectContext } from '../../../context/ProjectContextProvider';


function ProjectDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const {project, selectProject} = useContext(projectContext)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Проект "${project?.name}"`}
    , [project])

    useEffect(()=>{loadProject()}, [])

    async function loadProject() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id проекта")
        
        setIsLoading(true)
        const project = await getProject(parseInt(id??'0'))
        
        if (project === null)
            throw Error("Не удалось получить данные проекта")
        
        selectProject(project)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteProject(id)
        navigate('/projects/all')
    }

    return isLoading ? (<Loading/>) : 
           project===null ? (<>Не удалось получить данные проекта</>) : (
        <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center justify-content-start'>
                <div 
                    style={{height:'60px', width:'60px'}} 
                    className='text-secondary'
                >
                {
                    (project.logo?.url ?? '') == ''
                    ? 
                        <h3 className='bg-secondary'>Нет логотипа</h3>
                    : 
                        <Image style={{maxHeight:'100%', maxWidth:'100%'}} src={`${project.logo?.url}`}/>
                }
                </div>
                <h3 className='text-center'>{`${project.id}. ${project.name}`}</h3>
            </div>
            <CUDButtons
                deleteFn={deleteFn}
                entity={project}
                path='projects'
                requiredPermission={UserPermissions.EDIT_PROJECT}
            />
        </div>
    )
}

export default ProjectDetails;