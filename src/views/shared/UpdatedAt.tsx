import { ReactElement, useContext } from "react"
import { Button, Container, Image, OverlayTrigger, Tooltip } from "react-bootstrap"
import { appContext } from "../../context/AppContextProvider"
import ConfirmationDialog from "./ConfirmationDialog"
import TooltipButton from "./TooltipButton"
import { UserDTO } from "../../api/users"

interface UpdatedAtProps{
    entity: {updated_at?: string, updated_by_user?: UserDTO}
}

function UpdatedAt({entity}:UpdatedAtProps) {
    const date = new Date(entity.updated_at??'')
    return(
        <i className='text-center text-secondary'><small>изменено <u>{date.toLocaleDateString()}</u> в <u>{date.toLocaleTimeString()}</u> пользователем "<u>{entity.updated_by_user?.name}</u>"</small></i>
    )
}

export default UpdatedAt