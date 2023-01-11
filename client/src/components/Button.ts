import styled from "styled-components";

const Button = styled.button`
    width: 160px;
    height: 50px;
    border-radius: 5px;
    background-color: ${theme=> theme.theme.primaryColor};
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #FF7F0D;
    }
`

export default Button