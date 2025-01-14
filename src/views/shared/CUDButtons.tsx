import BtnAskConfirmation from "./BtnAskConfirmation"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { authContext } from "../../context/AuthContextProvider"
import { UserPermissions } from "../../models"
import TooltipButton from "./TooltipButton"
import { projectContext } from "../../context/ProjectContextProvider"

interface CUDButtonsProps {
    entity: {id:number, name:string}
    requiredPermission: UserPermissions
    path: string
    deleteFn: (id:number)=>void
}

function CUDButtons({entity, requiredPermission, path, deleteFn}:CUDButtonsProps) {

    const {hasPermission} = useContext(projectContext)

    return hasPermission(requiredPermission) ? (
        <div className="d-flex justify-content-end">
            <Link to={`/${path}/create/copy/${entity.id}`}>
                <TooltipButton
                    tooltip="Копировать"
                    variant='secondary'
                >
                    <i className="bi bi-copy"/>
                </TooltipButton>
            </Link>
            <Link to={`/${path}/edit/${entity.id}`}>
                <TooltipButton
                    tooltip="Редактировать"
                    variant='warning'
                >
                    <i className="bi bi-pencil"/>
                </TooltipButton>
            </Link>
            <div>
                <BtnAskConfirmation
                    tooltip='Удалить'
                    variant='danger'
                    onConfirm={()=>deleteFn(entity.id)}
                    prompt={`Вы уверены, что хотите удалить данные "${entity.name}" и все связи?`}
                >
                    <i className="bi bi-x-lg"/>

                </BtnAskConfirmation>
            </div>
        </div>
    ) : (<></>)
}

export default CUDButtons