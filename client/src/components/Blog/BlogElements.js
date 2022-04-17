import styled from "styled-components";

export const Blog = styled.div`
    width: 100%;
    padding: 50px calc(10rem + 5px);
    background: ${({ theme }) => theme.black};

    transition: 0.5s all ease-in-out;

    @media screen and (max-width: 1500px) {
        padding: 0 calc(4rem + 5px);
    }

    @media screen and (max-width: 1000px) {
        padding: 0 calc(2rem + 5px);
    }

    @media screen and (max-width: 400px) {
        padding: 0 calc(1rem + 5px);
    }
`;

export const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
        align-items: unset;
        justify-content: unset;
        flex-direction: column;
    }
`;

export const Heading = styled.h1`
    font-size: 2rem;
    font-weight: 500;

    color: ${({ theme }) => theme.white};
    transition: 0.5s ease-in-out;
    &.error-message {
        padding: 50px 0;
    }
`;

export const Filter = styled.select`
    background: ${({ theme }) => theme.dark};
    padding: 12px 15px;
    border-radius: 15px;
    color: ${({ theme }) => theme.white};
    transition: 0.5s ease-in-out;
    border: none;
    outline: none;
    margin-left: 20px;
    @media screen and (max-width: 1000px) {
        margin-left: 0;
    }
    option {
        color: ${({ theme }) => theme.white};
        transition: 0.5s ease-in-out;
        border: none;
        outline: none;
        cursor: pointer;
    }
`;

export const SearchInput = styled.input`
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.white};
    outline: none;
    border: none;
    border-radius: 15px;
    font-size: 1rem;
    @media screen and (max-width: 1000px) {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

export const ResultsCount = styled.span`
    color: ${({ theme }) => theme.light};
    font-size: 1.05rem;
    font-weight: 300;
    margin-left: 20px;
`;

export const Button = styled.a`
    padding: 10px 15px;
    background: ${({ theme }) => theme.blue};
    border-radius: 15px;
    font-size: 1rem;
    cursor: pointer;
    @media screen and (max-width: 1500px) {
        display: none;
    }
`;

export const BlogContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    grid-gap: 20px;
    padding: 50px 0;
    @media screen and (max-width: 1500px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

export const Post = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    width: auto;
    height: 300px;

    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;

    overflow: hidden;
    cursor: pointer;
    transition: 0.5s ease-in-out !important;
    img {
        height: 100%;
        width: 100%;
        transition: 0.5s ease-in-out !important;
        object-fit: cover;
    }
    &:hover {
        transition: 0.5s !important;
        img {
            transform: scale(1.5);
        }
    }
    @media screen and (max-width: 1000px) {
        width: 100%;
        flex-basis: 100%;
    }
`;

export const PostInfo = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.blue};
    width: 100%;
    padding: 10px 10px;
    z-index: 1;

    div {
        max-width: 70%;
    }
    svg {
        width: 30px;
        fill: white;
        transition: 1s ease-in-out !important;
    }
`;

export const PostTitle = styled.h3`
    font-size: 1.4;
    font-weight: 300;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const PostExcerpt = styled.p`
    font-size: 1.2;
    font-weight: 300;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    max-height: 3.6em; /* (Number of lines you want visible) * (line-height) */
    line-height: 1.2em;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;
