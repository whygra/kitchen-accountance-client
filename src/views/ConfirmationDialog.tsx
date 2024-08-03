import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

interface ConfirmationDialogProps {
  onConfirm: ()=>void
  onCancel: ()=>void
  prompt: string
}

function ConfirmationDialog({
  onConfirm,
  onCancel,
  prompt,
}: ConfirmationDialogProps) 
{
  const [disabled, setDisabled] = useState(false)

  function confirm(){
    setDisabled(true)
    onConfirm()
  }

  function cancel(){
    setDisabled(true)
    onCancel()
  }

  return (
    <Container className="px-4 pb-1">
        <Row className="pb-5 px-2 pt-2">
            {prompt}
        </Row>
        <Row>
            <p className="d-flex justify-content-between">
                <Button disabled={disabled} onClick={confirm} variant="primary">Подтвердить</Button>
                <Button disabled={disabled} onClick={cancel} variant="secondary">Отмена</Button>
            </p>
        </Row>
    </Container>
  )
}

export default ConfirmationDialog;