import styled from "styled-components";
import Button from "../../components/Button";

export const PhotoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 32px 16px;
    border-bottom: 1px solid lightgrey;
`

export const UserPhoto = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #d9d9d9;
    background-size: cover;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    input {
        display: none;
    }

    label {
        width: 100%;
        height: 100%;
        display: block;
        cursor: pointer;
    }

    p {
        position: absolute;
        top: 0;
        right: 50%;
        transform: translateX(50%);
        text-align: center;
        font-size: 3rem;
        color: white;
        user-select: none;
    }
`

export const FormWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 48px 24px;
    gap: 32px;
`

export const LeftSide = styled.div`
    width: 50%;

    input {
        padding: 6px 10px;
        font-size: 1.2rem;

        &::placeholder {
            color: black;
            font-weight: bold;
        }
    }

    .nameInputs {
        display: flex;
        gap: 12px;

        input {
            width: 100%;
        }
    }
`

export const RightSide = styled.div`
    width: 50%;
    input {
        padding: 6px 10px;
        font-size: 1.2rem;

            &::placeholder {
                color: black;
                font-weight: bold;
        }
    }

    .selectArea {
        display: flex;
        gap: 12px;
    }
`

export const EditDiv = styled.div`
    display: flex;
    justify-content: end;
    padding: 16px;
`

export const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const InputArea = styled.div`

    input {
        width: 100%;
    }

    select {
        padding: 6px 10px;
        font-size: 1.2rem;
        display: block;
        background-color: transparent;
        width: 100%;
    }
`

export const SubmitButton = styled(Button)`
    margin: 0 auto;
    display: block;
    width: 50%;
`
