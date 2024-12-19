import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProject, downloadTables, getProject, ProjectDTO } from '../../../api/projects';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import { projectContext } from '../../../context/ProjectContextProvider';
import UpdatedAt from '../../shared/UpdatedAt';
import TooltipButton from '../../shared/TooltipButton';
import { appContext } from '../../../context/AppContextProvider';
import { ErrorView } from '../../ErrorView';
import BtnShowFileUploadForm from '../form/BtnShowFileUploadForm';


function ProjectDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [awaitingDownload, setAwaitingDownload] = useState(false)
    const {project, selectProject, hasPermission} = useContext(projectContext)
    const {showModal} = useContext(appContext)
    
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

    async function download() {
        try{

            setAwaitingDownload(true)
            const url = await downloadTables(project!.id);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${project!.name}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e:Error|any){
            showModal(<ErrorView error={e}/>)
        } finally{
            setAwaitingDownload(false)
        }
    }

    return isLoading ? (<Loading/>) : 
           project===null ? (<>Не удалось получить данные проекта</>) : (
        <div className='d-flex align-items-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center justify-content-start'>
                <div 
                    style={{height:'60px', width:'60px'}} 
                >
                {
                    (project.logo?.url ?? '') == ''
                    ? 
                        <div className='bg-light text-center p-1' style={{width:'60px', height: '60px'}}>
                        <small className='text-secondary'>Нет логотипа</small>
                        </div>
                    : 
                        <Image style={{maxHeight:'100%', maxWidth:'100%'}} src={`${project.logo?.url}`}/>
                }
                </div>
                <h3 className='ms-2 mt-2 text-center'>{`${project.id}. ${project.name}`}</h3>
            </div>
            <div className='d-flex'>
            <BtnShowFileUploadForm onSuccess={()=>{loadProject()}} projectId={project.id}/>

            {hasPermission(UserPermissions.EDIT_PROJECT)
                ? 
                
                <TooltipButton
                    onClick={download}
                    variant='warning'
                    tooltip='скачать таблицы сущностей (xslx)'
                    disabled={awaitingDownload}
                    >{awaitingDownload? <Loading width={20}/> : <i className='bi bi-download'/>}</TooltipButton>
                :
                <></>
            }
            <CUDButtons
                deleteFn={deleteFn}
                entity={project}
                path='projects'
                requiredPermission={UserPermissions.EDIT_PROJECT}
                />
            </div>
            <div className='w-100'>
                <UpdatedAt entity={project}/>
            </div>

        </div>
    )
}

export default ProjectDetails;