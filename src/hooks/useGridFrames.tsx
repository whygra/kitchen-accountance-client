import useFilterDishes from './filter/useFilterDishes';
import useSortDishes, { DishField } from './sort/useSortDishes';
import DishesTableHeader from '../views/dish/list/DishesTableHeader';
import DishCategoriesTableHeader from '../views/dishCategory/list/DishCategoriesTableHeader';
import useFilterDishCategories from './filter/useFilterDishCategories';
import useSortDishCategories, { DishCategoryField } from './sort/useSortDishCategories';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { ProductField } from './sort/useSortProducts';
import { PurchaseOptionField } from './sort/useSortPurchaseOptions';
import { IngredientField } from './sort/useSortIngredients';
import { DistributorField } from './sort/useSortDistributors';
import { ProjectField } from './sort/useSortProjects';
import { ProductCategoryField } from './sort/useSortProductCategories';
import { ProductGroupField } from './sort/useSortProductGroups';
import { IngredientCategoryField } from './sort/useSortIngredientCategories';
import { IngredientGroupField } from './sort/useSortIngredientGroups';
import { DishGroupField } from './sort/useSortDishGroups';

const COLUMN_SPANS = new Map();
COLUMN_SPANS.set(ProjectField.Id, 1);
COLUMN_SPANS.set(ProjectField.Logo, 1);
COLUMN_SPANS.set(ProjectField.Name, 1);
COLUMN_SPANS.set(ProjectField.Role, 1);

COLUMN_SPANS.set(DistributorField.Id, 1);
COLUMN_SPANS.set(DistributorField.Name, 1);

COLUMN_SPANS.set(PurchaseOptionField.Code, 1);
COLUMN_SPANS.set(PurchaseOptionField.Name, 5);
COLUMN_SPANS.set(PurchaseOptionField.Distributor, 3);
COLUMN_SPANS.set(PurchaseOptionField.NetWeight, 3);
COLUMN_SPANS.set(PurchaseOptionField.Price, 3);
COLUMN_SPANS.set(PurchaseOptionField.Product, 3);
COLUMN_SPANS.set(PurchaseOptionField.Unit, 3);

COLUMN_SPANS.set(ProductField.Id, 1);
COLUMN_SPANS.set(ProductField.Name, 5);
COLUMN_SPANS.set(ProductField.Category, 3);
COLUMN_SPANS.set(ProductField.Group, 3);

COLUMN_SPANS.set(ProductCategoryField.Id, 1);
COLUMN_SPANS.set(ProductCategoryField.Name, 1);

COLUMN_SPANS.set(ProductGroupField.Id, 1);
COLUMN_SPANS.set(ProductGroupField.Name, 1);

COLUMN_SPANS.set(IngredientField.Id, 1);
COLUMN_SPANS.set(IngredientField.Name, 5);
COLUMN_SPANS.set(IngredientField.Type, 5);
COLUMN_SPANS.set(IngredientField.Category, 3);
COLUMN_SPANS.set(IngredientField.Group, 3);

COLUMN_SPANS.set(IngredientCategoryField.Id, 1);
COLUMN_SPANS.set(IngredientCategoryField.Name, 1);

COLUMN_SPANS.set(IngredientGroupField.Id, 1);
COLUMN_SPANS.set(IngredientGroupField.Name, 1);

COLUMN_SPANS.set(DishField.Id, 2);
COLUMN_SPANS.set(DishField.Image, 1);
COLUMN_SPANS.set(DishField.Name, 3);
COLUMN_SPANS.set(DishField.Weight, 2);
COLUMN_SPANS.set(DishField.Category, 2);
COLUMN_SPANS.set(DishField.Group, 2);

COLUMN_SPANS.set(DishCategoryField.Id, 1);
COLUMN_SPANS.set(DishCategoryField.Name, 1);

COLUMN_SPANS.set(DishGroupField.Id, 1);
COLUMN_SPANS.set(DishGroupField.Name, 1);

function useGridFrames(
    fields?: 
        ProjectField[]|
        DistributorField[]|
        PurchaseOptionField[]|
        ProductField[]|
        ProductCategoryField[]|
        ProductGroupField[]|
        IngredientField[]|
        IngredientCategoryField[]|
        IngredientGroupField[]|
        DishField[]|
        DishCategoryField[]|
        DishGroupField[]
) 
{
   
    const [frames, setFrames] = useState(
        fields?.map(pf=>COLUMN_SPANS.get(pf)).reduce((sum, current)=>sum+current, 0)
    )

    useEffect(
        ()=>setFrames(
            fields?.map(pf=>COLUMN_SPANS.get(pf)).reduce((sum, current)=>sum+current, 0)??0
        ),
        [fields]
    )

    return {
        frames
    }
}

export {COLUMN_SPANS, useGridFrames};