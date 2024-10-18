import { ReactElement, useContext } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { appContext } from "../../context/AppContextProvider"
import ConfirmationDialog from "./ConfirmationDialog"

interface SmallTooltipButtonProps {
    disabled?: boolean
    tooltip: string
    onClick?: ()=>void
    children: ReactElement|string
}
function SmallTooltipButton({disabled, children, tooltip, onClick}:SmallTooltipButtonProps) {

    return(
        <OverlayTrigger
        overlay={
          <Tooltip>
            {tooltip}
          </Tooltip>
        }
      >
        <button
          disabled={disabled} 
          onClick={onClick} 
          style={{width:'20px',height:'20px'}} 
          type="button" 
          className='p-0 m-1 btn btn-outline-secondary rounded-circle d-flex justify-content-center align-items-center text-center'
        >
          {children}
        </button>

      </OverlayTrigger>
    )
}

export default SmallTooltipButton