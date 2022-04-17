import styled from "styled-components";

export const Project = styled.div`
    width: 100%;
    padding: 0 10rem;
    background: ${({ theme }) => theme.black};

    transition: 0.5s all ease-in-out;

    @media screen and (max-width: 1500px) {
        padding: 0 calc(4rem + 5px);
    }
    @media screen and (max-width: 1000px) {
        padding: 0;
    }
    @media screen and (max-width: 600px) {
        padding: 0;
    }
    @media screen and (max-width: 400px) {
        padding: 0;
    }
`;

export const Thumbnail = styled.div`
    width: 100%;
    position: relative;
    img {
        width: 100%;
    }
`;

export const Heading = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 40px 20px;
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6)
    );

    display: flex;
    align-items: center;
    justify-content: space-between;

    backdrop-filter: blur(2px);

    div:first-child {
        width: 70%;
    }
    .w20 {
        a {
            width: auto;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            @media screen and (max-width: 1000px) {
                width: 100%;
            }
        }
    }
    .hide-pc {
        display: none;
        @media screen and (max-width: 1000px) {
            display: unset;
        }
    }
    .hide-mobile {
        @media screen and (max-width: 1000px) {
            display: none;
        }
    }
    @media screen and (max-width: 1000px) {
        padding: 20px calc(2rem + 5px);
    }
    @media screen and (max-width: 600px) {
        padding: 20px calc(2rem + 5px);
    }
    @media screen and (max-width: 400px) {
        padding: 20px calc(1rem + 5px);
    }
`;
export const Excerpt = styled.h2`
    font-size: 1rem;
    letter-spacing: 1.2px;
    line-height: 1.1;
    font-weight: 300;
    text-transform: uppercase;
    padding-bottom: 5px;
    color: ${({ theme }) => theme.blue};
    @media screen and (max-width: 1000px) {
        white-space: nowrap;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.9rem;
    }
`;

export const Title = styled.h1`
    font-size: 2rem;
    letter-spacing: 1.9px;
    line-height: 1.1;
    font-weight: 300;
    color: ${({ theme }) => theme.white};
    @media screen and (max-width: 1000px) {
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.7rem;
    }
`;

export const Content = styled.div`
    padding: 15px 0;
    img {
        width: 100%;
    }
    p {
        font-size: 1.4rem;
        font-weight: 400;
        color: ${({ theme }) => theme.white};
        text-align: justify;
        @media screen and (max-width: 1000px) {
            font-size: 1.2rem;
        }
    }
    @media screen and (max-width: 1500px) {
        padding: 15px calc(4rem + 5px);
    }
    @media screen and (max-width: 1000px) {
        padding: 15px calc(2rem + 5px);
    }
    @media screen and (max-width: 600px) {
        padding: 15px calc(2rem + 5px);
    }
    @media screen and (max-width: 400px) {
        padding: 15px calc(1rem + 5px);
    }
`;

export const Meta = styled.h3`
    font-size: 1.3rem;
    font-weight: 300;
    color: ${({ theme }) => theme.white};
    padding-bottom: 20px;
    @media screen and (max-width: 1000px) {
        font-size: 1.2rem;
    }
`;

export const Description = styled.div`
    max-width: 100%;
    overflow: hidden;
    h1 {
        font-size: 2rem;
        line-height: 1.1;
        font-weight: 300;
        color: ${({ theme }) => theme.white};
        @media screen and (max-width: 1000px) {
            font-size: 1.7rem;
        }
    }
    h1,
    h2,
    h3 {
        line-height: 1.1;
        font-weight: 300;
        color: ${({ theme }) => theme.white};
        text-align: left;
        padding: 30px 0;
    }
    p {
        line-height: 1.1;
        font-weight: 300;
        color: ${({ theme }) => theme.white};
        text-align: left;
        line-height: 1.5rem;
    }
    a {
        color: ${({ theme }) => theme.blue};
        text-decoration: underline;
    }
`;

export const Blue = styled.span`
    color: ${({ theme }) => theme.blue};
`;

export const Gallery = styled.div``;
