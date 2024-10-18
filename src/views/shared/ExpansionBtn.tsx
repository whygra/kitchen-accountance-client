import { Children, ReactElement } from "react"
import TooltipButton from "./TooltipButton"

export interface ExpansionBtnProps {
    id: number
    onClick:(id:number)=>void
    tooltip: string
    children:ReactElement
    variant: string
}

function ExpansionBtn({onClick, id, tooltip, children, variant}:ExpansionBtnProps) {
    return(
        <TooltipButton
            onClick={()=>onClick(id)}
            tooltip={tooltip}
            variant={variant}
        >{children}</TooltipButton>
    )
}
export default ExpansionBtn