import DistributorForm from '../views/distributor/form/DistributorForm';
import { getDistributorWithPurchaseOptions, postDistributorWithPurchaseOptions, putDistributorWithPurchaseOptions } from '../api/distributors';
import { DistributorFormState, DISTRIBUTOR_FORM_INIT_STATE, PurchaseOptionFormState } from '../models/DistributorFormState';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { useEffect, useState } from 'react';
import { distributorFormContext } from '../context';
import { UnitDTO, getUnits } from '../api/units';
import { ProductDTO, getProducts } from '../api/products';

interface DistributorFormControllerProps{
    action: DataAction
}

function getPurchaseOptionFormInitState() : PurchaseOptionFormState
{return {
    key: uuid(),
    id: 0,
    dataAction: DataAction.Create,
    productDataAction: DataAction.None,
    productId: 0,
    productName: '',
    unitDataAction: DataAction.None,
    unitId: 0,
    unitLongName: '',
    unitShortName: '',
    name: "", 
    netWeight: 0,
    price: 0,
}}

function DistributorFormController({action}:DistributorFormControllerProps) 
{  
  const [formState, setFormState] = useState<DistributorFormState>(DISTRIBUTOR_FORM_INIT_STATE)
  const [isLoading, setIsLoading] = useState(false)
  const [units, setUnits] = useState<UnitDTO[]>([]) 
  const [products, setProducts] = useState<ProductDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadDistributor()

    setUnits(await getUnits()??[]);
    setProducts(await getProducts()??[]);

    setIsLoading(false)
  }

  async function loadDistributor() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id ингредиента")

    const distributor = await getDistributorWithPurchaseOptions(parseInt(id))

    if (distributor === null)
        throw Error("Не удалось получить данные об ингредиенте")

    setFormState({
        id: distributor.id,
        name: distributor.name,
        purchaseOptionForms: distributor.purchase_options
            .map(c=>{ return {
                dataAction: DataAction.None,
                key: uuid(),
                id: c.id,
                productId: c.product.id,
                productName: c.product.name,
                productDataAction: DataAction.None,
                unitId: c.unit.id,
                unitLongName: c.unit.long,
                unitShortName: c.unit.short,
                unitDataAction: DataAction.None,
                name: c.name,
                netWeight: c.net_weight,
                price: c.price,
            }}),
    })
  }

  function setName(name: string) {
    setFormState({...formState, name:name})
  }

  function addPurchaseOptionForm() {
    setFormState({
      ...formState, 
      purchaseOptionForms:
        [
          ...formState.purchaseOptionForms,
          getPurchaseOptionFormInitState()
        ]})
  }

function setPurchaseOptionFormState(state:PurchaseOptionFormState) {
  setFormState({
    ...formState,
    purchaseOptionForms: formState.purchaseOptionForms
    .map(s=>s.key == state.key ? state : s)
  })
}

  function removePurchaseOptionForm(key:string){
    const index = formState.purchaseOptionForms.findIndex(s=>s.key==key)

    // если id <= 0 записи нет в бд - просто убираем из коллекции
    if (formState.purchaseOptionForms[index].id <= 0)
      setFormState({
        ...formState,
        purchaseOptionForms: 
          formState.purchaseOptionForms
          .filter((s, i)=>i!=index)
      })
      
    // иначе - помечаем на удаление
    else 
      setFormState({
        ...formState,
        purchaseOptionForms: 
          formState.purchaseOptionForms
          .map((s, i)=>{
            return i==index 
              ? {...s, dataAction: DataAction.Delete} 
              : s
            })
      })
  }

  function update() {
    return putDistributorWithPurchaseOptions({
      id: formState.id,
      name: formState.name,
      purchase_options: formState.purchaseOptionForms
        .map(o=>{ return {
          key: uuid(),
          data_action: o.dataAction,
          id: o.id,
          product: {
            id: o.productId,
            name: o.productName,
          },
          product_data_action: o.productDataAction,
          unit: {
            id: o.unitId,
            long: o.unitLongName,
            short: o.unitShortName,
          },
          unit_data_action: o.unitDataAction,
          name: o.name,
          net_weight: o.netWeight,
          price: o.price,
        }}),
    })
  }

  function create() {
    return postDistributorWithPurchaseOptions({
      name: formState.name,
      purchase_options: formState.purchaseOptionForms
        .map(o=>{ return {
          key: uuid(),
          data_action: o.dataAction,
          id: o.id,
          product: {
            id: o.productId,
            name: o.productName,
          },
          product_data_action: o.productDataAction,
          unit: {
            id: o.unitId,
            long: o.unitLongName,
            short: o.unitShortName,
          },
          unit_data_action: o.unitDataAction,
          name: o.name,
          net_weight: o.netWeight,
          price: o.price,
        }}),
      })
  }
  
  return isLoading ? (<>Loading...</>) : (
    <distributorFormContext.Provider value={{
      addPurchaseOptionForm: addPurchaseOptionForm,
      setPurchaseOptionFormState: setPurchaseOptionFormState,
      removePurchaseOptionForm: removePurchaseOptionForm,
      formState: formState,
      units: units,
      products: products,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    <DistributorForm/>
    </distributorFormContext.Provider>
  )
}

export default DistributorFormController
