import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import { AdressForm, ErrorMessage, Form, OrangeBackground, SignUpContainer, SignUpSection, Switcher } from './SignUpElements'

const SignUp = () => {
  const api = deliveryApi

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState<any>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDisabled(true)
    setError('')
    const json = await api.userLogin(email, password)
    if (json.error) {
      setError(json.error)
    } else if (json.errors.password) {
      setError(json.errors.password.msg)
    } else if (json.errors.email) {
      setError(json.errors.email.msg)
    } else {
      window.location.href = '/'
    }
    setDisabled(false)

  }

  return (
    <SignUpSection>
      <SignUpContainer>
        <img src="" alt="" />
        <h1>Crie uma conta</h1>
        {error &&
          <ErrorMessage>
            <p>{error}</p>
          </ErrorMessage>
        }
        <Form>
          <input type="text" placeholder='Nome' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
          <input type="email" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
          <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} disabled={disabled} />
          <input type="password" placeholder='Repita a senha' value={password} onChange={e => setPassword(e.target.value)} disabled={disabled} />
          <Button onClick={handleSubmit} disabled={disabled}>Criar Conta</Button>
        </Form>
        <AdressForm>
          <input type="text" placeholder='Nome' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
          <input type="text" placeholder='Nome' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
          <input type="text" placeholder='Nome' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
          <input type="text" placeholder='Nome' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
          <input type="text" placeholder='Nome' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
          <Button onClick={handleSubmit} disabled={disabled}>Enviar endereço</Button>
        </AdressForm>
      </SignUpContainer>
      <OrangeBackground />
      <Switcher>
        <Link to='/signin'><button>Entrar</button></Link>
        <button className='active'>Cadastrar</button>
      </Switcher>
    </SignUpSection>
  )
}

export default SignUp