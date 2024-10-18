import {Button, Card, Col, Collapse, Container, Dropdown, DropdownButton, Form, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import PurchaseOptionForm from './PurchaseOptionForm'
import { useContext, useEffect, useRef, useState } from 'react'
import { distributorFormContext } from '../../../context/DistributorFormContext'
import { PurchaseOptionFormState, purchaseOptionFormToDTO } from '../../../models/DistributorFormState';
import TooltipButton from '../../shared/TooltipButton';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import usePagination from '../../../hooks/usePagination';
import useFilterPurchaseOptions, { EMPTY_SEARCH_PARAMS } from '../../../hooks/filter/useFilterPurchaseOptions';
import useSortPurchaseOptions, { PurchaseOptionField } from '../../../hooks/sort/useSortPurchaseOptions';
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';

function PurchaseOptionFormList() {

  const {
    addPurchaseOptionForm,
    removeAllPurchaseOptionForms,
    setPurchaseOptionFormState,
    formState,
    products
  } = useContext(distributorFormContext);

  const [showFilters, setShowFilters] = useState(false)
  const {searchData, setSearchData, getPredicate} = useFilterPurchaseOptions()
  const {setSortField, sortField, setSortIsDesc, sortIsDesc, getComparer} = useSortPurchaseOptions()
  
  const filtered = formState.purchaseOptionForms
    .filter(o=>getPredicate()(purchaseOptionFormToDTO(o)))
    .sort((o1,o2)=>getComparer()(purchaseOptionFormToDTO(o1),purchaseOptionFormToDTO(o2)))
  
  const {sliceLimits, paginationNav} = usePagination(filtered.length)

  function handleAdd(){
    addPurchaseOptionForm()
    resetFilters()
  }

  function resetFilters() { 
    setSearchData(EMPTY_SEARCH_PARAMS)
    setSortField(PurchaseOptionField.None)
    setSortIsDesc(false)
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
        <Col md={3} className='m-0 p-0'>
        <Card className='m-0 p-2'>
          <Form.Label>Упорядочить по</Form.Label>
          <Form.Select value={sortField} onChange={e=>setSortField(parseInt(e.target.value))}>
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
          <Form.Check name='sort-order' checked={!sortIsDesc} onChange={e=>setSortIsDesc(!e.target.checked)} type='radio' label='по возрастанию'/>
          <Form.Check name='sort-order' checked={sortIsDesc}  onChange={e=>setSortIsDesc(e.target.checked)} type='radio' label='по убыванию'/>
          </Form.Group>
        </Card>
        </Col>
        <Col md={8} className='m-0 p-0'>
        <Card className='m-0 p-2'>
          <Row>
          <Col md={3}>
          <Form.Label>Код</Form.Label>
          <Form.Control
          value={searchData.code}
          placeholder='код'
          onChange={(e)=>setSearchData({...searchData, code: e.target.value.toLocaleLowerCase()})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Наименование</Form.Label>
          <Form.Control
          value={searchData.name}
          placeholder='наименование'
          onChange={(e)=>setSearchData({...searchData, name: e.target.value.toLocaleLowerCase()})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Продукт</Form.Label>
          <Form.Control
          value={searchData.product}
          placeholder='продукт'
          onChange={(e)=>setSearchData({...searchData, product: e.target.value.toLocaleLowerCase()})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Единица измерения</Form.Label>
          <Form.Control
          value={searchData.unit}
          placeholder='ед. изм.'
          onChange={(e)=>setSearchData({...searchData, unit: e.target.value.toLocaleLowerCase()})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Масса нетто</Form.Label>
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='от'
          min={0}
          value={searchData.minNetWeight ?? ''}
          onChange={(e)=>setSearchData({...searchData, minNetWeight: parseInt(e.target.value.toLocaleLowerCase())})}
          />
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='до'
          min={0}
          value={searchData.maxNetWeight ?? ''}
          onChange={(e)=>setSearchData({...searchData, maxNetWeight: parseInt(e.target.value.toLocaleLowerCase())})}
          />
          </Col>
          <Col md={3}>
          <Form.Label>Цена</Form.Label>
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='от'
          min={0}
          value={searchData.minPrice ?? ''}
          onChange={(e)=>setSearchData({...searchData, minPrice: parseInt(e.target.value.toLocaleLowerCase())})}
          />
          <Form.Control
          className='mt-1'
          type='number'
          placeholder='до'
          min={0}
          value={searchData.maxPrice ?? ''}
          onChange={(e)=>setSearchData({...searchData, maxPrice: parseInt(e.target.value.toLocaleLowerCase())})}
          />
          </Col>
          </Row>

          </Card>
        </Col>
        <Col md={1}>
        <TooltipButton
        tooltip='сброс'
        onClick={resetFilters}
        variant='secondary'
        >
        <i className='bi bi-x-lg'/>
        </TooltipButton>
        </Col>
      </Row>
      </Collapse>
      {
        filtered.slice(sliceLimits.start, sliceLimits.end).map(formState => 
          <div key={`${formState.key}`}>
            <PurchaseOptionForm openSelect={openSelect} formState={formState}/>
          </div>)
      }

      {paginationNav}
      <div className="d-flex flex-row-reverse">

        <TooltipButton
          tooltip='Добавить позицию'
          variant='success'
          onClick={handleAdd}
        ><i className='bi bi-plus-lg'/></TooltipButton>

        <BtnAskConfirmation
          tooltip='удалить все'
          variant="danger"
          onConfirm={removeAllPurchaseOptionForms}
          prompt='удалить все позиции закупки? несохраненные данные будут утеряны'
        ><i className='bi bi-x-lg'/></BtnAskConfirmation>
      </div>

      {modalSelect}

    </div>
  )
}

export default PurchaseOptionFormList;