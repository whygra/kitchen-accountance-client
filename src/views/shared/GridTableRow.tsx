import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"
import { ReactElement, useEffect, useState } from "react"
import { ProjectField } from "../../hooks/sort/useSortProjects"
import { DistributorField } from "../../hooks/sort/useSortDistributors"
import { PurchaseOptionField } from "../../hooks/sort/useSortPurchaseOptions"
import { ProductField } from "../../hooks/sort/useSortProducts"
import { ProductCategoryField } from "../../hooks/sort/useSortProductCategories"
import { ProductGroupField } from "../../hooks/sort/useSortProductGroups"
import { IngredientField } from "../../hooks/sort/useSortIngredients"
import { IngredientCategoryField } from "../../hooks/sort/useSortIngredientCategories"
import { IngredientGroupField } from "../../hooks/sort/useSortIngredientGroups"
import { DishField } from "../../hooks/sort/useSortDishes"
import { DishCategoryField } from "../../hooks/sort/useSortDishCategories"
import { DishGroupField } from "../../hooks/sort/useSortDishGroups"
import { useMediaQuery } from "react-responsive"


enum WindowSize {
    Xs = 0,
    Sm = 1,
    Md = 2,
    Lg = 3,
    Xl = 4,
    Xxl = 5,
}

interface GridTableRowProps<
    T extends 
    ProjectField|
    DistributorField|
    PurchaseOptionField|
    ProductField|
    ProductCategoryField|
    ProductGroupField|
    IngredientField|
    IngredientCategoryField|
    IngredientGroupField|
    DishField|
    DishCategoryField|
    DishGroupField
> {
    cells: 
        {
            field?: T,
            element:ReactElement, 
            span:number,
            displayAt?:WindowSize
        }[],
    fieldsToExclude?: T[],
}

function GridTableRow<
    T extends 
    ProjectField|
    DistributorField|
    PurchaseOptionField|
    ProductField|
    ProductCategoryField|
    ProductGroupField|
    IngredientField|
    IngredientCategoryField|
    IngredientGroupField|
    DishField|
    DishCategoryField|
    DishGroupField
>({cells, fieldsToExclude}:GridTableRowProps<T>) {

    const isXs = useMediaQuery({maxWidth: 575})
    const isSm = useMediaQuery({minWidth: 576, maxWidth: 767})
    const isMd = useMediaQuery({minWidth: 768, maxWidth: 991})
    const isLg = useMediaQuery({minWidth: 992, maxWidth: 1199})
    const isXl = useMediaQuery({minWidth: 1200, maxWidth: 1399})
    const isXxl = useMediaQuery({minWidth: 1400})

    const [ws, setWS] = useState(WindowSize.Lg)
    useEffect(()=>setWS(
        isXs ? WindowSize.Xs
            : isSm ? WindowSize.Sm
                : isMd ? WindowSize.Md
                    : isLg ? WindowSize.Lg
                        : isXl ? WindowSize.Xl
                            : isXxl ? WindowSize.Xxl
                                : WindowSize.Xxl
    ),[isXs, isSm, isMd, isLg, isXl, isXxl])
    
    const filteredCells = cells
        .filter(c=>c.field==undefined || !(fieldsToExclude?.includes(c.field)??false))
        .filter(c=>(c.displayAt??WindowSize.Xs)<=ws)
            
    const frames = filteredCells.reduce((total, current)=>total+current.span, 0)
    return(
        <div
            style={{display: 'grid', gridTemplateColumns: `repeat(${frames}, 1fr)`}}
            className='w-100 text-center py-2'
        >
            {filteredCells.map(c=>
                <div
                    style={{gridColumn: `span ${c.span}`}}
                >{c.element}</div>
            )}
        </div>
    )
}

export {WindowSize, GridTableRow as default}