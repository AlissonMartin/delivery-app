import { Link, useNavigate } from 'react-router-dom'
import { isLogged } from '../../utils/authHandler'
import Button from '../Button'
import { CloseButton, Hamburguer, HeaderButton, HeaderContainer, HeaderSection, Logo, MenuMobile, NavBar, NavItem } from './HeaderElements'
import logo from '../../assets/fast.png'
import { useState } from 'react'

const Header = () => {

  const navigate = useNavigate()

  const logged = isLogged()
  const [isActive, setIsActive] = useState(false)
  return (
    <>
      {isActive &&
        <MenuMobile>
          <Link to={'/'}><Logo src={logo} alt="logo" /></Link>
          <nav className='navBarMobile'>
            <NavItem onClick={() => { navigate('/restaurants') }}>Restaurantes</NavItem>
            <NavItem onClick={() => { navigate('') }}>Contato</NavItem>
          </nav>
          {logged &&
            <Button>Meu perfil</Button>
          }
          {!logged &&
            <Link to={'/signin'}><Button>Fazer Login</Button></Link>
          }
          <CloseButton onClick={()=> {setIsActive(!isActive)}}>x</CloseButton>
        </MenuMobile>
      }
      <HeaderSection>
        <HeaderContainer>
          <Link to={'/'}><Logo src={logo} alt="logo" /></Link>
          <NavBar>
            <NavItem onClick={() => { navigate('/restaurants') }}>Restaurantes</NavItem>
            <NavItem onClick={() => { navigate('') }}>Contato</NavItem>
          </NavBar>
          {logged &&
            <HeaderButton>Meu perfil</HeaderButton>
          }
          {!logged &&
            <Link to={'/signin'}><HeaderButton>Fazer Login</HeaderButton></Link>
          }
          <Hamburguer onClick={()=> {setIsActive(!isActive)}}>
            <div className='bar'></div>
            <div className='bar middle' ></div>
            <div className='bar'></div>
          </Hamburguer>
        </HeaderContainer>
      </HeaderSection>
    </>
  )
}

export default Header