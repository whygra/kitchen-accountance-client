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
  return (
    <Container className="px-4 pb-1">
        <Row className="pb-5 px-2 pt-2">
            {prompt}
        </Row>
        <Row>
            <p className="d-flex justify-content-between">
                <Button onClick={onConfirm} variant="primary">Подтвердить</Button>
                <Button onClick={onCancel} variant="secondary">Отмена</Button>
            </p>
        </Row>
    </Container>
  )
}

export default ConfirmationDialog;