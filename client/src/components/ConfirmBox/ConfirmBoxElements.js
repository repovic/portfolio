import styled from "styled-components";

export const ConfirmBoxOverlay = styled.div`
    position: fixed;
    top: ${({ isShown }) => (isShown ? "0" : "-100%")};
    left: 50%;
    transform: translateX(-50%);

    width: 100%;
    height: 100%;

    opacity: ${({ isShown }) => (isShown ? "1" : "0")};

    background: rgba(0, 0, 0, 0.7);

    backdrop-filter: blur(5px);
    transition: 0.5s ease-in-out;
    z-index: 1338;
`;
export const ConfirmBoxContainer = styled.div`
    position: fixed;
    top: ${({ isShown }) => (isShown ? "0" : "-100%")};
    left: 50%;

    transform: translateX(-50%);

    padding: 20px;
    height: auto;
    width: 400px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-top: 4px ${({ theme }) => theme.blue} solid;
    border-radius: 0 0 15px 15px;

    background: ${({ theme }) => theme.black};
    color: ${(theme) => theme.white};

    transition: 0.5s ease-in-out;
    z-index: 1338;
    @media screen and (max-width: 1000px) {
        width: 100%;
        padding: 20px 1.5rem;
    }
`;

export const Message = styled.div`
    font-size: 1.2rem;

    font-weight: 500;
`;

export const FormGroup = styled.div`
    position: relative;

    padding-top: 20px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;
