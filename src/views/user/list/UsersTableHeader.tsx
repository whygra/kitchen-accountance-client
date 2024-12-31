import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

function UsersTableHeader(){
    const cells = [
        {   
            element: <b>Имя пользователя</b>,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            element: <b>Email</b>,
            span: 2
        },
        {   
            element: <b>Роль</b>,
            span: 2
        },
    ]
    return (
            <GridTableRow cells={cells}/>
    )
}

export default UsersTableHeader