import { Accordion, Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProjectDTO, deleteProject as requestDeleteProject } from '../../../api/projects';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import TooltipButton from '../../shared/TooltipButton';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import { projectContext } from '../../../context/ProjectContextProvider';
import { authContext } from '../../../context/AuthContextProvider';
import ProjectsTableItem from './ProjectsTableItem';
import GridTableRow from '../../shared/GridTableRow';

interface ProjectListItemProps {
    project: ProjectDTO
    onDeleted: ()=>void
  }

function ProjectListItem({project, onDeleted}: ProjectListItemProps) 
{   
    const {project: selectedProject, selectProject: setProject, hasPermission} = useContext(projectContext)
    const {user} = useContext(authContext)
    const {showModal, hideModal} = useContext(appContext)

    const deleteProject = () => {
        requestDeleteProject(project.id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                if(selectedProject?.id==project.id)
                    setProject(null)
                onDeleted()
                hideModal()
            })
    }

    const selectProject = () => {
        setProject(project)
    }

    return (
        <div className={`w-100 text-center ${
            selectedProject?.id==project.id 
                ? 'table-primary'
                : ''
        }`}>
            <div className='position-relative w-100 pe-5'>
                <GridTableRow cells={[
                
                    {
                        span: 6,
                        element:
                            <ProjectsTableItem project={project}/>                        
                    }
                ]}
                />
                <div className='position-absolute end-0 top-0 mt-1 me-2 d-flex flex-column'>
                    {selectedProject?.id==project.id
                    ?
                    <TooltipButton
                        onClick={()=>setProject(null)}
                        tooltip='отменить выбор'
                        variant='secondary'
                    >
                        <i className='bi bi-box-arrow-right'/>
                    </TooltipButton>
                    :
                    <TooltipButton
                        onClick={selectProject}
                        tooltip='выбрать'
                        variant='primary'
                    >
                        <i className='bi bi-box-arrow-in-left'/>
                    </TooltipButton>}
                    {project.creator&&user&&project.creator?.id == user?.id
                    ?
                    <BtnAskConfirmation
                        onConfirm={deleteProject}
                        prompt={`Вы уверены, что хотите удалить проект "${project.name}" и все его данные?`}
                        tooltip='удалить'
                        variant='danger'
                    >
                        <i className='bi bi-x-lg'/>
                    </BtnAskConfirmation>
                    :
                    <></>}
                    </div>
            </div>    
        </div>
    )
}

export default ProjectListItem;