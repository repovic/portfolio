import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    AddUser,
    FormSection,
    Label,
    Row,
    Column,
    FormGroup,
    Input,
} from "./AddUserElements";

import { Button } from "../../..";

import { IdIcon, AtIcon, EmailIcon, LockIcon } from "../../../../svg";

const UserDetailsComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (firstName == "" && lastName == "") {
            setDisplayName("");
        } else {
            setDisplayName(`${firstName} ${lastName}`);
        }
    }, [firstName, lastName]);

    const addUser = async (event) => {
        event.preventDefault();
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
                    router.push({
                        pathname: "/admin/users",
                        query: {
                            notificationMessage: "Successfully added user!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/users/add",
                        query: {
                            notificationMessage: data.error.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/users/add",
                    query: {
                        notificationMessage: error.response.data.error.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <AddUser>
            <FormSection>
                <Row>
                    <Column>
                        <div>
                            <Label>First Name</Label>
                            <FormGroup>
                                <IdIcon />
                                <Input
                                    placeholder="John"
                                    type="text"
                                    value={firstName}
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
                                    placeholder="Doe"
                                    type="text"
                                    value={lastName}
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
                        placeholder="John Doe"
                        type="text"
                        value={displayName}
                        disabled
                    />
                </FormGroup>
                <Label>Username</Label>
                <FormGroup>
                    <AtIcon />
                    <Input
                        placeholder="johndoe"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Email</Label>
                <FormGroup>
                    <EmailIcon />
                    <Input
                        placeholder="john@doe.com"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Password</Label>
                <FormGroup>
                    <LockIcon />
                    <Input
                        placeholder="!PassW0rd"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        label="Add User"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                        onClick={addUser}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/users"
                        medium
                        whiteText
                        borderRounded
                    />
                    <input type="submit" hidden={true} onClick={addUser} />
                </FormGroup>
            </FormSection>
        </AddUser>
    );
};

export default UserDetailsComponent;
