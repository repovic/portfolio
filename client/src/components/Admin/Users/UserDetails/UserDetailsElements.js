import styled from "styled-components";

export const UserDetails = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export const FormSection = styled.div``;

export const AvatarUpdateSection = styled.div`
    position: sticky;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;

    height: 80%;
    img {
        width: 256px;
        max-width: 256px;
        min-height: 256px;
        max-height: 256px;
        border-radius: 50%;
        margin-bottom: 30px;
    }

    p {
        width: 40%;
        text-align: left;
    }
`;

export const Id = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.light};
    font-weight: 500;
    margin-bottom: 10px;
`;

export const Label = styled.p`
    color: ${({ theme }) => theme.white};
    font-size: 1.1rem;
    margin-bottom: 5px;
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
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
        left: 10px;
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

export const Timestamps = styled.div`
    p {
        font-size: 1.1rem;
        color: ${({ theme }) => theme.light};
        font-weight: 500;
    }
    padding-bottom: 10px;
`;

export const Input = styled.input`
    background: ${({ theme }) => theme.dark};

    padding: 10px 20px;
    padding-left: 50px;
    padding-right: 70px;
    width: 100%;

    color: ${({ theme }) => theme.white};
    font-size: 1rem;

    border: 1px transparent solid;
    border-radius: 15px;
    outline: none;
    &[type="file"] {
        width: 40%;
        padding: 10px 20px;
        cursor: pointer;
        &::-webkit-file-upload-button {
            display: none;
        }
    }
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

export const Select = styled.select`
    background: ${({ theme }) => theme.dark};

    padding: 10px 20px;
    padding-left: 50px;
    padding-right: 70px;
    width: 100%;

    color: ${({ theme }) => theme.white};
    font-size: 1rem;

    border: 1px transparent solid;
    border-radius: 15px;
    outline: none;
`;
