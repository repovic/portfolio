import styled from "styled-components";

export const PortfolioSection = styled.div`
    width: 100%;
    padding: 150px calc(10rem + 10px);
    background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 90%),
            rgba(0, 0, 0, 90%)
        ),
        url("${process.env.CLIENT_URL}assets/images/portfolio-section.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    transition: 0.5s all ease-in-out;

    @media screen and (max-width: 1500px) {
        padding: 150px calc(4rem + 10px);
    }
    @media screen and (max-width: 1000px) {
        padding: 150px calc(2rem + 10px);
    }
    @media screen and (max-width: 600px) {
        padding: 100px calc(2rem + 10px);
    }
    @media screen and (max-width: 400px) {
        padding: 100px calc(1rem + 10px);
    }
`;

export const Heading = styled.div`
    width: 100%;
    padding-bottom: 30px;
    h1 {
        font-size: 2rem;
        letter-spacing: 1.9px;
        line-height: 1.1;
        font-weight: 300;
        color: ${({ theme }) => theme.white};
        @media screen and (max-width: 1000px) {
            font-size: 1.7rem;
        }
    }

    h2 {
        font-size: 1.6rem;
        font-weight: 300;
        color: ${({ theme }) => theme.white};
        @media screen and (max-width: 1000px) {
            font-size: 1.4rem;
        }
    }

    div {
        width: 50%;
        margin: 20px 0;
        @media screen and (max-width: 1000px) {
            width: 100%;
        }
    }
`;

export const PortfoliosContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    grid-gap: 45px;
    @media screen and (max-width: 1500px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

export const Portfolio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.black};

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
        svg {
            transform: scale(1.05);
            transition: 0.7s ease-in-out !important;
        }
    }
    @media screen and (max-width: 1000px) {
        width: 100%;
        flex-basis: 100%;

        &:hover {
            transition: 0.5s !important;
            img {
                transform: scale(1.2);
            }
            svg {
                transform: scale(1.05);
                transition: 0.7s ease-in-out !important;
            }
        }
    }
`;

export const PortfolioInfo = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.blue};
    width: 100%;
    padding: 10px 15px;
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

export const PortfolioTitle = styled.h3`
    font-size: 1.4rem;
    font-weight: 300;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 1000px) {
        font-size: 1.25rem;
    }
`;

export const PortfolioSubtitle = styled.p`
    font-size: 1.2rem;
    font-weight: 300;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 1000px) {
        font-size: 1.1rem;
    }
`;
