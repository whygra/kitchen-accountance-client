import { Accordion, Button, Card, Col, Form, Image, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProject, downloadTables, getProject, getPublicProject, ProjectDTO, publishProject, unpublishProject } from '../../../api/projects';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { projectContext } from '../../../context/ProjectContextProvider';
import UpdatedAt from '../../shared/UpdatedAt';
import TooltipButton from '../../shared/TooltipButton';
import { appContext } from '../../../context/AppContextProvider';
import { ErrorView } from '../../ErrorView';
import BtnShowFileUploadForm from '../form/BtnShowFileUploadForm';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';


function ProjectDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [awaitingDownload, setAwaitingDownload] = useState(false)
    const {project, loadProject: loadProjectState, hasPermission} = useContext(projectContext)
    const {showModal} = useContext(appContext)
    const {user} = useContext(authContext)
    
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
        try{
            loadProjectState(parseInt(id))
        } catch(e:any){
            showModal(<div className='m-2'>{e.message}</div>, <b>{e.name}</b>)
        } finally{
            setIsLoading(false)
        }
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
        <div className='row'>
            <div className='col col-12 col-sm-8 d-flex align-items-center justify-content-start'>
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
                <h3 className='ms-2 mt-2 text-center position-relative'>{`${project.id}. ${project.name}`}
                    <OverlayTrigger
                        overlay={<Tooltip>{project.is_public ? 'общедоступный проект' : 'частный проект'}</Tooltip>}
                    >
                        <i style={{fontSize: 15}} className={`position-absolute translate-middle top-50 start-100 ms-3 text-secondary bi ${project.is_public ? 'bi-unlock-fill' : 'bi-lock-fill'}`}/>
                    </OverlayTrigger>
                </h3>
            </div>
            <div className='col col-12 col-sm-4 d-flex flex-wrap justify-content-end align-items-start'>
            <BtnShowFileUploadForm onSuccess={()=>{loadProject()}} projectId={project.id}/>

            {hasPermission(UserPermissions.EDIT_PROJECT)
                ? 
                <>
                <TooltipButton
                    onClick={download}
                    variant='light'
                    tooltip='скачать таблицы сущностей (xslx)'
                    disabled={awaitingDownload}
                    >{awaitingDownload? <Loading width={20}/> : <i className='bi bi-download'/>}</TooltipButton>
                <BtnAskConfirmation
                    variant='info'
                    prompt={project.is_public 
                        ? 'Вы уверены, что хотите скрыть проект? Просматривать скрытые проекты могут только его участники'
                        : 'Вы уверены, что хотите опубликовать проект? Просматривать опубликованные проекты могут все пользователи сайта'
                    }
                    onConfirm={()=>{(project.is_public ? unpublishProject(project.id): publishProject(project.id)).then(res=>loadProject())}}
                    tooltip={project.is_public?'скрыть проект':'опубликовать проект'}
                ><i className={`bi ${project.is_public ? 'bi-lock' : 'bi-unlock'}`}/></BtnAskConfirmation>
                </>
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