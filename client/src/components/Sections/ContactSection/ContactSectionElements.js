import styled from "styled-components";

export const ContactSection = styled.div`
    width: 100%;
    padding: 240px calc(10rem + 10px);
    background-image: linear-gradient(
            to left,
            rgba(0, 0, 0, 90%),
            rgba(0, 0, 0, 90%)
        ),
        url("${process.env.CLIENT_URL}assets/images/contact-section.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    transition: 0.5s all ease-in-out;

    @media screen and (max-width: 1500px) {
        padding: 150px calc(4rem + 10px);
        background-attachment: fixed;
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

export const ContactDetails = styled.div`
    flex: 1;
    max-width: 40%;
    flex-basis: 40%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    div {
        width: 100%;
    }
    @media screen and (max-width: 1000px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: flex-start;
    }
`;

export const DetailLabel = styled.p`
    color: ${({ theme }) => theme.white};
    font-size: 1.4rem;
    margin-bottom: 5px;
`;

export const ContactDetail = styled.div`
    background: ${({ theme }) => theme.dark};

    padding: 10px 15px;

    color: ${({ theme }) => theme.white};
    font-size: 1.25rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border: 1px transparent solid;
    border-radius: 15px;

    margin-bottom: 30px;

    transition: 0.5s ease-in-out;
    cursor: pointer;
    svg {
        width: 24px;
        height: 24px;
        fill: ${({ theme }) => theme.white};
    }
    &:hover {
        background: ${({ theme }) => theme.blue};
    }
`;

export const Location = styled.iframe`
    width: 100%;
    height: 300px;
    border: 0;
    border-radius: 15px;
`;

export const ContactFormWrapper = styled.div`
    flex: 1;
    max-width: 50%;
    flex-basis: 50%;

    div {
        width: 100%;
    }
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

export const ContactForm = styled.form`
    input {
        padding: 10px 20px;
        padding-left: 50px;
        padding-right: 20px;
    }
`;

export const Label = styled.p`
    color: ${({ theme }) => theme.white};
    font-size: 1.4rem;
    margin-bottom: 5px;
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    &.wrap-reverse {
        flex-wrap: wrap-reverse;
    }
`;

export const Column = styled.div`
    flex: 1;
    max-width: 45%;
    flex-basis: 45%;
    div {
        width: 100%;
    }
    @media screen and (max-width: 1000px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

export const FormGroup = styled.div`
    position: relative;

    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-bottom: 30px;
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
    a {
        margin-top: 20px;
    }
`;

export const Input = styled.input`
    background: ${({ theme }) => theme.dark};

    padding: 10px 15px;
    padding-left: 50px;
    padding-right: 70px;
    width: 100%;

    color: ${({ theme }) => theme.white};
    font-size: 1.25rem;

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

export const TextArea = styled.textarea`
    background: ${({ theme }) => theme.dark};

    padding: 10px 15px;
    min-height: 150px;
    height: 150px;
    min-width: 100%;
    width: 100%;
    max-width: 100%;

    color: ${({ theme }) => theme.white};
    font-size: 1.25rem;

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
