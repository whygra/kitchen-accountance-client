import { Link } from 'react-router-dom';
import { PurchaseActDTO } from '../../../../api/storage/purchaseActs';
import { PurchaseActField } from '../../../../hooks/sort/useSortPurchaseAct';
import GridTableRow, { WindowSize } from '../../../shared/GridTableRow';


interface PurchaseActsTableItemProps {
    purchaseAct: PurchaseActDTO
    fieldsToExclude?: PurchaseActField[]
  }

function PurchaseActsTableItem({purchaseAct, fieldsToExclude}: PurchaseActsTableItemProps) 
{  
    const cells = [
        {   
            displayAt: WindowSize.Lg,
            field: PurchaseActField.Id,
            element: 
                <>{purchaseAct.id}</>,
            span: 1
        },
        {   
            field: PurchaseActField.Date,
            element: 
                <Link to={`/purchase-acts/details/${purchaseAct.id}`}>{purchaseAct.date}</Link>,
            span: 3
        },
        {   
            field: PurchaseActField.Distributor,
            element: 
                purchaseAct.distributor != undefined
                    ? <Link to={`/distributors/details/${purchaseAct.distributor.id}`}>{purchaseAct.distributor?.name}</Link>
                    : <>--</>
                ,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: PurchaseActField.TotalCost,
            element: 
                <>{purchaseAct.items?.reduce((total, i)=>total+i.price*(i.amount??0), 0)} руб.</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Md,
            field: PurchaseActField.NItems,
            element: 
                <>{purchaseAct.items?.length}</>,
            span: 2
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default PurchaseActsTableItem;