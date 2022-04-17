import { useState, useEffect, useContext } from "react";
import axios from "../../services/axios";
import { UserContext, ConfirmBoxContext } from "../../context/";
import { useRouter } from "next/router";

import {
    Profile,
    Heading,
    Flex,
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
} from "./ProfileElements";

import { Button } from "../";

import { IdIcon, AtIcon, EmailIcon, LockIcon } from "../../svg";

const ProfileComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [avatarSrc, setAvatarSrc] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { user } = useContext(UserContext);
    const { showConfirmBox } = useContext(ConfirmBoxContext);
    const router = useRouter();

    useEffect(() => {
        setFirstName(user.data?.firstName);
        setLastName(user.data?.lastName);
        setDisplayName(user.data?.displayName);
        setUsername(user.data?.username);
        setPassword("whats up ?");
        setEmail(user.data?.email);
        setRole(user.data?.role);
        setAvatarSrc(user.data?.avatarUrl);
    }, [user]);

    const updateProfile = async (event) => {
        event.preventDefault();
        var formData = new FormData();
        if (document.getElementById("updateUserAvatar").files[0]) {
            formData.append(
                "avatar",
                document.getElementById("updateUserAvatar").files[0]
            );
        }
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("displayName", displayName);
        formData.append("username", username);
        if (password !== "whats up ?") {
            formData.append("password", password);
        }
        formData.append("passwordConfirm", passwordConfirm);

        await axios
            .patch(`/user/me`, formData, {
                headers: {
                    contentType: "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                if (data.success) {
                    if (password !== "whats up ?") {
                        router.push({
                            pathname: "/signin",
                            query: {
                                notificationMessage:
                                    "Successfully updated profile, now login with new password!",
                                notificationType: "success",
                            },
                        });
                    }

                    router.push(
                        {
                            pathname: "/",
                            query: {
                                notificationMessage:
                                    "Successfully updated profile!",
                                notificationType: "success",
                            },
                        },
                        null,
                        {
                            shallow: true,
                        }
                    );
                } else {
                    router.push(
                        {
                            pathname: "/profile/",
                            query: {
                                notificationMessage: data?.error?.message,
                                notificationType: "error",
                            },
                        },
                        null,
                        {
                            shallow: true,
                        }
                    );
                }
            })
            .catch((error) => {
                router.push(
                    {
                        pathname: "/profile/",
                        query: {
                            notificationMessage:
                                error?.response?.data?.error?.message,
                            notificationType: "error",
                        },
                    },
                    null,
                    {
                        shallow: true,
                    }
                );
            });
    };

    const deleteProfile = async (event) => {
        event.preventDefault();
        showConfirmBox(
            "Are you sure you want to delete your account?",
            async () => {
                await axios
                    .delete(`/user/me`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(({ data }) => {
                        if (data.success) {
                            router.push({
                                pathname: "/signin",
                                query: {
                                    notificationMessage:
                                        "Profile successfully deleted!",
                                    notificationType: "success",
                                },
                            });
                        } else {
                            router.push({
                                pathname: "/profile/",
                                query: {
                                    notificationMessage: data?.error?.message,
                                    notificationType: "error",
                                },
                            });
                        }
                    })
                    .catch((error) => {
                        router.push({
                            pathname: "/profile/",
                            query: {
                                notificationMessage:
                                    error?.response?.data?.error?.message,
                                notificationType: "error",
                            },
                        });
                    });
            }
        );
    };

    return (
        <Profile>
            <Heading>
                <h1> Update profile: </h1>
            </Heading>
            <Flex>
                <FormSection>
                    <Row>
                        <Column>
                            <div>
                                <Label>First Name: </Label>
                                <FormGroup>
                                    <IdIcon />
                                    <Input
                                        defaultValue={user.data?.firstName}
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
                                <Label>Last Name: </Label>
                                <FormGroup>
                                    <IdIcon />
                                    <Input
                                        defaultValue={user.data?.lastName}
                                        type="text"
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </div>
                        </Column>
                    </Row>
                    <Label>Display Name: </Label>
                    <FormGroup>
                        <IdIcon />
                        <Input
                            defaultValue={user.data?.displayName}
                            type="text"
                            onChange={(e) => {
                                setDisplayName(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <Label>Username: </Label>
                    <FormGroup>
                        <AtIcon />
                        <Input
                            defaultValue={user.data?.username}
                            type="text"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <Label>Password:</Label>
                    <FormGroup>
                        <LockIcon />
                        <Input
                            defaultValue={password}
                            autoComplete="new-password"
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <Label>Email: </Label>
                    <FormGroup>
                        <EmailIcon />
                        <Input
                            defaultValue={user.data?.email}
                            type="text"
                            inputMode="email"
                            disabled={true}
                        />
                    </FormGroup>

                    <Label>Role: </Label>
                    <FormGroup>
                        <IdIcon />
                        <Select
                            defaultValue={
                                user.data?.role == "Administrator"
                                    ? "Administrator"
                                    : "Subscriber"
                            }
                            disabled={true}
                        >
                            <option value="Administrator">Administrator</option>
                            <option value="Subscriber">Subscriber</option>
                        </Select>
                    </FormGroup>

                    <Label>Confirm password: </Label>
                    <FormGroup>
                        <LockIcon />
                        <Input
                            defaultValue={""}
                            type="password"
                            placeholder={`Your current password`}
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <Timestamps>
                        <p>
                            Created:{" "}
                            {new Date(user.data?.createdAt).toLocaleString(
                                "sr-RS"
                            )}
                        </p>
                        <p>
                            Updated:{" "}
                            {new Date(user.data?.updatedAt).toLocaleString(
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
                            onClick={updateProfile}
                        />
                    </Row>
                    <FormGroup>
                        <Button
                            label="Delete Account"
                            medium
                            whiteText
                            darkBackground
                            borderRounded
                            onClick={deleteProfile}
                        />
                        <Button
                            link="/"
                            label="Cancel"
                            medium
                            whiteText
                            borderRounded
                        />
                    </FormGroup>
                    <input
                        type="submit"
                        hidden={true}
                        onClick={updateProfile}
                    />
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
                                setAvatarSrc(user.data?.avatarUrl);
                            }
                        }}
                    />
                </AvatarUpdateSection>
            </Flex>
        </Profile>
    );
};

export default ProfileComponent;
