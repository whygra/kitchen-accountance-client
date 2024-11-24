import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { ProjectDTO } from "../../../api/projects"
import { ProjectField } from "../../../hooks/sort/useSortProjects"

interface ProjectsTableItemProps {
    project: ProjectDTO
    fieldsToExclude?: ProjectField[]
}

function ProjectsTableItem({project, fieldsToExclude}:ProjectsTableItemProps) {
    return(
        <>
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==ProjectField.Id)
                ? <></>
                : <td style={{width:'1%'}}>{project.id}</td>
            }
            {
                fieldsToExclude && fieldsToExclude?.find(o=>o==ProjectField.Name)
                ? <></>
                : <td style={{width:'2%'}}><Link to={`/projects/details/${project.id}`}>{project.name}</Link></td>
            }
        </>
    )
}

export default ProjectsTableItem