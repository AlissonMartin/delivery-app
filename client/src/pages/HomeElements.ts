import styled from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    margin-top: 48px;
`

export const LeftSide = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    h2 {
        font-size: 2rem;
    }

    p {
        color: ${theme=> theme.theme.fontColor};
    }
`

export const RightSide = styled.div`
    display: flex;

    .burgerImage {
        width: 380px;
    }
`

export const RectangleWrapper =  styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 48px;
`

export const RectangleItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    img {
        width: 28px;
        height: 28px;
        border: 3px solid ${theme=> theme.theme.primaryColor};
        border-radius: 6px;
        padding: 8px;
    }

    p {
        margin-bottom: 8px;
        flex: 1;
        font-weight: bold;
        font-size: 0.9rem;
        padding-bottom: 8px;
        border-bottom: 2px solid ${theme => theme.theme.primaryColor};
    }
`

export const CategoriesWrapper = styled.div`

`

export const SearchWrapper = styled.div`
    padding: 80px 40px;
    margin-left: 80px;

    h3 {
        font-size: 1.4rem;
        margin-bottom: 16px;
    }

    form {
        display: inline-flex;
        align-items: center;
        background-color: white;

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

        input {
        height: 40px;
        max-width: 360px;
        border: none;
        font-size: 1.2rem;
    }
    }

`
