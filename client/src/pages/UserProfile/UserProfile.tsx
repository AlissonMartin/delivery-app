import React, { useState, useEffect, useRef } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header/Header'
import { EditDiv, FormWrapper, InputArea, InputsWrapper, LeftSide, PhotoWrapper, RightSide, SubmitButton, UserPhoto } from './UserProfileElements'
import deliveryApi from '../../services/deliveryApi/deliveryApi'
import Button from '../../components/Button'
import useBrazilianStates from '../../hooks/useBrazilianStates'
import useCities from '../../hooks/useCities'
import userIcon from '../../assets/svg/user.svg'

export interface Name {
  firstName: string;
  lastName: string;
}

export interface Adress {
  number: number;
  street: string;
  district: string;
  city: string;
  state: string;
}

export interface UserInfoInterface {
  name: Name;
  adress: Adress;
  _id: string;
  email: string;
  __v: number;
  photo?: string
}

const UserProfile = () => {
  const api = deliveryApi

  const [userInfo, setUserInfo] = useState<UserInfoInterface>()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [brazilianState, setBrazilianState] = useState('')
  const [city, setCity] = useState('')

  const [editMode, setEditMode] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const { states } = useBrazilianStates()
  const { cities } = useCities(brazilianState)

  const fileFieldRef = useRef<any>(null)

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')

    const getUserInfo = async () => {
      if (token) {
        const json = await api.userInfo(token)
        setUserInfo(json)
      }
    }
    getUserInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fData = new FormData()
    if (firstName !== '') {
      fData.append('firstName', firstName)
    }
    if (lastName !== '') {
      fData.append('lastName', lastName)
    }
    if (email !== '') {
      fData.append('email', email)
    }
    if (password !== '') {
      fData.append('password', password)
    }
    if (brazilianState !== '') {
      fData.append('state', brazilianState)
    }
    if (city !== '') {
      fData.append('city', city)
    }
    if (district !== '') {
      fData.append('district', district)
    }
    if (street !== '') {
      fData.append('street', street)
    }
    if (number !== '') {
      fData.append('number', number)
    }
    if (fileFieldRef.current) {
      if (fileFieldRef.current?.files.length !== 0) {
        fData.append('photo', fileFieldRef.current?.files[0])
      }
    }

    console.log(fData)
    // await api.editInfo(fData)
    // window.location.reload()
  }

  return (
    <>
      <Header />
      <section>
        <Container>
          <PhotoWrapper>
            <UserPhoto style={userInfo?.photo ? { backgroundImage: `url(http://localhost)` } : {backgroundImage: `url(${userIcon})` }}>
              {editMode &&
                <>
                  <p>+</p>
                  <label htmlFor="arquivo"></label>
                  <input type="file" id='arquivo' ref={fileFieldRef} />
                </>
              }
            </UserPhoto>
            <div>
              <h2>{userInfo ? userInfo.name.firstName : 'Usuário'}  {userInfo ? userInfo.name.lastName : ''}</h2>
              {editMode &&
                <p>Edite sua foto de perfil!</p>
              }
            </div>
          </PhotoWrapper>
          <EditDiv><Button onClick={()=> {setEditMode(!editMode); setDisabled(!disabled)}}>Editar Perfil</Button></EditDiv>
        </Container>
        <Container>
          <FormWrapper>
            <LeftSide>
              <form onSubmit={handleSubmit}>
                <InputsWrapper>
                  <div className='nameInputs'>
                    <InputArea>
                      <label htmlFor="firstName">Nome</label>
                      <input type="text" id='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} disabled={disabled} placeholder={userInfo?.name.firstName}/>
                    </InputArea>
                    <InputArea>
                      <label htmlFor="lastName">Sobrenome</label>
                      <input type="text" id='lastName' value={lastName} onChange={e => setLastName(e.target.value)} disabled={disabled} placeholder={userInfo?.name.lastName}/>
                    </InputArea>
                  </div>
                  <InputArea>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} placeholder={userInfo?.email}/>
                  </InputArea>
                  <InputArea>
                    <label htmlFor="password">Senha</label>
                    <input type="text" id='password' value={password} onChange={e => setPassword(e.target.value)} disabled={disabled} placeholder='****'/>
                  </InputArea>
                  {editMode && 
                    <SubmitButton>Confirmar edição</SubmitButton>
                  }
                </InputsWrapper>
              </form>
            </LeftSide>
            <RightSide>
              <form>
                <InputsWrapper>
                  <div className="selectArea">
                    <InputArea>
                      <label htmlFor="">Estado</label>
                      <select value={brazilianState} onChange={e => setBrazilianState(e.target.value)} disabled={disabled}>
                        <option value='' disabled={true}>Estado</option>
                        {states.map((i, k) =>
                          <option key={k} value={i.sigla}>{i.nome}</option>
                        )}
                      </select>
                    </InputArea>
                    <InputArea>
                      <label>Cidade</label>
                      <select value={city} onChange={e => setCity(e.target.value)} disabled={brazilianState ? false : true}>
                        <option value='' disabled={true}>Cidade</option>
                        {cities.map((i, k) =>
                          <option key={k}>{i.nome}</option>
                        )}
                      </select>
                    </InputArea>
                  </div>
                  <InputArea>
                    <label htmlFor="">Bairro</label>
                    <input type="text" value={district} onChange={e => setDistrict(e.target.value)} disabled={disabled} placeholder={userInfo?.adress.district}/>
                  </InputArea>
                  <InputArea>
                    <label htmlFor="">Rua</label>
                    <input type="text" value={street} onChange={e => setStreet(e.target.value)} disabled={disabled} placeholder={userInfo?.adress.street}/>
                  </InputArea>
                  <InputArea>
                    <label htmlFor="">Número</label>
                    <input type="number" value={number} onChange={e => setNumber(e.target.value)} disabled={disabled} placeholder={userInfo?.adress.number.toString()}/>
                  </InputArea>
                </InputsWrapper>
              </form>
            </RightSide>
          </FormWrapper>
        </Container>
      </section>
    </>
  )
}

export default UserProfile