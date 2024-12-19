import { Button, Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext';
import { forgotPassword, signIn, signUp } from '../../../api/auth';
import { setCookie } from '../../../cookies';
import { authContext } from '../../../context/AuthContextProvider';
import { inviteToProject } from '../../../api/users';
import { projectContext } from '../../../context/ProjectContextProvider';


function InviteUser() 
{  
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const [email, setEmail] = useState('')

  const {showModal} = useContext(appContext)
  const {project} = useContext(projectContext)

  async function commit() {
    setDisabled(true)
    
    try{
      const res = await inviteToProject(email)
      showModal(<>Пользователь {res?.name} ({res?.email}) добавлен в проект "{project?.name}"</>)
      navigate('/users')
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  return (
      <Container className='pt-5'>
        <h3 className='text-center'>Пригласить пользователя</h3>
        <Form.Group className='mb-4'>
          <Form.Label><b>Введите email адрес пользователя, которого нужно добавить в проект</b></Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Form.Group>

        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </Container>)
}

export default InviteUser