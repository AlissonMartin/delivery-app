import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import { ErrorMessage, Form, OrangeBackground, SignInContainer, SignInSection, Switcher } from './SignInElements'

const SignIn = () => {
  const api = deliveryApi
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState<any>('')

  const handleSubmit = async(e:React.FormEvent)=> {
    e.preventDefault()
    setDisabled(true)
    setError('')
    const json = await api.userLogin(email,password)
    if (json.error) {
      setError(json.error)
    } else if (json.errors.password) {
      setError (json.errors.password.msg)
    } else if (json.errors.email) {
      setError(json.errors.email.msg)
    } else {
      window.location.href = '/'
    }
    setDisabled(false)

  }

  return (
    <SignInSection>
        <SignInContainer>
            <img src="" alt="" />
            <h1>Entre na sua conta</h1>
            {error &&
              <ErrorMessage>
                <p>{error}</p>
              </ErrorMessage>
            }
            <Form>
              <label htmlFor=""></label>
              <input type="email" placeholder='E-mail' value={email} onChange={e=> setEmail(e.target.value)} disabled={disabled}/>
              <label htmlFor=""></label>
              <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}disabled={disabled} />
            </Form>
            <Button onClick={handleSubmit} disabled={disabled}>Entrar</Button>
        </SignInContainer>
        <OrangeBackground/>
        <Switcher>
            <button className='active'>Entrar</button>
            <Link to='/signup'><button>Cadastrar</button></Link>
        </Switcher>
    </SignInSection>
  )
}

export default SignIn