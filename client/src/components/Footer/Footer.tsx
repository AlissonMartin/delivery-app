import React from 'react'
import { FooterSection, Socials } from './FooterElements'
import github from '../../assets/svg/github.svg'
import linkedin from '../../assets/svg/linkedin.svg'

const Footer = () => {
  return (
    <FooterSection>
        <p>&copy; Todos os direitos reservados</p>
        <Socials>
          <a href="https://github.com/AlissonMartin" target='_blank'><img src={github} alt="github" /></a>
          <a href="https://www.linkedin.com/in/alisson-martin-268475227/" target='_blank'><img src={linkedin} alt="linkedin" /></a>
        </Socials>
    </FooterSection>
  )
}

export default Footer