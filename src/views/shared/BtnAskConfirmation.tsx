import { ReactElement, useContext } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { appContext } from "../../context/AppContextProvider"
import ConfirmationDialog from "./ConfirmationDialog"
import TooltipButton from "./TooltipButton"

interface BtnAskConfirmationProps {
    tooltip: string
    variant: string
    prompt: string
    onConfirm: ()=>void
    children: ReactElement|string
}
function BtnAskConfirmation({children, prompt, onConfirm, tooltip, variant}:BtnAskConfirmationProps) {

    const {showModal, hideModal} = useContext(appContext)
    
    function showDialog(){
        showModal(
          <ConfirmationDialog
            prompt={prompt}
            onConfirm={()=>{
              onConfirm()
              hideModal()
            }}
            onCancel={hideModal}
          />
        )
    }

    return(
      <TooltipButton
        tooltip={tooltip}
        variant={variant}
        onClick={showDialog}
      >{children}</TooltipButton>
    )
}

export default BtnAskConfirmation