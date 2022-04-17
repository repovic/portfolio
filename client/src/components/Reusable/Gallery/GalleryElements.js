import styled from "styled-components";

export const Gallery = styled.div`
    padding: 15px 0;
    width: 100%;

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

export const Title = styled.h1`
    font-size: 2rem;
    letter-spacing: 1.9px;
    line-height: 1.1;
    font-weight: 300;
    color: ${({ theme }) => theme.white};
    padding-bottom: 20px;
    @media screen and (max-width: 1000px) {
        font-size: 1.7rem;
    }
`;

export const ImagesContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

    grid-gap: 25px;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        transform: scale(1.05);
    }
`;

export const OpenedImage = styled.div`
    position: fixed;
    width: 60%;

    top: ${({ openedImage }) => (openedImage ? "50%" : "-100%")};
    left: 50%;
    transform: translate(-50%, -50%);

    transition: 0.5s;

    z-index: 1338;

    img {
        position: relative;
        width: 100%;
        border-radius: 15px;
    }

    @media screen and (max-width: 1000px) {
        width: 100%;
    }
`;

export const OpenedImageOverlay = styled.div`
    position: fixed;
    top: ${({ openedImage }) => (openedImage ? "0" : "-100%")};
    left: 0;
    width: 100vw;
    height: 100%;

    background: rgba(0, 0, 0, 0.7);
    opacity: ${({ openedImage }) => (openedImage ? "1" : "0")};

    transition: 0.5s ease-in-out;

    backdrop-filter: blur(5px);
    z-index: 1337;
`;
