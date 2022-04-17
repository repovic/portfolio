import styled from "styled-components";

export const Layout = styled.div`
    width: 100%;
    height: calc(100vh - 90px);

    display: flex;
    @media screen and (max-width: 1600px) {
        display: none;
    }
`;

export const LeftSidebar = styled.div`
    width: 20%;
    height: 100%;
    overflow: auto;

    background: ${({ theme }) => theme.black};
`;

export const Profile = styled.div`
    width: 100%;
    height: auto;

    padding: 20px 10px;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 15px;

    background: ${({ theme }) => theme.black};
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
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

export const SidebarActon = styled.div`
    width: 100%;
    padding: 20px 0;
    padding-left: calc(10rem - 55px);
    margin-bottom: 8px;

    background: ${({ isActive }) =>
        isActive ? ({ theme }) => theme.blue : ({ theme }) => theme.dark};

    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;

    display: flex;
    align-items: center;

    transition: 0.5s ease-in-out;
    position: relative;
    z-index: 2;
    svg {
        width: 30px;
        margin-right: 30px;
        fill: ${({ theme }) => theme.white};
    }
    p {
        font-size: 1.2rem;
        font-weight: 500;

        color: ${({ theme }) => theme.white};
        transition: 0.5s ease-in-out;
    }
    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);

        height: 100%;
        width: 0;

        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;

        background: ${({ theme }) => theme.blue};

        transition: 0.5s ease-in-out;
        z-index: -1;
    }
    &:hover::before {
        width: 100%;
    }
`;

export const Page = styled.div`
    width: 80%;
    min-height: 100%;
    height: auto;
    max-height: 20vh;
    overflow: hidden;
    overflow-y: visible;
    padding: 70px;
`;

export const Heading = styled.div`
    width: 100%;
    padding-bottom: 20px;
    h1 {
        font-size: 2rem;
        font-weight: 500;

        color: ${({ theme }) => theme.white};
        transition: 0.5s ease-in-out;
    }
`;

export const Copyright = styled.div`
    width: calc(80% - 10px);
    height: 60px;
    background: ${({ theme }) => theme.black};
    position: absolute;
    bottom: 0;
    left: 20%;

    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-size: 1.2rem;
        font-weight: 300;
        color: ${({ theme }) => theme.light};
    }
`;
