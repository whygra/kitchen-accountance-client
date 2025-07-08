import { Link } from "react-router-dom"
import { UnitDTO } from "../../../api/nomenclature/units"
import ExpansionBtn, { ExpansionBtnProps } from "../../shared/ExpansionBtn"
import GridTableRow, { WindowSize } from "../../shared/GridTableRow"

interface UnitsTableItemProps {
    unit: UnitDTO
}

function UnitsTableItem({unit}:UnitsTableItemProps) {
    const cells = [
        {   
            displayAt: WindowSize.Sm,
            element: <>{unit.short}</>,
            span: 2
        },
        {   
            element: <>{unit.long}</>,
            span: 2
        },
    ]
    return (
            <GridTableRow cells={cells}/>
    )
}

export default UnitsTableItem