import DishIngredientFormList from './DishIngredientFormList';
import NameInput from './DishNameInput';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishDTO } from '../../../api/nomenclature/dishes';
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { dishCostCalculatorContext } from '../../../context/DishCostCalculatorContext';
import { dishFormContext } from '../../../context/forms/nomenclature/dish/DishFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import HistoryNav from '../../shared/HistoryNav';
import SmallTooltipButton from '../../shared/SmallTooltipButton';
import { projectContext } from '../../../context/ProjectContextProvider';
import { useHotkeys } from 'react-hotkeys-hook';


function DishForm() 
{  

  const {hasPermission} = useContext(projectContext)

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
    formState, requestFn, setName, setDescription,
    categories, setCategoryDataAction, 
    setCategoryId, setCategoryName,
    groups, setGroupId,
    setGroupDataAction, setGroupName,
    history, reloadState
  } = useContext(dishFormContext);


  function hasIngredients() : boolean {
    // есть хотя бы один ингредиент
    return formState.dishIngredientForms.length > 0
  }

  
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();
    
    const form = event.currentTarget as any;
    if (form.checkValidity() === false) {
      event.stopPropagation();      
      setValidated(true);
      return
    }

    if (!hasIngredients()){
      showModal(<>Необходимо выбрать хотя-бы один ингредиент</>)
      return
    }

    commit()
  };

  async function commit() {

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


  function handleKeyDown(e: any) {
    if (
      e.key == 13
    ) {
      e.preventDefault();
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
        <Form className='pb-5' aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>

        <Row>
        <Col sm={12} md={6} lg={7}>
        <Form.Group className='mb-3'>
          <Form.Label><b>Название блюда</b></Form.Label>
          <Form.Control
            required
            value={formState.name}
            onChange={(e)=>setName(e.target.value)}
          />
          
          <Form.Control.Feedback type="invalid">
            введите название
          </Form.Control.Feedback>
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
        <Form.Group className='mb-3'>
          <SelectCreateGroup 
            label='Группа'
            dataAction={formState.groupDataAction}
            items={groups} 
            name={formState.groupName}
            selectedId={formState.groupId} 
            setId={setGroupId} 
            setDataAction={setGroupDataAction}
            setName={setGroupName}
            />
        </Form.Group>
        </Col>
        <Col className='text-center pb-3' sm={12} md={6} lg={5}>
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
        <Col md={12}>
        <Form.Group className='mb-3'>
          <Form.Label><b>Описание</b></Form.Label>
          <textarea
            maxLength={1000}
            className='form-control border-1'
            onKeyDown={e=>handleKeyDown(e)}
            value={formState.description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </Form.Group>
        </Col>
        </Row>
        <DishIngredientFormList/>
        <div className='d-flex pt-2'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>

      </>)
}

export default DishForm