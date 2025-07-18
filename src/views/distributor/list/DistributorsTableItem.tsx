import { Link } from "react-router-dom"
import { PurchaseOptionDTO } from "../../../api/nomenclature/purchaseOptions"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import { DistributorDTO } from "../../../api/nomenclature/distributors"
import { DistributorField } from "../../../hooks/sort/useSortDistributors"
import { Image } from "react-bootstrap"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface DistributorsTableItemProps {
    distributor: DistributorDTO
    fieldsToExclude?: DistributorField[]
}

function DistributorsTableItem({distributor, fieldsToExclude}:DistributorsTableItemProps) {

    const cells = [
        {   
            displayAt: WindowSize.Lg,
            field: DistributorField.Id,
            element: 
                <>{distributor.id}</>,
            span: 1
        },
        {   
            field: DistributorField.Name,
            element: 
                <Link to={`/distributors/details/${distributor.id}`}>{distributor.name}</Link>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default DistributorsTableItem