import { Accordion, Badge, Button, Card, Col, Form, Image, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteProject, downloadSheets, getProject, getPublicProject, ProjectDTO, publishProject, unpublishProject } from '../../../api/projects';
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
    const {project, loadProject, hasPermission} = useContext(projectContext)
    const {showModal} = useContext(appContext)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Проект "${project?.name}"`}
    , [project])

    useEffect(()=>{load()}, [])

    async function load() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id проекта")
        
        setIsLoading(true)
        try{
            await loadProject(parseInt(id))
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

    // скачивание сущностей проекта в xlsx
    async function download() {
        try{
            setAwaitingDownload(true)
            const url = await downloadSheets(project!.id);
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
        <div>
        <Row>
            <Col sm={8} md={12} className='d-flex align-items-center justify-content-start'>
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
                <h3 className='ms-2 mt-2 text-center position-relative'>{project.name}
                    <OverlayTrigger
                        overlay={<Tooltip>{project.is_public ? 'общедоступный проект' : 'частный проект'}</Tooltip>}
                    >
                        <i style={{fontSize: 15}} className={`position-absolute translate-middle top-50 start-100 ms-3 text-secondary bi ${project.is_public ? 'bi-unlock-fill' : 'bi-lock-fill'}`}/>
                    </OverlayTrigger>
                </h3>
            </Col>
            <Col sm={4} md={12} className='d-flex flex-wrap justify-content-end align-items-start'>
            <BtnShowFileUploadForm onSuccess={()=>{load()}} projectId={project.id}/>

            {hasPermission(UserPermissions.EDIT_PROJECT)
                ? 
                <>
                <TooltipButton
                    onClick={download}
                    variant='light'
                    tooltip='скачать таблицы сущностей (xlsx)'
                    disabled={awaitingDownload}
                    >{awaitingDownload? <Loading width={20}/> : <i className='bi bi-download'/>}</TooltipButton>
                <BtnAskConfirmation
                    variant='info'
                    prompt={project.is_public 
                        ? 'Вы уверены, что хотите скрыть проект? Просматривать скрытые проекты могут только его участники'
                        : 'Вы уверены, что хотите опубликовать проект? Просматривать опубликованные проекты могут все пользователи сайта'
                    }
                    onConfirm={()=>{(project.is_public ? unpublishProject(project.id): publishProject(project.id)).then(res=>load())}}
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
            </Col>
            <Col xl={12}>
                <UpdatedAt entity={project}/>
            </Col>
        </Row>
        <Card><Row>
            <Col className='mb-2 position-relative' xs={12} sm={4} xl={2}>
                <Badge className='position-absolute translate-middle-y rounded-pill end-0 top-0'>
                    {project.num_dishes?.current}/{project.num_dishes?.max}
                </Badge>
                <Link to='/dishes/all'>
                <Button className='w-100' variant='light'>Блюда</Button>
                </Link>
                
            </Col>
            <Col className='mb-2 position-relative' xs={12} sm={4} xl={2}>
                <Badge className='position-absolute translate-middle-y rounded-pill end-0 top-0'>
                    {project.num_ingredients?.current}/{project.num_ingredients?.max}
                </Badge>
                <Link to='/ingredients/all'>
                <Button className='w-100' variant='light'>Ингредиенты</Button>
                </Link>
                
            </Col>
            <Col className='mb-2 position-relative' xs={12} sm={4} xl={2}>
                <Badge className='position-absolute translate-middle-y rounded-pill end-0 top-0'>
                    {project.num_products?.current}/{project.num_products?.max}
                </Badge>
                <Link to='/products/all'>
                <Button className='w-100' variant='light'>Продукты</Button>
                </Link>
                
            </Col>
            <Col className='mb-2 position-relative' xs={12} sm={4} xl={2}>
                <Badge className='position-absolute translate-middle-y rounded-pill end-0 top-0'>
                    {project.num_distributors?.current}/{project.num_distributors?.max}
                </Badge>
                <Link to='/distributors/all'>
                <Button className='w-100' variant='light'>Поставщики</Button>
                </Link>
                
            </Col>
            <Col className='mb-2 position-relative' xs={12} sm={4} xl={2}>
                <Badge className='position-absolute translate-middle-y rounded-pill end-0 top-0'>
                    {project.num_units?.current}/{project.num_units?.max}
                </Badge>
                <Link to='/units/all'>
                <Button className='w-100' variant='light'>Ед. изм.</Button>
                </Link>
                
            </Col>
        </Row></Card>
        </div>
    )
}

export default ProjectDetails;