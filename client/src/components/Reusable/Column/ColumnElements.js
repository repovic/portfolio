import styled from "styled-components";

export const Column = styled.div`
    flex: 1;
    max-width: 50%;
    flex-basis: 50%;
    @media screen and (max-width: 1000px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;
