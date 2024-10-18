import DishIngredientFormList from './DishIngredientFormList';
import NameInput from './DishNameInput';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { dishCostCalculatorContext } from '../../../context/DishCostCalculatorContext';
import { dishFormContext } from '../../../context/DishFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import HistoryNav from '../../shared/HistoryNav';
import SmallTooltipButton from '../../shared/SmallTooltipButton';

function DishForm() 
{  
  const {hasPermission} = useContext(authContext)

  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_DISHES))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])
  
  const navigate = useNavigate()
  
  const [disabled, setDisabled] = useState(false)
  
  const {showModal} = useContext(appContext)
  
  const {
    setImage, resetImage,
    formState, requestFn, setName,
    categories, setCategoryDataAction, 
    setCategoryId, setCategoryName,
    history, reloadState
  } = useContext(dishFormContext);

  function hasIngredients() : boolean {
    // есть хотя бы один ингредиент
    return formState.dishIngredientForms.length > 0
  }

  async function commit() {
    if (!hasIngredients()){
      showModal(<>Необходимо выбрать хотя-бы один ингредиент</>)
      return
    }

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/dishes/details/${res?.id}`)
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  function handleImageChange(e:React.ChangeEvent<HTMLInputElement>){
    const files = (e.target as HTMLInputElement).files
    
    setImage(files ? files[0] : undefined)

  }

  function removeImage(){
    if(imageInputRef.current)
      imageInputRef.current.value = ''
    setImage(undefined)
  }

  function resetImageFile(){
    if(imageInputRef.current)
      imageInputRef.current.value = ''
    resetImage()
  }

  return (<>
        <HistoryNav
          history={history}
          reloadFn={reloadState}
        />
        <Row>
        <Col sm={12} md={6} lg={7}>
        <Form.Group className='mb-3'>
          <Form.Label><b>Название блюда</b></Form.Label>
          <Form.Control
            value={formState.name}
            onChange={(e)=>setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <SelectCreateGroup 
            label='Категория'
            dataAction={formState.categoryDataAction}
            items={categories} 
            name={formState.categoryName}
            selectedId={formState.categoryId} 
            setId={setCategoryId} 
            setDataAction={setCategoryDataAction}
            setName={setCategoryName}
            />
        </Form.Group>
        </Col>
        <Col className='text-center' sm={12} md={6} lg={5}>
          <p className='text-start'><b>Фото</b></p>
          <p className='w-100 bg-light position-relative'>
            {(formState.image?.url??'') != ''
              ? <Image style={{maxHeight:'100%', maxWidth:'100%'}} src={formState.image?.url}/>
              : <div 
              style={{minHeight: '200px', minWidth: '100px'}} 
                  className='bg-light text-secondary d-flex justify-content-center align-items-center text-center'
                  >
                  <h3>Нет изображения</h3>
              </div>
            }
            <div className='position-absolute top-0 end-0 '>
              <SmallTooltipButton
                onClick={removeImage}
                tooltip='удалить изображение'
                >
                <i className='bi bi-x '/>
              </SmallTooltipButton>
              <SmallTooltipButton
                onClick={resetImageFile}
                tooltip='сбросить к исходному'
                >
                <i className='bi bi-arrow-clockwise'/>
              </SmallTooltipButton>
            </div>
          </p>
          <Form.Control type='file' accept='.png, .jpg, .jpeg'
            ref={imageInputRef}
            onChange={handleImageChange}
          />
        </Col>
        </Row>
        <DishIngredientFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </>)
}

export default DishForm