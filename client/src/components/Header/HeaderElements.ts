import styled from "styled-components";

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

    img {
        height: 22px;
            margin: 8px;
            padding: 4px;
            background-color: #F9F9FB;
            cursor: pointer;

            &:hover {
                background-color: #e4e4e4;
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
`

export const NavItem = styled.li`
    font-size: 1.3rem;
    cursor: pointer;
`