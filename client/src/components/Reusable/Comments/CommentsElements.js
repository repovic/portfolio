import styled from "styled-components";

export const Comments = styled.div`
    padding: 15px 0;
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
    @media screen and (max-width: 1000px) {
        font-size: 1.7rem;
    }
`;

export const Comment = styled.div`
    width: 100%;
    padding: 5px 0;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 15px;

    @media screen and (max-width: 1000px) {
        margin: 5px 0;
    }
`;

export const CommentData = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    border-radius: 15px;
    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

export const UserAvatar = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 20px;
    margin-top: 15px;
    align-self: flex-start;
    @media screen and (max-width: 1000px) {
        width: 45px;
        height: 45px;
    }
`;

export const CommentDetails = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    overflow: hidden;

    flex: 6;
    div {
        font-size: 1.35rem;
        @media screen and (max-width: 1000px) {
            font-size: 1.15rem;
        }
    }
    @media screen and (max-width: 1000px) {
        flex: 1;
    }
`;

export const Username = styled.p`
    font-size: 1.35rem;
    color: ${({ theme }) => theme.white};
    font-weight: 500;
    display: inline;
    @media screen and (max-width: 1000px) {
        font-size: 1.15rem;
    }
`;

export const PostedAt = styled.p`
    font-size: 1.35rem;
    color: ${({ theme }) => theme.light};
    font-weight: 500;
    display: inline;
    @media screen and (max-width: 1000px) {
        display: none;
    }
    &::before {
        content: " • ";
        color: ${({ theme }) => theme.white};
    }
`;

export const CommentContent = styled.p`
    font-size: 1.55rem;
    color: ${({ theme }) => theme.light};
    font-weight: 400;
    word-wrap: break-word;

    @media screen and (max-width: 1000px) {
        font-size: 1.35rem;
    }
`;

export const CommentActions = styled.div`
    flex-basis: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    flex: 1;
    &:last-child {
        margin: 0;
    }
    @media screen and (max-width: 1000px) {
        flex: 1;
    }
`;

export const CommentAction = styled.div`
    display: flex;
    padding: 10px;
    border-radius: 15px;
    background: ${({ theme }) => theme.dark};
    margin: 0 5px;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    svg {
        width: 24px;
        fill: ${({ theme }) => theme.white};
    }
    &.mr {
        svg {
            margin-right: 10px;
        }
    }
    &.bg-none {
        background: none;
    }
    &.bg-blue {
        background: ${({ theme }) => theme.blue};
    }
    &:not(.bg-blue) {
        &:hover {
            background: ${({ theme }) => theme.blue};
        }
    }
    @media screen and (max-width: 1000px) {
        margin-top: 10px;
    }
`;

export const PostCommentContainer = styled.div`
    width: 100%;
    padding: 5px 0;
    margin: 5px 0;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 15px;
`;
export const PostCommentDetails = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    overflow: hidden;

    flex: 6;
    div {
        * {
            font-size: 1.35rem;
            @media screen and (max-width: 1000px) {
                font-size: 1.15rem;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        flex: 1;
    }
`;

export const PostCommentInput = styled.textarea`
    width: 100%;
    padding: 10px 0;
    height: 60px;
    background: none;
    outline: none;
    border: none;
    overflow-x: hidden;
    resize: none;
    border-bottom: 1px ${({ theme }) => theme.light} solid;
    color: ${({ theme }) => theme.light};
    font-size: 1.35rem;
    &:focus {
        border-bottom: 1px ${({ theme }) => theme.blue} solid;
    }
    &::placeholder {
        color: ${({ theme }) => theme.light};
    }
    @media screen and (max-width: 1000px) {
        height: 50px;
        font-size: 1.15rem;
    }
`;
