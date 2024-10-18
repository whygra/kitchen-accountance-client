import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductPurchaseOptionsTable from '../details/ProductPurchaseOptionsTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { deleteIngredient as requestDeleteIngredient } from '../../../api/ingredients';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { ProductDTO } from '../../../api/products';
import { UserPermissions } from '../../../models';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import { ProductField } from '../../../hooks/sort/useSortProducts';


interface ProductsTableItemProps {
    product: ProductDTO
    fieldsToExclude?: ProductField[]
  }

function ProductsTableItem({product, fieldsToExclude}: ProductsTableItemProps) 
{      
    return (
        <>
            {fieldsToExclude && fieldsToExclude?.find(f=>f==ProductField.Id)
                ? <></>
                : <td width={1} className='text-end'>{product.id}</td>
            }
            {fieldsToExclude && fieldsToExclude?.find(f=>f==ProductField.Name)
                ? <></>
                : <td width={6} className='text-center'>{product.name}</td>
            }
            {fieldsToExclude && fieldsToExclude?.find(f=>f==ProductField.Category)
                ? <></>
                : <td width={5} className='text-center'>{product.category?.name ?? 'без категории'}</td>
            }
        </>
    )
}

export default ProductsTableItem;