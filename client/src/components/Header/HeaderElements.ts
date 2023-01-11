import styled from "styled-components";

export const HeaderContainer = styled.header`
    height: 80px;
    padding: 16px 32px;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgrey;
`

export const NavBar = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 36px;
    text-decoration: none;
    list-style: none;
`

export const NavItem = styled.li`
    font-size: 1.3rem;
    cursor: pointer;
`