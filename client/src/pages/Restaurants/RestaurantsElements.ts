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
`

export const RestaurantItem = styled.div`

    width: 40%;
    height: 360px;
    background-size: cover;

    .describer {
        background-color: ${theme=> theme.theme.primaryColor};
        opacity: 60%;
        color: white;

        h2 {
            font-size: 1.2rem;
        }

        p {

        }

        img {
            
        }
    }
`