import styled from "styled-components";

export const UserDetailsOverlay = styled.div`
    position: fixed;
    top: ${({ isUserDetailsOpen }) =>
        isUserDetailsOpen ? "90px" : "calc(-100% + 180px)"};
    left: 0;
    width: 100vw;
    height: calc(100% - 90px);

    background: rgba(0, 0, 0, 0.7);
    opacity: ${({ isUserDetailsOpen }) => (isUserDetailsOpen ? "1" : "0")};

    backdrop-filter: blur(5px);
    transition: 0.5s ease-in-out;
    z-index: 1337;
`;

export const UserDetails = styled.div`
    position: fixed;
    top: ${({ isUserDetailsOpen }) => (isUserDetailsOpen ? "90px" : "-100%")};
    right: 10rem;
    width: 400px;
    height: auto;

    padding: 15px 30px;

    color: ${({ theme }) => theme.white};

    background: ${({ theme }) => theme.black};

    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border: none;
    outline: none;

    transition: 0.5s ease-in-out;
    z-index: 1337;
    @media screen and (max-width: 1000px) {
        padding: 15px calc(2rem + 5px);
        right: 0;
        width: 100%;
    }
    @media screen and (max-width: 400px) {
        padding: 15px calc(1rem + 5px);
        right: 0;
        width: 100%;
    }
`;

export const ProfileDetails = styled.div`
    width: 100%;
    height: auto;
    padding: 15px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 15px;
`;

export const DisplayName = styled.h1`
    font-size: 1.35rem;
    color: ${({ theme }) => theme.white};
    font-weight: 200;
`;

export const Role = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.light};
    font-weight: 500;
`;

export const Username = styled.p`
    font-size: 1.15rem;
    color: ${({ theme }) => theme.blue};
    font-weight: 200;
`;

export const UserAvatar = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
`;

export const ProfileOptions = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ProfileOption = styled.div`
    width: 100%;
    margin-top: 5px;
    padding: 10px 20px;

    display: flex;
    align-items: center;

    border-radius: 15px;
    background: ${({ theme }) => theme.dark};

    transition: 0.5s ease-in-out;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.blue};
        color: ${({ theme }) => theme.white};
    }
    svg {
        width: 24px;
        height: 24px;
        fill: ${({ theme }) => theme.white};
        margin-right: 20px;
    }
`;
