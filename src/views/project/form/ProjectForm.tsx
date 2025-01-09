import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectDTO } from '../../../api/projects';
import { appContext } from '../../../context/AppContextProvider';
import { authContext } from '../../../context/AuthContextProvider';
import { DataAction, UserPermissions } from '../../../models';
import HistoryNav from '../../shared/HistoryNav';
import SmallTooltipButton from '../../shared/SmallTooltipButton';
import { projectFormContext } from '../../../context/ProjectFormContextProvider';
import { projectContext } from '../../../context/ProjectContextProvider';
import BtnShowFileUploadForm from './BtnShowFileUploadForm';

function ProjectForm() 
{  
  const {hasPermission} = useContext(projectContext)

  const logoInputRef = useRef<HTMLInputElement>(null)
  const backdropInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  
  const [disabled, setDisabled] = useState(false)
  
  const {showModal} = useContext(appContext)
  
  const {
    setBackdrop, setLogo, resetBackdrop, resetLogo,
    formState, requestFn, setName,
    history, reloadState, action
  } = useContext(projectFormContext);
  

  async function commit() {

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/projects/details/${res?.id}`)
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  function handleLogoChange(e:React.ChangeEvent<HTMLInputElement>){
    const files = (e.target as HTMLInputElement).files
    
    setLogo(files ? files[0] : undefined)
  }

  function handleBackdropChange(e:React.ChangeEvent<HTMLInputElement>){
    const files = (e.target as HTMLInputElement).files
    
    setBackdrop(files ? files[0] : undefined)
  }

  function removeLogo(){
    if(logoInputRef.current)
      logoInputRef.current.value = ''
    setLogo(undefined)
  }

  function resetLogoFile(){
    if(logoInputRef.current)
      logoInputRef.current.value = ''
    resetLogo()
  }

  function removeBackdrop(){
    if(logoInputRef.current)
      logoInputRef.current.value = ''
    setBackdrop(undefined)
  }

  function resetBackdropFile(){
    if(backdropInputRef.current)
      backdropInputRef.current.value = ''
    resetBackdrop()
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

    commit()
  };

  return (
    <>
        <HistoryNav
          history={history}
          reloadFn={reloadState}
        />
        <Form className='pb-5' aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label><b>Название</b></Form.Label>
          <Form.Control
            required
            type='text'
            value={formState.name}
            onChange={e=>setName(e.target.value)}
            />
          
            <Form.Control.Feedback type="invalid">
              введите название
            </Form.Control.Feedback>
        </Form.Group>
        <Row>
        <Col className='text-center' sm={12} md={6} lg={5}>
          <p className='text-start'><b>Логотип</b></p>
          <p className='w-100 bg-light position-relative'>
            {(formState.logo?.url??'') != ''
              ? <Image style={{maxHeight:'100%', maxWidth:'100%'}} src={formState.logo?.url}/>
              : <div 
              style={{minHeight: '200px', minWidth: '100px'}} 
                  className='bg-light text-secondary d-flex justify-content-center align-items-center text-center'
                  >
                  <h3>Нет изображения</h3>
              </div>
            }
            <div className='position-absolute top-0 end-0 '>
              <SmallTooltipButton
                onClick={removeLogo}
                tooltip='удалить изображение'
                >
                <i className='bi bi-x '/>
              </SmallTooltipButton>
              <SmallTooltipButton
                onClick={resetLogoFile}
                tooltip='сбросить к исходному'
                >
                <i className='bi bi-arrow-clockwise'/>
              </SmallTooltipButton>
            </div>
          </p>
          <Form.Control type='file' accept='.png, .jpg, .jpeg'
            ref={logoInputRef}
            onChange={handleLogoChange}
          />
        </Col>
        <Col className='text-center' sm={12} md={6} lg={5}>
          <p className='text-start'><b>Фон</b></p>
          <p className='w-100 bg-light position-relative'>
            {(formState.backdrop?.url??'') != ''
              ? <Image style={{maxHeight:'100%', maxWidth:'100%'}} src={formState.backdrop?.url}/>
              : <div 
              style={{minHeight: '200px', minWidth: '100px'}} 
                  className='bg-light text-secondary d-flex justify-content-center align-items-center text-center'
                  >
                  <h3>Нет изображения</h3>
              </div>
            }
            <div className='position-absolute top-0 end-0 '>
              <SmallTooltipButton
                onClick={removeBackdrop}
                tooltip='удалить изображение'
                >
                <i className='bi bi-x '/>
              </SmallTooltipButton>
              <SmallTooltipButton
                onClick={resetBackdropFile}
                tooltip='сбросить к исходному'
                >
                <i className='bi bi-arrow-clockwise'/>
              </SmallTooltipButton>
            </div>
          </p>
          <Form.Control type='file' accept='.png, .jpg, .jpeg'
            ref={backdropInputRef}
            onChange={handleBackdropChange}
          />
        </Col>
        </Row>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
      </>)
}

export default ProjectForm