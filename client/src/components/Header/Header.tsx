import { Link } from 'react-router-dom'
import { isLogged } from '../../utils/authHandler'
import Button from '../Button'
import { HeaderContainer, HeaderSection, NavBar, NavItem } from './HeaderElements'

const Header = () => {

  const logged = isLogged()
  return (
    <HeaderSection>
      <HeaderContainer>
        <img src="" alt="" />
        <NavBar>
          <NavItem>Restaurantes</NavItem>
          <NavItem>Contato</NavItem>
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