import { ReactElement } from "react"
import { Modal } from "react-bootstrap"

interface ModalWrapperProps {
    show: boolean
    onHide: ()=>void
    children: ReactElement
    header?: ReactElement|string
}


function ModalWrapper({show, onHide, children, header}:ModalWrapperProps){
    return (
        <Modal size='xl' show={show} onHide={onHide}>
        <Modal.Header closeButton>
            {header}
        </Modal.Header>
            {children}
        </Modal>
    )
}

export default ModalWrapper