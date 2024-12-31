import { useState } from "react"
import HeaderSortButton from "../../shared/HeaderSortButton"
import TooltipButton from "../../shared/TooltipButton"
import { Form } from "react-bootstrap"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

function UnitsTableHeader(){
    const cells = [
        {   
            displayAt: WindowSize.Sm,
            element: <b>Краткое наименование</b>,
            span: 2
        },
        {   
            element: <b>Полное наименование</b>,
            span: 2
        },
    ]
    return (
        <GridTableRow cells={cells}/>
    )
}

export default UnitsTableHeader