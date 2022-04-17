import styled from "styled-components";

export const SignInContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 200px 0;

    background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.5)
        ),
        url("./assets/images/auth-section.jpg");
    background-position: right;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1000px) {
        padding: 110px 0;
    }
`;

export const SignIn = styled.div`
    width: 30vw;
    padding: 30px 15px;
    margin: 30px 0;

    color: ${({ theme }) => theme.white};

    background: ${({ theme }) => theme.black};

    display: flex;
    justify-content: center;
    flex-direction: column;

    border-radius: 15px;

    transition: 0.5s ease-in-out;

    max-width: 600px;

    @media screen and (max-width: 1000px) {
        padding: 20px 15;
        margin: 0;
        width: calc(100vw - (4rem + 10px));
    }
    @media screen and (max-width: 400px) {
        width: calc(100vw - (1rem + 20px));
    }
`;

export const Heading = styled.h1`
    font-size: 1.65rem;
    font-weight: 300;
`;

export const Subtitle = styled.h3`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.light};
    font-weight: 200;

    padding-bottom: 35px;
    @media screen and (max-width: 1000px) {
        font-size: 1rem;
    }
`;

export const Blue = styled.span`
    color: ${({ theme }) => theme.blue};
`;

export const SignInForm = styled.form``;

export const Label = styled.p`
    color: ${({ theme }) => theme.white};
    font-size: 1.1rem;
    margin-bottom: 5px;
`;

export const FormGroup = styled.div`
    position: relative;

    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-bottom: 30px;
    &:nth-child(4) {
        input {
            padding-right: 80px;
        }
    }
    &:last-child {
        padding-top: 20px;
        padding-bottom: 0;
    }
    svg {
        position: absolute;
        left: 15px;
        width: 24px;
        height: 24px;
        fill: ${({ theme }) => theme.white};
    }
    span {
        position: absolute;
        font-size: 1rem;
        right: 10px;

        cursor: pointer;
    }
`;

export const Input = styled.input`
    background: ${({ theme }) => theme.dark};

    padding: 10px 15px;
    padding-left: 50px;
    width: 100%;

    color: ${({ theme }) => theme.white};
    font-size: 1rem;

    border: 1px transparent solid;
    border-radius: 15px;
    outline: none;
    &:focus {
        border: 1px ${({ theme }) => theme.blue} solid;
        transition: 0.5s ease-in-out;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        transition: all 5000s ease-in-out 0s;
    }
`;
