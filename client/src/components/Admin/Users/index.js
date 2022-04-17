import { useState, useEffect, useContext } from "react";
import axios from "../../../services/axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { ConfirmBoxContext } from "../../../context/";

import {
    Navigation,
    Filter,
    SearchInput,
    ResultsCount,
    Button,
    User,
    UserDetails,
    DisplayName,
    Role,
    Email,
    Username,
    UserAvatar,
    UserOptions,
} from "./UsersElements";

import { EditIcon, AngleUpIcon, AngleDownIcon, TrashIcon } from "../../../svg";

const UsersPage = () => {
    const [users, setUsers] = useState(null);
    const [currentShownUsers, setCurrentShownUsers] = useState(users);
    const [searchQuery, setSearchQuery] = useState("");

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    useEffect(() => {
        if (searchQuery) {
            const searchResults = users?.filter(
                (user) =>
                    user._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.displayName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setCurrentShownUsers(searchResults);
            window.document.querySelector("select").selectedIndex = 0;
        } else {
            setCurrentShownUsers(users);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            localStorage.setItem("auth-token", "");
            return;
        }

        refreshUsers();
    }, []);

    useEffect(() => {
        setCurrentShownUsers(users);
        window.document.querySelector("select").selectedIndex = 0;
    }, [users]);

    const subscribers = users?.filter((user) => user.role == "Subscriber");
    const administrators = users?.filter(
        (user) => user.role == "Administrator"
    );

    const refreshUsers = async () => {
        await axios
            .get("/admin/user/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setUsers(data?.payload);
            })
            .catch((error) => {
                console.log(error);
            });
        window.document.querySelector("select").selectedIndex = 0;
    };

    const handleChange = (event) => {
        setSearchQuery("");
        switch (event.target.value) {
            case "all":
                setCurrentShownUsers(users);
                break;
            case "subscribers":
                setCurrentShownUsers(subscribers);
                break;
            case "administrators":
                setCurrentShownUsers(administrators);
                break;
            default:
                setCurrentShownUsers(users);
        }
    };

    const changeRoleToAdministrator = async (username, id) => {
        showConfirmBox(
            `Are you sure you want to change role of @${username} to Administrator?`,
            async () => {
                await axios
                    .patch(
                        `/admin/user/${id}`,
                        {
                            role: "Administrator",
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "auth-token"
                                )}`,
                            },
                        }
                    )
                    .then((updeatedUser) => {
                        refreshUsers();
                        router.push({
                            pathname: "/admin/users",
                            query: {
                                notificationMessage:
                                    "Successfully updated user role!",
                                notificationType: "success",
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        );
    };

    const changeRoleToSubscriber = async (username, id) => {
        showConfirmBox(
            `Are you sure you want to change role of @${username} to Subscriber?`,
            async () => {
                await axios
                    .patch(
                        `/admin/user/${id}`,
                        {
                            role: "Subscriber",
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "auth-token"
                                )}`,
                            },
                        }
                    )
                    .then((updeatedUser) => {
                        refreshUsers();
                        router.push({
                            pathname: "/admin/users",
                            query: {
                                notificationMessage:
                                    "Successfully updated user role!",
                                notificationType: "success",
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        );
    };

    const deleteProfile = async (username, id) => {
        showConfirmBox(
            `Are you sure you want to delete @${username} account?`,
            async () => {
                await axios
                    .delete(`/admin/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then((deletedUser) => {
                        refreshUsers();
                        router.push({
                            pathname: "/admin/users",
                            query: {
                                notificationMessage:
                                    "Successfully deleted user!",
                                notificationType: "success",
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        );
    };

    return (
        <>
            <Navigation>
                <div>
                    <SearchInput
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <Filter onChange={handleChange}>
                        <option value="all">All ({users?.length})</option>
                        <option value="subscribers">
                            Subscribers ({subscribers?.length})
                        </option>
                        <option value="administrators">
                            Administrators ({administrators?.length})
                        </option>
                    </Filter>
                    <ResultsCount>
                        Showing {currentShownUsers?.length || 0} results.
                    </ResultsCount>
                </div>
                <Link href={`/admin/users/add`}>
                    <Button>Add User</Button>
                </Link>
            </Navigation>
            {currentShownUsers?.map((user) => (
                <User key={user._id}>
                    <UserDetails>
                        <UserAvatar
                            src={user.avatarUrl}
                            alt={user.displayName + " - Avatar"}
                        />
                        <div>
                            <DisplayName>
                                {user.displayName} • <Role>{user.role}</Role>
                            </DisplayName>
                            <Email>{user.email}</Email>
                            <Username>@{user.username}</Username>
                        </div>
                    </UserDetails>
                    <UserOptions>
                        {user.role == "Administrator" ? (
                            <div
                                onClick={() =>
                                    changeRoleToSubscriber(
                                        user.username,
                                        user._id
                                    )
                                }
                            >
                                <AngleDownIcon />
                            </div>
                        ) : (
                            <div
                                onClick={() =>
                                    changeRoleToAdministrator(
                                        user.username,
                                        user._id
                                    )
                                }
                            >
                                <AngleUpIcon />
                            </div>
                        )}
                        <div>
                            <Link href={`/admin/users/${user._id}`}>
                                <a>
                                    <EditIcon />
                                </a>
                            </Link>
                        </div>
                        <div
                            onClick={() =>
                                deleteProfile(user.username, user._id)
                            }
                        >
                            <TrashIcon />
                        </div>
                    </UserOptions>
                </User>
            ))}
        </>
    );
};

export default UsersPage;
