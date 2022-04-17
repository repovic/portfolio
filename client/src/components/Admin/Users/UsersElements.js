import styled from "styled-components";

export const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom: 10px;
`;

export const Filter = styled.select`
    background: ${({ theme }) => theme.dark};
    padding: 12px 15px;
    border-radius: 15px;
    color: ${({ theme }) => theme.white};
    transition: 0.5s ease-in-out;
    border: none;
    outline: none;
    margin-left: 20px;
    option {
        color: ${({ theme }) => theme.white};
        transition: 0.5s ease-in-out;
        border: none;
        outline: none;
        cursor: pointer;
    }
`;

export const SearchInput = styled.input`
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.white};
    outline: none;
    border: none;
    border-radius: 15px;
    font-size: 1rem;
`;

export const ResultsCount = styled.span`
    color: ${({ theme }) => theme.light};
    font-size: 1.05rem;
    font-weight: 300;
    margin-left: 20px;
`;

export const Button = styled.a`
    padding: 10px 15px;
    background: ${({ theme }) => theme.blue};
    border-radius: 15px;
    font-size: 1rem;
    cursor: pointer;
`;

export const User = styled.div`
    width: 100%;
    padding: 15px 15px;
    margin: 10px 0;
    background: ${({ theme }) => theme.dark};

    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const UserDetails = styled.div`
    display: flex;
    align-items: center;
`;

export const DisplayName = styled.h1`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.white};
    font-weight: 200;
`;

export const Role = styled.span`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.light};
    font-weight: 500;
`;

export const Email = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.white};
    font-weight: 200;
`;

export const Username = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.blue};
    font-weight: 200;
`;

export const UserAvatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 15px;
`;

export const UserOptions = styled.div`
    display: flex;
    align-items: center;
    transition: 0.5s ease-in-out;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        cursor: pointer;
        a {
            display: flex;
            padding: 0;
            margin: 0;
            align-items: center;
            justify-content: center;
        }
        &:hover svg {
            transform: scale(1.1);
        }
    }
    svg {
        width: 24px;
        height: 24px;
        fill: ${({ theme }) => theme.white};
        user-select: none;
    }
`;
