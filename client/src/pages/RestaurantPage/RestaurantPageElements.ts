import styled from "styled-components";
import Button from "../../components/Button";

type ChildrenProp = {
    children: React.ReactNode;
  }

export const Banner = styled.img`
    width: 100%;
    border-radius: 4px;
    margin: 16px 0;
`

export const RestaurantInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 32px 0;

    .photo {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        box-shadow: 0 0 2px #00000060;
        margin: 0 16px;
    }

    h1 {
        font-weight: normal;
        font-size: 1.9rem;
        margin-bottom: 8px;
    }

`

export const ComboWrapper = styled.div`
`

export const ProductsMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15%;
    color: ${theme=> theme.theme.fontColor};

    h2 {
        font-weight: normal;
        cursor: pointer;
        transition: all ease .2s;

        &:hover {
            color: ${theme=> theme.theme.primaryColor};
        }
    }

    .active {
        color: ${theme=> theme.theme.primaryColor};
        border-bottom: 2px solid ${theme=> theme.theme.primaryColor};
    }
`

export const ProductsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 32px 0;
    width: 100%;
`

export const ProductsItem = styled.div`
    width: 70%;
    min-height: 180px;
    border: 1px solid lightgrey;
    box-shadow: 0 0 5px #00000025;
    margin: 12px auto;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    transition: all ease .3s;

    h2 {
        font-weight: normal;
        font-size: 1.2rem;

    }

    p {
        margin-top: 36px;
        color: ${theme=> theme.theme.fontColor};
        max-width: 100%;
        word-wrap: break-word;
    }

    img {
        width: 140px;
        height: 140px;
        margin-right: 36px;
    }

    &:hover {
        box-shadow: 0 0 5px #00000055;
        cursor: pointer;
    }
`

export const Cart = styled.div`
    position: fixed;
    right: 0;
    height: 100vh;
    top: 0;
    bottom: 0;
    width: 320px;
    background-color: #f4f4f4;
    padding: 36px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    overflow-y: scroll;

    h2 {
        text-align: center;
        font-weight: normal;
        margin-bottom: 12px;
    }

    .closeButton {
        position: absolute;
        top: 2%;
        right: 8%;
        font-size: 2rem;
        user-select: none;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 100%;
        left: 0;
        top: 15%;
        height: 85vh;
        box-shadow: rgba(100, 100, 111, 0.2) 29px 7px 29px 0px;
    }
`

export const Item = styled.div<ChildrenProp>`
    width: 100%;
    height: 120px;
    display: flex;
    gap: 12px;
    background-color: white;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 12px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all ease .3s;
    cursor: pointer;


    .leftSide {
        flex: 1;

        .counter {
        display: flex;
        gap: 8px;
        background-color: #D1CDD1;
        width: fit-content;
        padding: 1px 2px;
        border-radius: 3px;
        
        button {
            width: 20px;
            height: 20px;
            border: none;
            background-color: transparent;
            color: ${theme=> theme.theme.fontColor};
            cursor: pointer;

            &:hover {
                background-color: #9C989C;
            }
        }
        }

        img {
            width: 100%;
            height: 50px;
            margin-bottom: 4px;
        }
    }

    .rightSide {
        width: 65%;

        h3 {
            font-size: 1.1rem;
            margin-bottom: 6px;
        }

        p {
            color: ${theme=> theme.theme.fontColor};
            margin-bottom: 4px;
            font-size: 0.9rem;
        }
    }

    &:hover {
        box-shadow: rgba(110, 110, 121, 0.4) 0px 10px 33px 0px;
    }
`

export const CloseButton = styled.div`

`

export const CartFooter = styled.div`
    height: 100px;
    width: 100%;
    background-image: linear-gradient(to right, ${theme=> theme.theme.primaryColor}, #E36A0B);
    position: absolute;
    bottom: 0;
    padding: 24px;
    display: flex;
    justify-content: space-around;

    .price {
        font-size: 1.4rem;
        font-weight: bold;
        color: white;
    }

    .total {
        font-size: 0.9rem;
        color: #D4D4D4;
    }
`

export const CartButton = styled(Button)`
    background-color: white;
    font-weight: normal;
    color: rgb(43, 27, 11);

    &:hover {
        background-color: white;

    }
`