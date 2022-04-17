import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    UserDetails,
    FormSection,
    AvatarUpdateSection,
    Id,
    Label,
    Row,
    Column,
    FormGroup,
    Timestamps,
    Input,
    Select,
} from "./UserDetailsElements";

import { Button } from "../../..";

import { IdIcon, AtIcon, EmailIcon } from "../../../../svg";

const UserDetailsComponent = ({ userId }) => {
    const [userDetails, setUserDetails] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [avatarSrc, setAvatarSrc] = useState("");

    const router = useRouter();

    useEffect(async () => {
        await axios
            .get(`/admin/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setUserDetails(data.payload);
            })
            .catch(() => {
                setUserDetails(null);
            });
    }, []);

    useEffect(() => {
        setFirstName(userDetails?.firstName);
        setLastName(userDetails?.lastName);
        setDisplayName(userDetails?.displayName);
        setUsername(userDetails?.username);
        setEmail(userDetails?.email);
        setRole(userDetails?.role);
        setAvatarSrc(userDetails?.avatarUrl);
    }, [userDetails]);

    const updateUser = async (event) => {
        event.preventDefault();

        var formData = new FormData();
        formData.append(
            "avatar",
            document.getElementById("updateUserAvatar").files[0]
        );
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("displayName", displayName);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("role", role);

        await axios
            .patch(`/admin/user/${userDetails?._id}`, formData, {
                headers: {
                    contentType: "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/users",
                        query: {
                            notificationMessage: "Successfully updated user!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/users",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/users",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const banUser = async () => {
        await axios
            .post(`/admin/user/${userDetails?._id}/ban`, undefined, {
                headers: {
                    contentType: "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/users",
                        query: {
                            notificationMessage: "Successfully banned user!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/users",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/users",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const unbanUser = async () => {
        await axios
            .post(`/admin/user/${userDetails?._id}/unban`, undefined, {
                headers: {
                    contentType: "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/users",
                        query: {
                            notificationMessage: "Successfully unbanned user!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/users",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/users",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <UserDetails>
            <FormSection>
                <Id>ID: {userDetails?._id}</Id>
                <Row>
                    <Column>
                        <div>
                            <Label>First Name</Label>
                            <FormGroup>
                                <IdIcon />
                                <Input
                                    defaultValue={userDetails?.firstName}
                                    type="text"
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                            </FormGroup>
                        </div>
                    </Column>
                    <Column>
                        <div>
                            <Label>Last Name</Label>
                            <FormGroup>
                                <IdIcon />
                                <Input
                                    defaultValue={userDetails?.lastName}
                                    type="text"
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />
                            </FormGroup>
                        </div>
                    </Column>
                </Row>
                <Label>Display Name</Label>
                <FormGroup>
                    <IdIcon />
                    <Input
                        defaultValue={userDetails?.displayName}
                        type="text"
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Username</Label>
                <FormGroup>
                    <AtIcon />
                    <Input
                        defaultValue={userDetails?.username}
                        type="text"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Email</Label>
                <FormGroup>
                    <EmailIcon />
                    <Input
                        defaultValue={userDetails?.email}
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Role</Label>
                <FormGroup>
                    <IdIcon />
                    <Select
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                    >
                        <option
                            value="Administrator"
                            {...(userDetails?.role == "Administrator" && {
                                selected: "selected",
                            })}
                        >
                            Administrator
                        </option>
                        <option
                            value="Subscriber"
                            {...(userDetails?.role == "Subscriber" && {
                                selected: "selected",
                            })}
                        >
                            Subscriber
                        </option>
                    </Select>
                </FormGroup>
                <Timestamps>
                    <p>
                        Created:{" "}
                        {new Date(userDetails?.createdAt).toLocaleString(
                            "sr-RS"
                        )}
                    </p>
                    <p>
                        Updated:{" "}
                        {new Date(userDetails?.updatedAt).toLocaleString(
                            "sr-RS"
                        )}
                    </p>
                </Timestamps>
                <Row>
                    <Button
                        label="Update"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                        onClick={updateUser}
                    />
                </Row>
                <input type="submit" hidden={true} onClick={updateUser} />
                <FormGroup>
                    {userDetails.banned ? (
                        <Button
                            label="Unban"
                            onClick={unbanUser}
                            medium
                            whiteText
                            darkBackground
                            borderRounded
                        />
                    ) : (
                        <Button
                            label="Ban"
                            onClick={banUser}
                            medium
                            whiteText
                            darkBackground
                            borderRounded
                        />
                    )}
                    <Button
                        link="/admin/users/"
                        label="Cancel"
                        medium
                        whiteText
                        borderRounded
                    />
                </FormGroup>
            </FormSection>
            <AvatarUpdateSection>
                <img src={avatarSrc} alt={``} />

                <Label>Upload avatar: </Label>
                <Input
                    id="updateUserAvatar"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            let reader = new FileReader();
                            reader.onload = () => {
                                setAvatarSrc(reader.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        } else {
                            setAvatarSrc(userDetails?.avatarUrl);
                        }
                    }}
                />
            </AvatarUpdateSection>
        </UserDetails>
    );
};

export default UserDetailsComponent;
