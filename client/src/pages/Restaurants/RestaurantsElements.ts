import styled from "styled-components";

export const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    font-size: 1.2rem;
    padding: 6px 8px;
    
`

export const RestaurantsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
`

export const RestaurantItem = styled.div`

    width: 40%;
    height: 360px;
    background-size: cover;
    position: relative;

    .describer {
        background-color: ${theme=> theme.theme.primaryColor};
        padding: 24px 16px;
        opacity: 60%;
        color: white;
        height: 35%;
        position: absolute;
        width: 100%;
        bottom: 0;

        h2 {
            font-size: 1.2rem;
            margin-bottom: 8px;
        }

        p {

        }

        img {
            height: 25px;
        }

        div {
            display: flex;
            flex-direction: center;
            align-items: center;
        }
    }
`