import styled from "styled-components";
import shoppingCart from '../../assets/svg/shoppingCart.svg'
import Button from "../Button";

export const HeaderSection = styled.section`
    background-color: aliceblue;
    box-shadow: 0 1px 6px rgba(0,0,0,.08);
`

export const HeaderContainer = styled.header`
    height: 80px;
    padding: 16px 32px;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgrey;
    
    form {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 3px;
    }

    .search {
        height: 22px;
            margin: 8px;
            padding: 4px;
            background-color: #F9F9FB;
            cursor: pointer;

            &:hover {
                background-color: #e4e4e4;
            }
    }

    .shoppingCart {
        margin-left: 24px;
        width: 50px;
        height: 50px;
        background-image: url(${shoppingCart});
        background-size: cover;
        position: relative;
        cursor: pointer;

        p {
            position: absolute;
            right: 0;
            top: 0;
            background-color: #FB9400;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            font-size: 1.1rem;
            text-align: center;
            color: white;
        }
    }
`

export const NavBar = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 36px;
    text-decoration: none;
    list-style: none;

    @media (max-width: 768px) {
        display: none;
    }
`

export const NavItem = styled.li`
    font-size: 1.3rem;
    cursor: pointer;
    transition: all ease .2s;

    &:hover {
        color: ${theme => theme.theme.primaryColor};
    }
`

export const Logo = styled.img`
    width: 80px;
    height: 80px;
    background-color: transparent;
`

export const Hamburguer = styled.div`
    display: none;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;

    .bar {
        height: 4px;
        width: 32px;
        background-color: ${theme=> theme.theme.primaryColor};
    }

    @media (max-width: 768px) {
        display: flex;
    }
`

export const MenuMobile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;


    .navBarMobile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        list-style: none;

    }


`

export const HeaderButton = styled(Button)`
    @media (max-width: 768px) {
        display: none;
    }

`

export const CloseButton = styled.div`
    position: absolute;
    right: 5%;
    top: 5%;
    font-size: 2rem;
    cursor: pointer;
`