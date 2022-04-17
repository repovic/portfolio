import styled from "styled-components";

export const ScrollTop = styled.div`
    position: fixed;
    right: ${({ isShown }) => (isShown ? "40px" : "-200px")};
    bottom: 50px;

    width: 45px;
    height: 45px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.blue};

    border-radius: 15px;

    transition: 0.5s ease-in-out;
    cursor: pointer;
    z-index: 1335;
    &:hover {
        background: ${({ theme }) => theme.blue};
    }
    svg {
        width: 20px;
        height: 20px;
        fill: ${({ theme }) => theme.white};
    }
`;
