import {
    NotificationOverlay,
    Notification,
    Message,
    CloseButton,
} from "./NotificationElements";

import { CloseIcon } from "../../svg";

const NotificationComponent = ({
    message,
    type,
    isShown,
    closeNotification,
    ...rest
}) => {
    return (
        <>
            <NotificationOverlay
                isShown={isShown}
                onClick={closeNotification}
                {...rest}
            />
            <Notification isShown={isShown} type={type}>
                <Message>{message}</Message>
                <CloseButton onClick={closeNotification}>
                    <CloseIcon />
                </CloseButton>
            </Notification>
        </>
    );
};

export default NotificationComponent;
