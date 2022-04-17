import styled from "styled-components";

export const Page404 = styled.div`
    width: 100%;
    padding: 200px 10rem;
    background: ${({ theme }) => theme.black};

    transition: 0.5s all ease-in-out;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1500px) {
        padding: 200px calc(4rem + 5px);
    }

    @media screen and (max-width: 1000px) {
        padding: 150px calc(2rem + 5px);
    }

    @media screen and (max-width: 400px) {
        padding: 150px calc(1rem + 5px);
    }
`;

export const Container = styled.div`
    background: ${({ theme }) => theme.black};
    border-radius: 15px;
    padding: 50px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        width: 50%;
        @media screen and (max-width: 1000px) {
            width: 70%;
        }
    }
`;

export const Message = styled.h2`
    color: ${({ theme }) => theme.white};
    font-weight: 300;
    font-size: 2rem;
    text-align: center;
    margin: 50px 0;
    @media screen and (max-width: 1000px) {
        font-size: 1.5rem;
    }
`;
