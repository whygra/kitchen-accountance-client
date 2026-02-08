import { OverlayTrigger, Tooltip } from "react-bootstrap";


interface TooltipIconProps {
    tooltip: string
    textColor?: 'warning'|'primary'|'secondary'|'danger'|'success'|'info'|'black'|'white'|'light'|'dark'
    bgColor?: 'warning'|'primary'|'secondary'|'danger'|'success'|'info'|'black'|'white'|'light'|'dark'
    icon: string
}

function TooltipIcon({
    tooltip,
    textColor,
    bgColor,
    icon,
}:TooltipIconProps) {
    return (
        <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>
            <i className={`ms-1 text-${textColor} bg-${bgColor} bi bi-${icon}`}></i>
        </OverlayTrigger>
    )
}

export default TooltipIcon