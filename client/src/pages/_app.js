import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../constants/theme";
import { Notification, ConfirmBox, ScrollTop } from "../components/";
import {
    UserProvider,
    NotificationContext,
    ConfirmBoxContext,
} from "../context/";

import "../styles/globals.css";
import "../styles/markdown.css";
import "aos/dist/aos.css";
import AOS from "aos";

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    // #region Context State
    const [notification, setNotification] = useState({
        message: null,
        type: null,
        isShown: false,
    });
    const [confirmBox, setConfirmBox] = useState({
        message: null,
        cb: () => {},
        isShown: false,
    });
    // #endregion

    useEffect(() => {
        AOS.init({
            duration: 500,
            disable: () => window.innerWidth < 1800,
            offset: 50,
        });

        if (window.location.toString().indexOf("#") > 0) {
            router.replace(
                window.location
                    .toString()
                    .substring(0, window.location.toString().indexOf("#"))
            );
        }
    }, [router]);

    // #region Notification
    useEffect(() => {
        const { notificationMessage, notificationType } = router.query;
        if (notificationMessage && notificationType) {
            showNotification(notificationMessage, notificationType);
            router.replace(
                window.location
                    .toString()
                    .substring(0, window.location.toString().indexOf("?")),
                "",
                { shallow: true }
            );
        }
    }, [router]);

    const showNotification = (message, type) => {
        closeNotification();

        setNotification({
            message: message,
            type: type,
            isShown: true,
        });
    };

    const closeNotification = () => {
        setNotification({
            message: null,
            type: null,
            isShown: false,
        });
    };

    var notificationClearTimeout;
    useEffect(() => {
        clearTimeout(notificationClearTimeout);
        notificationClearTimeout = setTimeout(closeNotification, 7_000);
    }, [notification.isShown]);
    // #endregion

    // #region ConfirmBox
    const showConfirmBox = (message, cb) => {
        closeConfirmBox();
        setConfirmBox({
            message,
            cb,
            isShown: true,
        });
    };

    const closeConfirmBox = (message, cb) => {
        setConfirmBox({
            message: null,
            cb: () => {},
            isShown: false,
        });
    };
    // #endregion

    // #region ASCII Art
    useEffect(() => {
        console.clear();
        console.log(
            `%c
 ██████╗ ██╗   ██╗  ██████╗ ███████╗██████╗  ██████╗ ██╗   ██╗██╗ ██████╗
██╔═══██╗██║   ██║  ██╔══██╗██╔════╝██╔══██╗██╔═══██╗██║   ██║██║██╔════╝
██║██╗██║██║   ██║  ██████╔╝█████╗  ██████╔╝██║   ██║██║   ██║██║██║     
██║██║██║╚██╗ ██╔╝  ██╔══██╗██╔══╝  ██╔═══╝ ██║   ██║╚██╗ ██╔╝██║██║     
╚█║████╔╝ ╚████╔╝██╗██║  ██║███████╗██║     ╚██████╔╝ ╚████╔╝ ██║╚██████╗
 ╚╝╚═══╝   ╚═══╝ ╚═╝╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝   ╚═══╝  ╚═╝ ╚═════╝`,
            "color: #000DDF;"
        );
        console.log(
            "%cTech Stack @ https://www.repovic.ga/project/portfolio/",
            "color: #000DFF;font-size: 20px;"
        );
    }, []);
    // #endregion

    return (
        <UserProvider>
            <NotificationContext.Provider
                value={{ notification, showNotification, closeNotification }}
            >
                <ConfirmBoxContext.Provider
                    value={{ confirmBox, showConfirmBox, closeConfirmBox }}
                >
                    <ThemeProvider theme={theme}>
                        <Notification
                            message={notification.message}
                            type={notification.type}
                            isShown={notification.isShown}
                            closeNotification={closeNotification}
                        />
                        <ConfirmBox
                            message={confirmBox.message}
                            cb={confirmBox.cb}
                            isShown={confirmBox.isShown}
                            closeConfirmBox={closeConfirmBox}
                        />
                        <Component {...pageProps} />
                        <ScrollTop />
                    </ThemeProvider>
                </ConfirmBoxContext.Provider>
            </NotificationContext.Provider>
        </UserProvider>
    );
};

export default App;
