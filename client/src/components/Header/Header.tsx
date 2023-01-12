import React from 'react'
import Button from '../Button'
import { HeaderContainer, HeaderSection, NavBar, NavItem } from './HeaderElements'

const Header = () => {
  return (
    <HeaderSection>
      <HeaderContainer>
        <img src="" alt="" />
        <NavBar>
          <NavItem>Restaurantes</NavItem>
          <NavItem>Contato</NavItem>
        </NavBar>
        <Button>Fazer Login</Button>
      </HeaderContainer>
    </HeaderSection>
  )
}

export default Header