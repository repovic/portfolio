import styled from "styled-components";

export const NotificationOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${({ isShown }) => (isShown ? "block" : "none")};
    opacity: ${({ isShown }) => (isShown ? "1" : "0")};

    z-index: 1337;
`;

export const Notification = styled.div`
    position: fixed;
    top: calc(90px + 10px);

    right: ${({ isShown }) => (isShown ? "0" : "-400px")};

    padding: 20px 20px;
    padding-right: 30px;
    min-height: 90px;
    height: auto;
    width: 400px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.black};
    border-left: 4px
        ${({ type }) =>
            type == "success"
                ? ({ theme }) => theme.blue
                : type == "error"
                ? ({ theme }) => theme.red
                : ({ theme }) => theme.black}
        solid;

    border-radius: 15px 0 0 15px;
    transition: 0.5s ease-in-out;
    z-index: 1338;
`;

export const Message = styled.div`
    font-size: 100%;
    font-weight: 300;
    padding-right: 10px;
`;

export const CloseButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 18px;
        fill: ${({ theme }) => theme.white};
    }

    cursor: pointer;
`;
