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
        <tr className={`w-100 text-center pe-3 ${
            selectedProject?.id==project.id 
                ? 'table-primary'
                : ''
        }`}>
            <td><Image width={60} src={`${project.logo?.url}`}/></td>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.role?.name}</td>
            <td>
                <div className='d-flex flex-row'>
                    {
                        selectedProject?.id==project.id
                        ?
                        <TooltipButton
                            onClick={()=>setProject(null)}
                            tooltip='выбрать'
                            variant='secondary'
                        >
                            U
                        </TooltipButton>
                        :
                        <TooltipButton
                            onClick={selectProject}
                            tooltip='выбрать'
                            variant='primary'
                        >
                            S
                        </TooltipButton>
                    }
                    {
                        project.creator&&user&&project.creator?.id == user?.id
                        ?
                        <BtnAskConfirmation
                            onConfirm={deleteProject}
                            prompt={`Вы уверены, что хотите удалить проект "${project.name}" и все его данные?`}
                            tooltip='удалить'
                            variant='danger'
                        >
                            D
                        </BtnAskConfirmation>
                        :
                        <></>
                    }
                </div>
            </td>
        </tr>
    )
}

export default ProjectListItem;