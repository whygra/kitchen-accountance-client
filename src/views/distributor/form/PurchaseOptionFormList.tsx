import {Button, Card, Col, Collapse, Container, Dropdown, DropdownButton, Form, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import PurchaseOptionForm from './PurchaseOptionForm'
import { useContext, useEffect, useRef, useState } from 'react'
import { distributorFormContext } from '../../../context/forms/distributor/DistributorFormContext'
import { isInvalid, PurchaseOptionFormState, purchaseOptionFormToDTO } from '../../../models/DistributorFormState';
import TooltipButton from '../../shared/TooltipButton';
import usePagination from '../../../hooks/usePagination';
import useFilterPurchaseOptions, { EMPTY_SEARCH_PARAMS } from '../../../hooks/filter/useFilterPurchaseOptions';
import useSortPurchaseOptions, { PurchaseOptionField } from '../../../hooks/sort/useSortPurchaseOptions';
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import FormListButtons from '../../shared/FormListButtons';
import useFormHotkeys from '../../../hooks/useFormHotkeys';

interface PurchaseOptionFormListProps {
  goToInvalid?: boolean
}

function PurchaseOptionFormList({goToInvalid}:PurchaseOptionFormListProps) {
  const {
    addPurchaseOptionForm,
    removeAllPurchaseOptionForms,
    setPurchaseOptionFormState,
    removePurchaseOptionForm,
    formState,
    products
  } = useContext(distributorFormContext);

  const [showFilters, setShowFilters] = useState(false)
  const {searchData, setSearchData, getPredicate} = useFilterPurchaseOptions()
  const {setSortField, sortField, setSortIsDesc, sortIsDesc, getComparer} = useSortPurchaseOptions()
  
  const [filterData, setFilterData] = useState({searchData, sortField, sortIsDesc})
  
  const filtered = formState.purchaseOptionForms
    .filter(o=>getPredicate()(purchaseOptionFormToDTO(o)))
    .sort((o1,o2)=>getComparer()(purchaseOptionFormToDTO(o1),purchaseOptionFormToDTO(o2)))
  
  const {sliceLimits, nav, goToPage, goToElement, pageLength, currentPage} = usePagination(filtered.length)

  function handleAdd(){
    if(sliceHasInvalidForm()){
      scrollIntoInvalid()
      return
    }
    addPurchaseOptionForm()
    resetFilters()
    goToPage(-1)
  }

  function applyFilters() {
    if(sliceHasInvalidForm()){
      scrollIntoInvalid()
      return
    }
    setSearchData(filterData.searchData)
    setSortField(filterData.sortField)
    setSortIsDesc(filterData.sortIsDesc)
  }

  function resetFilters() { 
    setFilterData({searchData:EMPTY_SEARCH_PARAMS, sortField:PurchaseOptionField.None, sortIsDesc:false})
  }

  const [activeForm, setActiveForm] = useState<PurchaseOptionFormState>()
  
  function setProductId(id: number){
    if(!activeForm) return
    setPurchaseOptionFormState({...activeForm, productId:id})
  }
  
  const {modalSelect, showSelect} = useProductSelect(products, setProductId, activeForm?.productId??0)
   
  function openSelect(form:PurchaseOptionFormState){
    setActiveForm(form)
    showSelect()
  }

  const [invalidFormKey, setInvalidFormKey] = useState<string>()
  const invalidRef = useRef<HTMLDivElement>(null)

  function sliceHasInvalidForm():boolean{
    return filtered.slice(sliceLimits.start, sliceLimits.end).findIndex(
      o=>isInvalid(o)
    ) != -1
  }

  useEffect(()=>{
      // индекс невалидной формы в отфильтрованной коллекции
      const index = filtered.findIndex(
        o=>isInvalid(o)
      )
      
      if (index == -1) {
        setInvalidFormKey(undefined)
        return
      }

      const invalidForm = filtered[index]
      setInvalidFormKey(invalidForm.key)

      if(!sliceHasInvalidForm())
        goToElement(index)
      
  },[
    currentPage, goToInvalid
  ])

  function scrollIntoInvalid() {
    invalidRef.current?.scrollIntoView({block: "center", behavior: "smooth"})
  }
  
  useEffect(()=>{
    scrollIntoInvalid()
  },[invalidRef.current])

  useFormHotkeys(
    ()=>addPurchaseOptionForm(),
    ()=>removePurchaseOptionForm(
      formState.purchaseOptionForms[formState.purchaseOptionForms.length-1].key
    )
  )
  
  return (
    <div>
      <div className='pe-2 d-flex flex-row justify-content-between'>
      <Form.Label><b>Позиции закупки:</b></Form.Label>

      <TooltipButton
        tooltip='фильтры'
        variant={showFilters?'primary':'secondary'}
        onClick={()=>setShowFilters(!showFilters)}
      >
        <>Фильтры <i className='bi bi-funnel'/></>
      </TooltipButton>
      </div>
      <Collapse in={showFilters} className='bg-light p-3 m-1 rounded'>
      <Row>
        <Col md={12} lg={3} className='m-0 p-0'>
        <Card className='m-0 p-2'>
          <Form.Label>Упорядочить по</Form.Label>
          <Form.Select value={filterData.sortField} onChange={e=>setFilterData({
              ...filterData, 
              sortField:PurchaseOptionField[(e.target.value)as keyof typeof PurchaseOptionField]
          })}>
            <option value={PurchaseOptionField.None}>по умолчанию</option>
            <option value={PurchaseOptionField.Code}>код</option>
            <option value={PurchaseOptionField.Name}>наименование</option>
            <option value={PurchaseOptionField.NetWeight}>масса нетто</option>
            <option value={PurchaseOptionField.Price}>цена</option>
            <option value={PurchaseOptionField.Product}>продукт</option>
            <option value={PurchaseOptionField.Unit}>единица измерения</option>
          </Form.Select>
          <hr/>
          <Form.Group>
          <Form.Check name='sort-order' checked={!filterData.sortIsDesc} onChange={e=>setFilterData({...filterData, sortIsDesc:!e.target.checked})} type='radio' label='по возрастанию'/>
          <Form.Check name='sort-order' checked={filterData.sortIsDesc}  onChange={e=>setFilterData({...filterData, sortIsDesc:e.target.checked})} type='radio' label='по убыванию'/>
          </Form.Group>
        </Card>
        </Col>
        <Col md={12} lg={8} className='m-0 p-0'>
        <Card className='m-0 p-2'>
          <Row>
          <Col md={3}>
          <Form.Label>Код</Form.Label>
          <Form.Control
          value={filterData.searchData.code}
          placeholder='код'
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, code:e.target.value}})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Наименование</Form.Label>
          <Form.Control
          value={filterData.searchData.name}
          placeholder='наименование'
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, name:e.target.value}})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Продукт</Form.Label>
          <Form.Control
          value={filterData.searchData.product}
          placeholder='продукт'
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, product:e.target.value}})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Единица измерения</Form.Label>
          <Form.Control
          value={filterData.searchData.unit}
          placeholder='ед. изм.'
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, unit:e.target.value}})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Масса нетто</Form.Label>
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='от'
          min={0}
          value={filterData.searchData.minNetWeight ?? ''}
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, maxNetWeight:parseInt(e.target.value)}})}
          />
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='до'
          min={0}
          value={filterData.searchData.maxNetWeight ?? ''}
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, minNetWeight:parseInt(e.target.value)}})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Цена</Form.Label>
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='от'
          min={0}
          value={filterData.searchData.minPrice ?? ''}
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, minPrice:parseInt(e.target.value)}})}
          />
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='до'
          min={0}
          value={filterData.searchData.maxPrice ?? ''}
          onChange={e=>setFilterData({...filterData, searchData:{...filterData.searchData, maxPrice:parseInt(e.target.value)}})}
          />
          </Col>
          </Row>

          </Card>
        </Col>
        <Col md={12} lg={1} className='gap-2 pt-3 pt-lg-0 d-flex flex-lg-column align-items-center justify-content-between justify-content-lg-start'>
        <TooltipButton
        tooltip='сброс'
        onClick={resetFilters}
        variant='secondary'
        >
          <span className='d-flex align-items-center justify-content-between'>
            <span className='d-lg-none me-2'>Сброс</span><i className='bi bi-x-lg'/>
          </span>
        </TooltipButton>
        <TooltipButton
        tooltip='применить'
        onClick={applyFilters}
        variant='success'
        >
          <span className='d-flex align-items-center justify-content-between'>
            <span className='d-lg-none me-2'>Применить</span><i className='bi bi-search'/>
          </span>
        </TooltipButton>
        </Col>
      </Row>
      </Collapse>
      {
        filtered.slice(sliceLimits.start, sliceLimits.end).map(formState => 
          <div ref={formState.key == invalidFormKey?invalidRef:undefined} key={`${formState.key}`}>
            <PurchaseOptionForm openSelect={openSelect} formState={formState}/>
          </div>)
      }

      {nav}
      <FormListButtons
        addFn={handleAdd}
        deleteAllFn={removeAllPurchaseOptionForms}
      />
      <div className='links-disabled'>
      {modalSelect}
      </div>

    </div>
  )
}

export default PurchaseOptionFormList;