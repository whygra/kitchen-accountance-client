import BtnAskConfirmation from "./BtnAskConfirmation"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { authContext } from "../../context/AuthContextProvider"
import { UserPermissions } from "../../models"
import TooltipButton from "./TooltipButton"
import { projectContext } from "../../context/ProjectContextProvider"

interface FormListButtonsProps {
    addFn: () => void
    deleteAllFn: ()=>void
}

function FormListButtons({addFn, deleteAllFn}:FormListButtonsProps) {

    return (
        
      <div className="d-flex flex-row-reverse my-3">

      <TooltipButton
        tooltip='добавить'
        variant='success'
        onClick={addFn}
      ><i className='bi bi-plus-lg'/></TooltipButton>

      <BtnAskConfirmation
        tooltip='исключить все'
        variant="danger"
        onConfirm={deleteAllFn}
        prompt='удалить все элементы? несохраненные данные будут потеряны'
      ><i className='bi bi-x-lg'/></BtnAskConfirmation>
    </div>
    )
}

export default FormListButtons