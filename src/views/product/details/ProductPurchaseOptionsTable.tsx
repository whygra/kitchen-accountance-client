import { Table } from "react-bootstrap";
import { IngredientDTO } from "../../../api/nomenclature/ingredients";
import { ProductDTO } from "../../../api/nomenclature/products";
import { useState } from "react";
import { Link } from "react-router-dom";
import { calcGramCost } from "../../../models/dish/DishCostCalculatorState";
import usePagination from "../../../hooks/usePagination";
import GridTableRow, { WindowSize } from "../../shared/GridTableRow";
import TooltipIcon from "../../shared/TooltipIcon";

interface ProductPurchaseOptionsTableProps {
    product: ProductDTO
}

function ProductPurchaseOptionsTable({product}:ProductPurchaseOptionsTableProps) {
        
    const {sliceLimits, nav} = usePagination(product.ingredients?.length??0)

    return(
        
        <div className="mb-3"><h4 className="text-center">Позиции закупки</h4>

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
                    .map(o => 
                        <div className='border-bottom'>

                        <GridTableRow cells={[
                            {
                                displayAt: WindowSize.Md,
                                span: 3,
                                element: <><Link to={`/distributors/details/${o.distributor?.id}`}>{o.distributor?.name}</Link></>
                            },
                            {
                                displayAt: WindowSize.Md,
                                span: 2,
                                element: <>{o.code}</>
                            },
                            {
                                span: 4,
                                element: <>
                                    <Link to={`/purchase-options/details/${o.id}`}>{o.name}</Link>
                                    {(o.is_relevant??true)
                                        ?<></>
                                        :<TooltipIcon tooltip="Не актуально" textColor="warning" icon="exclamation-triangle-fill"/>
                                    }
                                </>
                            },
                            {
                                displayAt: WindowSize.Sm,
                                span: 2,
                                element: <>{o.price}₽</>
                            },
                            {
                                displayAt: WindowSize.Lg,
                                span: 2,
                                element: <>{o.net_weight}г.</>
                            },
                            {
                                displayAt: WindowSize.Lg,
                                span: 2,
                                element: <>{o.unit?.short}</>
                            },
                            {
                                span: 2,
                                element: <>{(o.price && o.net_weight) ? (o.price / o.net_weight).toFixed(2) : '?'} ₽/г.</>
                            },
                        ]}/>
                        </div>
                    )
                }
                    
        {nav}
        </div>
    )
}

export default ProductPurchaseOptionsTable;