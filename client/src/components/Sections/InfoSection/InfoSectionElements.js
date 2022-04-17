import styled from "styled-components";

export const InfoSection = styled.div`
    width: 100%;
    padding: 260px calc(10rem + 10px);

    background-repeat: no-repeat;
    background-size: cover;
    background-image: linear-gradient(
            to left,
            rgba(0, 0, 0, 60%),
            rgba(0, 0, 0, 70%)
        ),
        url("${process.env.CLIENT_URL}assets/images/${({ backgroundImage }) =>
            backgroundImage}");

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

export const TextWrapper = styled.div`
    max-width: 540px;
    @media screen and (max-width: 1500px) {
        padding-bottom: 65px;
    }
`;

export const TopLine = styled.div`
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1rem;
    letter-spacing: 1.8px;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.blue};
`;

export const Heading = styled.h1`
    font-size: 2.7rem;
    letter-spacing: 1.9px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({ theme }) => theme.white};
    @media screen and (max-width: 1000px) {
        font-size: 2rem;
    }
`;

export const JobTitle = styled.p`
    color: ${({ theme }) => theme.white};
    margin-bottom: 24px;
    font-weight: 300;
    font-size: 1.2rem;
`;

export const Linebreak = styled.hr`
    width: 50%;
    height: 5px;
    margin: 10px 0;
    background: ${({ theme }) => theme.blue};
    border: none;
`;

export const Subtitile = styled.p`
    max-width: 440px;
    margin-top: 15px;
    margin-bottom: 35px;
    font-size: 1.4rem;
    font-weight: 200;
    line-height: 26px;
    color: ${({ theme }) => theme.white};
`;

export const ImageWrapper = styled.div`
    display: flex;
    padding: 30px 0;
    img {
        max-width: 550px;
        max-height: 550px;
        margin-left: auto;
        @media screen and (max-width: 1500px) {
            max-width: 500px;
            width: 80vw;
            height: 100%;
        }
    }
    transition: 0;
`;

export const InfoSectionImage = styled.img``;
