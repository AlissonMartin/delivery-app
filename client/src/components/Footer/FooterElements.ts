import styled from "styled-components";

export const FooterSection = styled.section`
    height: 220px;
    background-color: ${theme=> theme.theme.primaryColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
`

export const Socials = styled.div`
    display: flex;
    gap: 8px;

    img {
        width: 30px;
    }
`