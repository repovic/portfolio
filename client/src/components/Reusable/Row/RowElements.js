import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    flex-wrap: ${({ reverseWrap }) => (reverseWrap ? "wrap-reverse" : "wrap")};
    align-items: center;
    flex-direction: row;
`;
