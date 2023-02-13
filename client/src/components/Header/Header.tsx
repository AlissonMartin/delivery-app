import { Link, useNavigate } from 'react-router-dom'
import { isLogged } from '../../utils/authHandler'
import Button from '../Button'
import { HeaderContainer, HeaderSection, Logo, NavBar, NavItem } from './HeaderElements'
import logo from '../../assets/fast.png'

const Header = () => {

  const navigate = useNavigate()

  const logged = isLogged()
  return (
    <HeaderSection>
      <HeaderContainer>
        <Link to={'/'}><Logo src={logo} alt="logo" /></Link>
        <NavBar>
          <NavItem onClick={()=> { navigate('/restaurants')}}>Restaurantes</NavItem>
          <NavItem onClick={()=> { navigate('')}}>Contato</NavItem>
        </NavBar>
        {logged && 
          <Button>Meu perfil</Button>
        }
        {!logged &&
          <Link to={'/signin'}><Button>Fazer Login</Button></Link>
        }
      </HeaderContainer>
    </HeaderSection>
  )
}

export default Header