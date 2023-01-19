import styled from "styled-components";
import bakeryImg from '../../assets/images/bakery.jpg'

export const MainWrapper = styled.div`
    display: flex;
    margin-top: 48px;

    .rightSide {
    display: flex;

    .burgerImage {
        width: 380px;
    }
    }

    .leftSide {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    h2 {
        font-size: 2rem;
    }

    p {
        color: ${theme => theme.theme.fontColor};
    }
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
    display: flex;
    padding-top: 32px;
    gap: 40px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`
export const CategoriesItem = styled.div`
    width: 70px;
    cursor: pointer;

    p {
        font-size: 0.8rem;
        text-align: center;
        color: #4A4A4A;
        font-weight: bold;
    }

    img {
        width: 100%;
        transition: all ease .3s;

        &:hover {
            transform: scale(1.1);
        }
    }
`

export const SearchWrapper = styled.div`
    padding: 60px 40px;
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

export const GalleryWrapper = styled.div`
    overflow-x: auto;
    padding: 60px 20px;
`

export const Gallery = styled.div`
    display: flex;
    gap: 32px;
`
export const GalleryItem = styled.div`
    display: flex;
    gap: 16px;
    max-width: 360px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 16px;
    transition: all ease .2s;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 3px #00000060;
    }

    .leftSide {
        width: 35%;
    }

    .rightSide {
        flex: 1;
    }
`

export const LeftArrow = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2%;
    right: auto;
    font-size: 2rem;
    width: 36px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    border: none;
    background-color: #00000060;
    color: white;
    transition: all ease .5s;

    &:hover {
        background-color: black;
    }
`

export const RightArrow = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2%;
    left: auto;
    width: 36px;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    background-color: #00000060;
    color: white;
    transition: all ease .5s;

    &:hover {
        background-color: black;
    }
`

export const CardWrapper = styled.div`
    padding: 36px 12px;

    p {
        display: block;
        text-align: center;
        color: ${theme => theme.theme.primaryColor};
        font-size: 1.2rem;
    }
`

export const Card = styled.div `
    width: 40%;
    height: 280px;
    background-image: url(${bakeryImg});
    background-size: cover;
    margin: 8px auto;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #00000070;
    transition: all ease .3s;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
`