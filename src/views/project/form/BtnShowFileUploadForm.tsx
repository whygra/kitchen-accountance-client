import { useContext } from "react"
import { appContext } from "../../../context/AppContextProvider"
import { DistributorPurchaseOptionColumnIndexes } from "../../../api/nomenclature/purchaseOptions"
import { uploadDistributorPurchaseOptionsSpreadsheet } from "../../../api/nomenclature/distributors"
import SpreadsheetUploadForm, { ColumnIndex } from "./SpreasheetUploadForm"
import { Button, Form } from "react-bootstrap"
import { authContext } from "../../../context/AuthContextProvider"
import { UserPermissions } from "../../../models"
import { projectContext } from "../../../context/ProjectContextProvider"
import { uploadSheets } from "../../../api/nomenclature/projects"
import TooltipButton from "../../shared/TooltipButton"

interface BtnShowFileUploadFormProps {
    projectId: number
    onSuccess: ()=>void
}

function BtnShowFileUploadForm({onSuccess, projectId}:BtnShowFileUploadFormProps) {
    
    const {hasPermission} = useContext(projectContext)
    if(!hasPermission(UserPermissions.EDIT_PROJECT))
        return (<></>)

    const {showModal, hideModal} = useContext(appContext)
    async function uploadFile(file:File){
        
        await uploadSheets(file, projectId).catch(e=>showModal(<>{e.message}</>, <h3>Ошибка</h3>))
        hideModal()
        onSuccess()
    }

    function showFileInput() {
        showModal(
            <SpreadsheetUploadForm
                onCommit={uploadFile}
                onCancel={hideModal}
            />,
            <h5>
                Выбор файла
            </h5>
        )
    }

    return (
        
        <TooltipButton
        onClick={showFileInput}
        variant='light'
        tooltip='импортировать данные'
        ><i className='bi bi-upload'/>
        </TooltipButton>
    )
}

export default BtnShowFileUploadForm