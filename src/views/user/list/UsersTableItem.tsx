import { Link } from "react-router-dom"
import { UserDTO } from "../../../api/users"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface UsersTableItemProps {
    user: UserDTO
}

function UsersTableItem({user}:UsersTableItemProps) {
    
    const cells = [
        {   
            element: <>{user.name}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            element: <>{user.email}</>,
            span: 2
        },
        {   
            element: <>{user.role?.name ?? '-нет-'}</>,
            span: 2
        },
    ]
    return (
            <GridTableRow cells={cells}/>
    )
}

export default UsersTableItem