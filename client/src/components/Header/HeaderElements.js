import styled from "styled-components";

export const Header = styled.div`
    position: sticky;
    top: 0;
    left: 0;

    width: 100%;
    height: 90px;
    padding: 0 10rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: ${({ theme }) => theme.black};

    color: ${({ theme }) => theme.white};

    transition: all 0.5s ease-in-out;

    z-index: 1337;
    @media screen and (max-width: 1500px) {
        padding: 0 4rem;
    }

    @media screen and (max-width: 1000px) {
        padding: 0 2rem;
    }

    @media screen and (max-width: 400px) {
        padding: 0 1rem;
    }
`;

export const Branding = styled.div`
    display: flex;
    align-items: center;

    li {
        display: none;
    }

    @media screen and (max-width: 1000px) {
        li {
            display: flex;
        }
    }
`;

export const Title = styled.h1`
    font-size: 1.6rem;
    font-weight: 400;
    padding: 0 10px;

    @media screen and (max-width: 1000px) {
        font-size: 1.4rem;
    }
    @media screen and (max-width: 400px) {
        font-size: 1.3rem;
    }
`;

export const Navigation = styled.ul`
    display: flex;
`;

export const NavLink = styled.li`
    position: relative;

    display: flex;
    align-items: center;

    height: 90px;
    padding: 0 15px;

    font-size: 1.15rem;
    font-weight: 300;

    cursor: pointer;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 3px;
        background: ${({ theme }) => theme.blue};

        transition: 0.3s ease-in-out;
    }

    &:hover::after {
        width: ${({ noHover }) => (noHover ? "0" : "100%")};
    }

    @media screen and (max-width: 1000px) {
        display: none;
    }
`;

export const NavIcon = styled.li`
    display: flex;
    align-items: center;

    height: 90px;
    padding: 0 10px;

    font-size: 1.05rem;
    font-weight: 300;

    cursor: pointer;

    &:hover svg {
        fill: ${(props) => props.theme.blue};
        transform: scale(1.2);
        transition: all 0.5s ease-in-out;
    }

    svg {
        width: 1.25rem;
        height: 1.25rem;
        fill: ${(props) => props.theme.white};

        @media screen and (max-width: 400px) {
            width: 1.1rem;
            height: 1.1rem;
        }
    }

    @media screen and (max-width: 1000px) {
        &:hover svg {
            fill: ${(props) => props.theme.white};
            transform: scale(1);
            transition: all 0.5s ease-in-out;
        }
        &:first-child {
            display: flex;
        }
    }
`;
