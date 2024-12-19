import { Button, Container, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext';
import { setCookie } from '../../../cookies';
import { ErrorView } from '../../ErrorView';
import { resetPassword, signUp } from '../../../api/auth';


function ResetPassword() 
{  
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const {resetToken} = useParams()

  const [disabled, setDisabled] = useState(false)

  const [token, setToken] = useState(resetToken??'')
  const [email, setEmail] = useState(
    params.get('email')?.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g)?.[0]??''
  )
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')

  const {showModal} = useContext(appContext)

  useEffect(()=>{
    if (!resetToken)
      throw new Error('Отсутствует токен сброса')
    else
      setToken(resetToken)
  }, [])

  async function commit() {
    setDisabled(true)
    
    try{
      if(!passwordsMatch())
        throw new Error('Пароли не совпадают')
      const res = await resetPassword({
        token,
        email,
        password,
      })
      
      navigate('/')
      showModal(<>{res?.message}</>)
    }
    catch (error: Error | any) {
      showModal(<div className='p-2 text-center'><ErrorView error={error}/></div>, <b>{error.name}</b>)
      setDisabled(false)
    }
  }

  function passwordsMatch(){
    return password.localeCompare(cPassword) == 0
  }

  function cancel() {
    navigate(-1)
  }

  return (
      <Container className='pt-5'>

        <Form.Group className='mb-4'>
          <Form.Label><b>Email</b></Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label><b>Пароль</b></Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label><b>Подтвердить пароль</b></Form.Label>
          <Form.Control
            type='password'
            value={cPassword}
            onChange={(e)=>setCPassword(e.target.value)}
          />
        </Form.Group>

        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </Container>)
}

export default ResetPassword