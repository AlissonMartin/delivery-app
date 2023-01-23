import styled from "styled-components";
import backgroundImg from "../../assets/images/food-background.webp"

export const SignUpSection = styled.section`
    height: 100vh;
    background-image: url(${backgroundImg});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

export const OrangeBackground = styled.div`
    position: absolute;
    background-image: linear-gradient(to bottom, ${theme => theme.theme.primaryColor},orange );
    bottom: 0;
    height: 25%;
    width: 100%;
    box-shadow: 0 0 3px #00000065;

`

export const SignUpContainer = styled.div`
    width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
    gap: 16px;
    padding: 20px 36px 72px 36px;
    box-shadow: 0 0 3px #00000065;
    border-radius: 10px;
    z-index: 99;
    overflow: hidden;
`

export const ErrorMessage = styled.div`
    background-color: lightgoldenrodyellow;
    border: 2px solid red;
    padding: 8px;
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    input {
        width: 80%;
        height: 40px;
        border-radius: 25px;
        border: 2px solid black;
        padding: 6px 8px;
        font-size: 1.2rem;
    }
`

export const AdressForm = styled.form`
    width: 100%;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    input {
        width: 80%;
        height: 40px;
        border-radius: 25px;
        border: 2px solid black;
        padding: 6px 8px;
        font-size: 1.2rem;
    }

    select {
        width: 85%;
        height: 50px;
        border-radius: 25px;
        border: 2px solid black;
        padding: 6px 8px;
        font-size: 1.2rem;
        background-color: white;
    }
`

export const NameInputs = styled.div`
    display: flex;
    width: 85%;
    gap: 5%;


    input {
        width: 50%;
    }
`

export const Switcher = styled.div`
    display: flex;
    position: absolute;
    right: 20%;
    top: 2%;
    border-radius: 20px;
    background-color: aliceblue;
    box-shadow: 0 0 0 2px #00000040;

    button {
        border: none;
        padding: 14px;
        border-radius: 20px;
        background-color: transparent;
        font-size: 1.15rem;
        font-weight: bold;
        width: 120px;
        cursor: pointer;
    }

    .active {
        background-color: ${theme => theme.theme.primaryColor};
        box-shadow: 0 0 0 1px #00000020;
    }

    @media (max-width: 768px) {
        right: 50%;
        transform: translateX(50%);
    }
`