import { ProductDTO } from '../../../api/products';
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
            {fieldsToExclude && fieldsToExclude?.find(f=>f==ProductField.Group)
                ? <></>
                : <td width={5} className='text-center'>{product.group?.name ?? 'без группы'}</td>
            }
        </>
    )
}

export default ProductsTableItem;