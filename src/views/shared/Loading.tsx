import { ReactElement, useContext } from "react"
import { Button, Container, Image, OverlayTrigger, Tooltip } from "react-bootstrap"
import { appContext } from "../../context/AppContextProvider"
import ConfirmationDialog from "./ConfirmationDialog"
import TooltipButton from "./TooltipButton"

function Loading() {

    return(
        <div className="d-flex justify-content-center">

        <Image width={'40px'} style={{filter: 'hue-rotate(210deg)'}} src='/icons/icons8-loading.gif'/>
        </div>
    )
}

export default Loading