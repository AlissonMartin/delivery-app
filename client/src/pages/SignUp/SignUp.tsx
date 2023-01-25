import React from 'react'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import { AdressForm, ErrorMessage, Form, OrangeBackground, SignUpContainer, SignUpSection, Switcher, NameInputs } from './SignUpElements'

import useBrazilianStates from '../../hooks/useBrazilianStates'
import useCities from '../../hooks/useCities'
import { doLogin } from '../../utils/authHandler'

const SignUp = () => {
  const api = deliveryApi

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [brazilianState, setBrazilianState] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState<any>('')

  const {states} = useBrazilianStates()
  const {cities} = useCities(brazilianState)

  const form = useRef<HTMLFormElement>(null)
  const adressForm = useRef<HTMLFormElement>(null)

  const handleNext = async (e:React.FormEvent)=> {
    e.preventDefault()
    setError('')

    if (firstName && lastName && email && password) {

      if (password !== repeatPassword) {
        setError('As senhas não são iguais')
        return
      } 
      if (form.current) {
        form.current.style.display = 'none'
      }
      if (adressForm.current) {
        adressForm.current.style.display = 'flex'
      }
    } else {
      setError('Preencha todos os campos')
    }
    }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDisabled(true)
    setError('')

    const state = brazilianState
    const json = await api.userSignUp({firstName, lastName, email, password, state, city, district, street, number})
    if (json.error) {
      setError(json.error)
      return
    }
    if (json.errors) {
      if (json.errors.password) {
        setError(json.errors.password.msg)
        setDisabled(false)
        if (adressForm.current) {
          adressForm.current.style.display = 'none'
        }
        if (form.current) {
          form.current.style.display = 'flex'
        }
        return
      }
      if (json.errors.email) {
        setError(json.errors.email.msg)
        setDisabled(false)
        if (adressForm.current) {
          adressForm.current.style.display = 'none'
        }
        if (form.current) {
          form.current.style.display = 'flex'
        }
        return
      }
      if (json.errors.firstName || json.errors.lastName) {
        setError('Nome inválido')
        setDisabled(false)
        if (adressForm.current) {
          adressForm.current.style.display = 'none'
        }
        if (form.current) {
          form.current.style.display = 'flex'
        }
        return
      }
      if (json.errors.state || json.errors.city || json.errors.district || json.errors.street || json.errors.number)
      setError('Endereço inválido')
      setDisabled(false)
      return
    }
    setDisabled(false)
    setError('')
    doLogin(json.token, json.refreshToken)
  }
    // } else if (json.errors.password) {
    //   setError(json.errors.password.msg)
    // } else if (json.errors.email) {
    //   setError(json.errors.email.msg)
    // } else {
    //   window.location.href = '/'
    // }
    // setDisabled(false)


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
        <Form ref={form}>
          <NameInputs>
            <input type="text" placeholder='Nome' value={firstName} onChange={e => setFirstName(e.target.value)} disabled={disabled} required/>
            <input type="text" placeholder='Sobrenome' value={lastName} onChange={e => setLastName(e.target.value)} disabled={disabled} required/>
          </NameInputs>
          <input type="email" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} required/>
          <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} disabled={disabled} required/>
          <input type="password" placeholder='Repita a senha' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} disabled={disabled} required/>
          <Button onClick={handleNext} disabled={disabled}>Criar Conta</Button>
        </Form>
        <AdressForm ref={adressForm}>
          <select value={brazilianState} onChange={e=> setBrazilianState(e.target.value)} >
            <option value='' disabled={true}>Estado</option>
            {states.map((i, k)=>
              <option key={k} value={i.sigla}>{i.nome}</option>
            )}
          </select>
          <select value={city} onChange={e=> setCity(e.target.value)} disabled={brazilianState ? false : true}>
            <option value='' disabled={true}>Cidade</option>
            {cities.map((i, k)=>
              <option key={k}>{i.nome}</option>
            )}
          </select>
          <input type="text" placeholder='Bairro' value={district} onChange={e => setDistrict(e.target.value)} disabled={disabled} />
          <input type="text" placeholder='Rua' value={street} onChange={e => setStreet(e.target.value)} disabled={disabled} />
          <input type="number" placeholder='Número' value={number} onChange={e=> setNumber(e.target.value)} disabled={disabled} />
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