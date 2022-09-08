import styled from "styled-components";

export const AboutSection = styled.div`
    width: 100%;
    padding: 240px calc(10rem + 10px);
    background: ${({ theme }) => theme.black};

    transition: 0.5s all ease-in-out;
    position: relative;

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

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 3fr;
    column-gap: 50px;
    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        row-gap: 50px;
    }
`;

export const ImageWrapper = styled.div`
    position: sticky;
    top: 90px;
    left: 0;
    max-width: 450px;
    max-height: 450px;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        max-width: 100%;
        position: unset;
        top: unset;
        left: unset;
    }
`;

export const Image = styled.div`
    width: 100%;
    max-width: 400px;
    height: 450px;
    background: ${({ theme }) => theme.dark};
    border-radius: 15px 15px 15px 0;
    position: relative;
    overflow: hidden;
    img {
        object-fit: cover;
        position: absolute;
        width: 100%;
        height: 100%;
    }
`;

export const ImageInfo = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: rgba(0, 13, 255, 1);
    border-bottom-right-radius: 15px;
    width: 100%;
    padding: 10px 10px;
    div:first-child {
        width: 100%;
    }
`;

export const ImageTitle = styled.h3`
    font-size: 1.4rem;
    font-weight: 300;
`;

export const ImageSubtitle = styled.p`
    color: ${({ theme }) => theme.white};
    font-size: 1.15rem;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 300;
`;

export const TextWrapper = styled.div`
    @media screen and (max-width: 1000px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 100px;
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

    div {
        width: 80%;
        margin: 20px 0;
        @media screen and (max-width: 1000px) {
            width: 100%;
        }
    }
`;

export const About = styled.div`
    div {
        text-align: right;
    }
`;

export const AboutText = styled.div`
    * {
        text-align: left;
    }
    p {
        font-size: 1.4rem;
        text-shadow: 0 0 1px transparent;
        color: ${({ theme }) => theme.white};
    }
    h1,
    h2,
    h3 {
        color: ${({ theme }) => theme.white};
    }
`;

export const Skills = styled.div`
    width: 100%;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column !important;
    h3 {
        font-size: 1.7rem;
        line-height: 1.25em;
        font-weight: 500;
        text-align: left;
        padding-bottom: 15px;

        color: ${({ theme }) => theme.white};
        @media screen and (max-width: 1000px) {
            font-size: 1.6rem;
        }
    }
`;

export const Skill = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start !important;
    flex-direction: row !important;
    padding: 5px 0;
    img {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 48px;
        min-height: 48px;
        height: 100%;

        background: ${({ theme }) => theme.white};
    }
    p {
        margin-left: 20px;
        font-size: 1.3rem;
        line-height: 1.25em;
        font-weight: 400;
        color: ${({ theme }) => theme.white};
    }
`;

export const ActionButtons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    a {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1rem;
        padding: 20px;

        margin-left: 10px;
        &:first-child {
            margin-left: 0;
        }
        @media screen and (max-width: 1000px) {
            margin-left: 0;
        }
    }
    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;
