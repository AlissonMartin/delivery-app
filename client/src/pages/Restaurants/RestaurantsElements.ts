import styled from "styled-components";

export const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    font-size: 1.2rem;
    padding: 6px 8px;
    
`

export const RestaurantsWrapper = styled.div`
    margin: 48px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const RestaurantItem = styled.div`

    width: 40%;
    height: 360px;
    background-size: cover;
    background-position: center;
    position: relative;
    border-radius: 4px;
    box-shadow: 0 0 3px #00000070;
    transition: all ease .3s;

    &:hover {
            cursor: pointer;
            transform: scale(1.01);
        }

    .describer {
        display: flex;
        gap: 16px;
        align-items: center;
        background-color: ${theme=> theme.theme.primaryColor};
        padding: 24px 16px;
        opacity: 85%;
        color: white;
        height: 35%;
        position: absolute;
        width: 100%;
        bottom: 0;

        h2 {
            font-size: 1.2rem;
            margin-bottom: 8px;
        }

        .adress {
            display: flex;
            flex-direction: center;
            align-items: center;

            img {
            height: 25px;
            margin-right: 8px;
        }
        }

        .leftSide {

            img {
                width: 70px;
                height: 70px;
                border-radius: 16px;
            }
        }
    }

    @media (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
    }
`

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    
    div {
        font-weight: bold;
        padding: 4px 10px;
        border: 2px solid black;
        border-radius: 2px;
        cursor: pointer;
    }

    .active {
        border: 2px solid ${theme=> theme.theme.primaryColor};  
        color: ${theme=> theme.theme.primaryColor};
    }
`