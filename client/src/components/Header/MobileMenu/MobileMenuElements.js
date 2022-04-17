import styled from "styled-components";

export const MobileMenu = styled.div`
    position: fixed;
    top: ${({ isNavigationOpen }) =>
        isNavigationOpen ? "80px" : "calc(-100vh + 80px)"};
    left: 0;

    width: 100%;
    min-height: calc(100vh - 80px);
    height: auto;
    padding: 0 10rem;

    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    opacity: ${({ isNavigationOpen }) => (isNavigationOpen ? "1" : "0")};

    //background: ${({ theme }) => theme.black};

    transition: 0.5s all ease-in-out;

    /* Transparent */
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);

    z-index: 1336;
    @media screen and (max-height: 450px) {
        position: absolute;
    }
    @media screen and (max-width: 1500px) {
        padding: 0 4rem;
    }
    @media screen and (max-width: 1000px) {
        display: flex;
        padding: 0 2rem;
    }
    @media screen and (max-width: 400px) {
        padding: 0 1rem;
    }
    a {
        width: 100%;
    }
`;

export const MenuLink = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.white};
    font-size: 1.4rem;

    width: 100%;
    padding: 15px 5px;
    margin: 5px 0;

    cursor: pointer;
`;
