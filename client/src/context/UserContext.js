import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../services/axios";
import getOptions from "../util/getOptions";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState({
        authToken: null,
        data: {},
    });

    const signUp = async ({
        username,
        firstName,
        lastName,
        email,
        password,
        callback,
    }) => {
        await axios
            .post("/auth/register", {
                username,
                firstName,
                lastName,
                email,
                password,
            })
            .then(async ({ data }) => {
                if (data.success) {
                    await signIn({ username, password, callback });
                } else {
                    router.push({
                        pathname: `/signup/`,
                        query: {
                            notificationMessage: data.error.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: `/signup/`,
                    query: {
                        notificationMessage: error.response.data.error.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const signIn = async ({ username, password, callback }) => {
        const options = await getOptions();
        await axios
            .post("/auth/login", {
                username,
                password,
            })
            .then(({ data }) => {
                if (data.success) {
                    setUser({
                        authToken: data.payload.token,
                        data: data.payload.user,
                    });
                    localStorage.setItem("auth-token", data.payload.token);
                    if (callback) {
                        for (const application of options["applications"]) {
                            if (callback.endsWith(application)) {
                                router.push(
                                    `${callback}?authToken=${data.payload.token}`
                                );
                            }
                        }
                    }
                    router.push({
                        pathname: "/",
                        query: {
                            notificationMessage: `Successfully logged in as @${data.payload.user.username}! 😀`,
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: `/signin/`,
                        query: {
                            notificationMessage: data.error.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error?.response?.data?.error?.message);
                router.push({
                    pathname: `/signin/`,
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const checkLoggedIn = async () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            localStorage.setItem("auth-token", "");
            return;
        }
        await axios
            .post("auth/check-token/", undefined, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data }) => {
                if (data.success) {
                    setUser({
                        authToken: token,
                        data: data.payload,
                    });
                } else {
                    console.error(data.error.message);
                    localStorage.setItem("auth-token", "");
                    setUser({
                        authToken: null,
                        data: {},
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                localStorage.setItem("auth-token", "");
                setUser({
                    authToken: null,
                    data: {},
                });
            });
    };

    const signOut = async () => {
        localStorage.setItem("auth-token", "");
        setUser({
            authToken: null,
            data: {},
        });
        router.push({
            pathname: "/signin",
            query: {
                notificationMessage: `Successfuly signed out! 👋`,
                notificationType: "success",
            },
        });
    };

    useEffect(() => {
        checkLoggedIn();
    }, [router]);

    return (
        <UserContext.Provider
            value={{ user, signUp, signIn, checkLoggedIn, signOut }}
        >
            {children}
        </UserContext.Provider>
    );
};
