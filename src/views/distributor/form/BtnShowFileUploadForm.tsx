import { useContext } from "react"
import { appContext } from "../../../context/AppContextProvider"
import { DistributorPurchaseOptionColumnIndexes } from "../../../api/nomenclature/purchaseOptions"
import { uploadDistributorPurchaseOptionsSpreadsheet } from "../../../api/nomenclature/distributors"
import SpreadsheetUploadForm, { ColumnIndex } from "./SpreasheetUploadForm"
import { Button, Form } from "react-bootstrap"
import { authContext } from "../../../context/AuthContextProvider"
import { UserPermissions } from "../../../models"
import { projectContext } from "../../../context/ProjectContextProvider"
import TooltipButton from "../../shared/TooltipButton"

interface BtnShowFileUploadFormProps {
    distributorId: number
    onSuccess: ()=>void
}

function BtnShowFileUploadForm({onSuccess, distributorId}:BtnShowFileUploadFormProps) {
    const {hasPermission} = useContext(projectContext)
    if(!hasPermission(UserPermissions.CRUD_DISTRIBUTORS))
        return (<></>)

    const {showModal, hideModal} = useContext(appContext)
    async function uploadFile(file:File, columnIndexes:ColumnIndex[]){
        const zeroBasedIndexes = columnIndexes.map(c=>{return{...c, index:c.index==undefined?c.index:c.index-1 }})
        const column_indexes : DistributorPurchaseOptionColumnIndexes = {
            name: zeroBasedIndexes.find(c=>c.name=='name')?.index,
            net_weight: zeroBasedIndexes.find(c=>c.name=='net_weight')?.index,
            code: zeroBasedIndexes.find(c=>c.name=='code')?.index,
            unit: zeroBasedIndexes.find(c=>c.name=='unit')?.index,
            price: zeroBasedIndexes.find(c=>c.name=='price')?.index,
        }
        
        await uploadDistributorPurchaseOptionsSpreadsheet({
            id: distributorId,
            column_indexes: column_indexes,
            file: file,
        }).catch(e=>showModal(<>{e.message}</>, <h3>Ошибка</h3>))
        hideModal()
        onSuccess()
    }

    function showFileInput() {
        showModal(
            <SpreadsheetUploadForm
            columnIndexes={[
                {name:'code', viewName:'Код', index:1},
                {name:'name', viewName:'Наименование', index:2},
                {name:'unit', viewName:'Ед. изм.', index:3},
                {name:'net_weight', viewName:'Масса нетто', index:4},
                {name:'price', viewName:'Цена', index:5},
            ]}
            onCommit={uploadFile}
            onCancel={hideModal}
            />,
            <h5>
                Выберите номера столбцов, в которых располагаются соответствующие данные
            </h5>
        )
    }

    return (
        <TooltipButton 
            variant="light" 
            onClick={showFileInput}
            tooltip="импорт прайс-листа (xlsx)"
        >
            <i className="bi bi-upload"/>
        </TooltipButton>
    )
}

export default BtnShowFileUploadForm