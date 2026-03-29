import { Link } from 'react-router-dom';
import { WriteOffActDTO } from '../../../../api/storage/writeOffActs';
import { WriteOffActField } from '../../../../hooks/sort/useSortWriteOffAct';
import GridTableRow, { WindowSize } from '../../../shared/GridTableRow';


interface WriteOffActsTableItemProps {
    writeOffAct: WriteOffActDTO
    fieldsToExclude?: WriteOffActField[]
  }

function WriteOffActsTableItem({writeOffAct, fieldsToExclude}: WriteOffActsTableItemProps) 
{  
    const cells = [
        {   
            displayAt: WindowSize.Lg,
            field: WriteOffActField.Id,
            element: 
                <>{writeOffAct.id}</>,
            span: 1
        },
        {   
            field: WriteOffActField.Date,
            element: 
                <Link to={`/write-off-acts/details/${writeOffAct.id}`}>{writeOffAct.date}</Link>,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: WriteOffActField.NProducts,
            element: 
                <>{writeOffAct.products?.length}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            field: WriteOffActField.NIngredients,
            element: 
                <>{writeOffAct.ingredients?.length}</>,
            span: 2
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default WriteOffActsTableItem;