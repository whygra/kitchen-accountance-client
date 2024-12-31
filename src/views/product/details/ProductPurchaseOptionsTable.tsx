import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/ingredients";
import { ProductDTO } from "../../../api/products";
import { useState } from "react";
import { Link } from "react-router-dom";
import { calcGramCost } from "../../../models/dish/DishCostCalculatorState";
import usePagination from "../../../hooks/usePagination";
import GridTableRow, { WindowSize } from "../../shared/GridTableRow";

interface ProductPurchaseOptionsTableProps {
    product: ProductDTO
}

function ProductPurchaseOptionsTable({product}:ProductPurchaseOptionsTableProps) {
        
    const {sliceLimits, nav} = usePagination(product.ingredients?.length??0)

    return(
        
        <><h4 className="text-center">Позиции закупки</h4>


                <GridTableRow cells={[
                    {
                        displayAt: WindowSize.Md,
                        span: 3,
                        element: <b>Поставщик</b>
                    },
                    {
                        displayAt: WindowSize.Md,
                        span: 2,
                        element: <b>Код</b>
                    },
                    {
                        span: 4,
                        element: <b>Наименование</b>
                    },
                    {
                        displayAt: WindowSize.Sm,
                        span: 2,
                        element: <b>Цена</b>
                    },
                    {
                        displayAt: WindowSize.Lg,
                        span: 2,
                        element: <b>Масса нетто</b>
                    },
                    {
                        displayAt: WindowSize.Lg,
                        span: 2,
                        element: <b>Ед. изм.</b>
                    },
                    {
                        span: 2,
                        element: <b>Стоимость 1г.</b>
                    },
                ]}/>
                    
                {product.purchase_options
                    ?.slice(sliceLimits.start, sliceLimits.end)
                    .map(p => 
                        <GridTableRow cells={[
                            {
                                displayAt: WindowSize.Md,
                                span: 3,
                                element: <>{p.distributor?.name}</>
                            },
                            {
                                displayAt: WindowSize.Md,
                                span: 2,
                                element: <>{p.code}</>
                            },
                            {
                                span: 4,
                                element: <><Link to={`/purchase-options/details/${p.id}`}>{p.name}</Link></>
                            },
                            {
                                displayAt: WindowSize.Sm,
                                span: 2,
                                element: <>{p.price}₽</>
                            },
                            {
                                displayAt: WindowSize.Lg,
                                span: 2,
                                element: <>{p.net_weight}г.</>
                            },
                            {
                                displayAt: WindowSize.Lg,
                                span: 2,
                                element: <>{p.unit?.short}</>
                            },
                            {
                                span: 2,
                                element: <>{(p.price && p.net_weight) ? (p.price / p.net_weight).toFixed(2) : '?'} ₽/г.</>
                            },
                        ]}/>
                    )
                }
                    
        {nav}
        </>
    )
}

export default ProductPurchaseOptionsTable;