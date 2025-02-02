import { ReactElement, useContext } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { appContext } from "../../context/AppContextProvider"
import ConfirmationDialog from "./ConfirmationDialog"

interface TooltipButtonProps {
    disabled?: boolean
    tooltip: string
    variant: string
    onClick?: ()=>void
    type?:"button" | "submit" | "reset" | undefined
    children: ReactElement|string
}
function TooltipButton({disabled, children, tooltip, variant, onClick, type}:TooltipButtonProps) {

    return(
        <OverlayTrigger
        overlay={
          <Tooltip>
            {tooltip}
          </Tooltip>
        }
      >
        <Button type={type??'button'} className="ms-1" disabled={disabled} variant={variant} onClick={onClick}>{children}</Button>
      </OverlayTrigger>
    )
}

export default TooltipButton