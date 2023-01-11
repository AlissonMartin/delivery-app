import React from 'react'
import Button from '../Button'
import { HeaderContainer, NavBar, NavItem } from './HeaderElements'

const Header = () => {
  return (
    <HeaderContainer>
        <img src="" alt="" />
        <NavBar>
            <NavItem>Restaurantes</NavItem>
            <NavItem>Contato</NavItem>
        </NavBar>
        <Button>Fazer Login</Button>
    </HeaderContainer>
  )
}

export default Header