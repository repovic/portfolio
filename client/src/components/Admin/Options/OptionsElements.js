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

export const Option = styled.div`
    width: 100%;
    padding: 15px 15px;
    margin: 10px 0;
    background: ${({ theme }) => theme.dark};

    border-radius: 15px;

    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
`;

export const OptionName = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    margin-right: 15px;
    font-size: 1.15rem;
    div {
        font-size: 1.25rem;
    }
    word-wrap: break-word;
`;

export const OptionValue = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    font-size: 1.15rem;
    div {
        font-size: 1.25rem;
    }
    word-wrap: break-word;
`;

export const OptVal = styled.code`
    display: block;
    font-family: monospace;
    white-space: pre-wrap;
    margin: 1em 0px;
    font-size: 1.25rem;
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: 0.5s ease-in-out;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        cursor: pointer;
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

export const Label = styled.h4`
    color: ${({ theme }) => theme.light};
`;
