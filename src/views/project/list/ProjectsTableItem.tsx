import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { ProjectDTO } from "../../../api/projects"
import { ProjectField } from "../../../hooks/sort/useSortProjects"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"
import { Image } from "react-bootstrap"

interface ProjectsTableItemProps {
    project: ProjectDTO
    fieldsToExclude?: ProjectField[]
}

function ProjectsTableItem({project, fieldsToExclude}:ProjectsTableItemProps) {
    const cells = [
        {   
            displayAt: WindowSize.Sm,
            field: ProjectField.Id,
                element: 
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
                </div>,
            span: 1
        },
        {   
            displayAt: WindowSize.Lg,
            field: ProjectField.Id,
            element: 
                <>{project.id}</>,
            span: 1
        },
        {   
            field: ProjectField.Name,
            element: 
                <Link to={`/projects/details/${project.id}`}>{project.name}</Link>,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: ProjectField.Role,
            element: 
                <>{project.role?.name}</>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default ProjectsTableItem