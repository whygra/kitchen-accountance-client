import { Link } from 'react-router-dom';
import { ProductDTO } from '../../../api/nomenclature/products';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import { Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import GridTableRow, { WindowSize } from '../../shared/GridTableRow';


interface ProductsTableItemProps {
    product: ProductDTO
    fieldsToExclude?: ProductField[]
  }

function ProductsTableItem({product, fieldsToExclude}: ProductsTableItemProps) 
{      
    const cells = [
        {   
            displayAt: WindowSize.Xl,
            field: ProductField.Id,
            element: 
                <>{product.id}</>,
            span: 1
        },
        {   
            field: ProductField.Name,
            element: 
                <Link to={`/products/details/${product.id}`}>{product.name}</Link>,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: ProductField.Category,
            element: 
                product.category?<Link to={`/product-categories/details/${product.category.id}`}>{product.name}</Link>:<>-без категории-</>,
            span: 3
        },
        {   
            displayAt: WindowSize.Sm,
            field: ProductField.Group,
            element: 
                product.group?<Link to={`/product-groups/details/${product.group.id}`}>{product.name}</Link>:<>-без группы-</>,
            span: 3
        },
    ]
    return(
        <GridTableRow cells={cells} fieldsToExclude={fieldsToExclude}/>
    )
}

export default ProductsTableItem;