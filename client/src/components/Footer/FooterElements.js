import styled from "styled-components";

export const Footer = styled.div`
    width: 100%;
    padding: 50px calc(10rem + 5px);

    background: ${({ theme }) => theme.black};

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media screen and (max-width: 1500px) {
        padding: 50px 4rem;
    }

    @media screen and (max-width: 1000px) {
        padding: 50px 2rem;
    }
`;

export const Copyright = styled.p`
    flex: 1;

    color: ${({ theme }) => theme.white};
    font-size: 1.25rem;
    font-weight: 400;

    max-width: 50%;
    flex-basis: 50%;

    a {
        color: ${({ theme }) => theme.blue};
    }

    @media screen and (max-width: 1500px) {
        padding-bottom: 1.5rem;

        max-width: 100%;
        flex-basis: 100%;
        justify-content: center;

        text-align: center;
    }
`;

export const SocialMedia = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    color: ${({ theme }) => theme.white};
    font-size: 1.15rem;
    font-weight: 400;

    max-width: 50%;
    flex-basis: 50%;

    @media screen and (max-width: 1500px) {
        max-width: 100%;
        flex-basis: 100%;
        justify-content: center;

        text-align: center;
    }
`;

export const SocialMediaItem = styled.a`
    width: 45px;
    height: 45px;
    margin: 0 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.dark};

    border-radius: 15px;

    transition: 0.5s ease-in-out;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.blue};
    }
    svg {
        width: 20px;
        height: 20px;
        fill: ${({ theme }) => theme.white};
    }

    &:last-child {
        margin-right: 0;
    }

    @media screen and (max-width: 1500px) {
        &:last-child {
            margin-right: 10px;
        }
    }
`;
