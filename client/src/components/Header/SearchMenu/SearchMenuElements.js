import styled from "styled-components";

import { SearchIcon as SearchIconSVG } from "../../../svg";

export const SearchMenuOverlay = styled.div`
    position: fixed;
    top: ${({ isSearchMenuOpen }) =>
        isSearchMenuOpen ? "180px" : "calc(-100% + 180px)"};
    left: 0;
    width: 100vw;
    height: calc(100% - 180px);

    background: rgba(0, 0, 0, 0.7);
    opacity: ${({ isSearchMenuOpen }) => (isSearchMenuOpen ? "1" : "0")};

    backdrop-filter: blur(5px);
    transition: 0.5s ease-in-out;
    z-index: 1337;
`;

export const SearchMenu = styled.div`
    position: fixed;
    top: ${({ isSearchMenuOpen }) =>
        isSearchMenuOpen ? "90px" : "calc(-100%)"};
    left: 0;

    width: 100%;
    height: 90px;
    padding: 0 9.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: ${({ isSearchMenuOpen }) => (isSearchMenuOpen ? "1" : "0")};

    background: ${({ theme }) => theme.black};

    transition: 0.5s ease-in-out;
    z-index: 1336;
    @media screen and (max-width: 1500px) {
        padding: 0 3.5rem;
    }
    @media screen and (max-width: 1000px) {
        padding: 0 1.5rem;
    }
    @media screen and (max-width: 400px) {
        padding: 0 0.9rem;
    }
`;

export const SearchMenuContainer = styled.form`
    position: relative;

    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SearchInput = styled.input`
    position: relative;

    width: 100%;
    padding: 10px 20px;
    padding-right: 40px;

    border-radius: 15px;
    border: none;
    outline: none;

    font-size: 0.9rem;

    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.dark};
    &::placeholder {
        display: flex;
        align-items: center;
        color: white;
    }
`;

export const SearchIcon = styled(SearchIconSVG)`
    position: absolute;
    right: 0.5rem;
    margin: 0 5px;
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.white};
    cursor: pointer;

    @media screen and (max-width: 400px) {
        width: 1.1rem;
        height: 1.1rem;
    }
`;
