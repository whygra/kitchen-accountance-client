import { Link } from 'react-router-dom';
import { SaleActDTO } from '../../../../api/storage/saleActs';
import { SaleActField } from '../../../../hooks/sort/useSortSaleAct';
import GridTableRow, { WindowSize } from '../../../shared/GridTableRow';


interface SaleActsTableItemProps {
    saleAct: SaleActDTO
    fieldsToExclude?: SaleActField[]
  }

function SaleActsTableItem({saleAct, fieldsToExclude}: SaleActsTableItemProps) 
{  
    const cells = [
        {   
            displayAt: WindowSize.Lg,
            field: SaleActField.Id,
            element: 
                <>{saleAct.id}</>,
            span: 1
        },
        {   
            field: SaleActField.Date,
            element: 
                <Link to={`/sale-acts/details/${saleAct.id}`}>{saleAct.date}</Link>,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: SaleActField.AmtItems,
            element: 
                <>{saleAct.items?.reduce((total, item)=>total+(item.amount??0), 0)}</>,
            span: 2
        },
        {   
            displayAt: WindowSize.Sm,
            field: SaleActField.TotalCost,
            element: 
                <>{saleAct.items?.reduce((total, item)=>total+(item.amount??0)*(item.price??0), 0)}</>,
            span: 2
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default SaleActsTableItem;