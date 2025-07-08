import { Link } from 'react-router-dom';
import { InventoryActDTO } from '../../../../api/storage/inventoryActs';
import { InventoryActField } from '../../../../hooks/sort/useSortInventoryAct';
import GridTableRow, { WindowSize } from '../../../shared/GridTableRow';


interface InventoryActsTableItemProps {
    inventoryAct: InventoryActDTO
    fieldsToExclude?: InventoryActField[]
  }

function InventoryActsTableItem({inventoryAct, fieldsToExclude}: InventoryActsTableItemProps) 
{  
    const cells = [
        {   
            displayAt: WindowSize.Lg,
            field: InventoryActField.Id,
            element: 
                <>{inventoryAct.id}</>,
            span: 1
        },
        {   
            field: InventoryActField.Date,
            element: 
                <Link to={`/inventory-acts/details/${inventoryAct.id}`}>{inventoryAct.date}</Link>,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: InventoryActField.NProducts,
            element: 
                <>{inventoryAct.products?.length}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            field: InventoryActField.NIngredients,
            element: 
                <>{inventoryAct.ingredients?.length}</>,
            span: 2
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default InventoryActsTableItem;