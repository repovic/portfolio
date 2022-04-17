import { useState, useContext } from "react";
import { UserContext } from "../../../context/";
import { useRouter } from "next/router";
import Link from "next/link";

import {
    SignUpContainer,
    SignUp,
    Heading,
    Subtitle,
    Blue,
    SignUpForm,
    Label,
    FormGroup,
    Input,
    Column,
    Row,
} from "./SignUpElements";

import { IdIcon, AtIcon, PasswordIcon, EmailIcon } from "../../../svg/";

import { Button } from "../../";

const SignUpComponent = () => {
    const { signUp } = useContext(UserContext);

    const router = useRouter();

    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [callback, setCallback] = useState(router.query.callback || null);

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp({
            username,
            firstName,
            lastName,
            email,
            password,
            callback,
        });
    };

    return (
        <SignUpContainer>
            <SignUp>
                <Heading>Welcome</Heading>
                <Subtitle>
                    Already have an account?{" "}
                    <Blue>
                        <Link
                            href={`/signin/${
                                callback ? `?callback=${callback}` : ``
                            }`}
                        >
                            <a>Sign In</a>
                        </Link>
                    </Blue>
                </Subtitle>
                <SignUpForm>
                    <Row>
                        <Column>
                            <div>
                                <Label>First Name</Label>
                                <FormGroup>
                                    <IdIcon />
                                    <Input
                                        placeholder="John"
                                        type="text"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </FormGroup>
                            </div>
                        </Column>
                    </Row>
                    <Label>Username</Label>
                    <FormGroup>
                        <AtIcon />
                        <Input
                            placeholder="johndoe"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <Label>Email</Label>
                    <FormGroup>
                        <EmailIcon />
                        <Input
                            placeholder="john@doe.com"
                            type="text"
                            inputMode="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <Label>Password</Label>
                    <FormGroup>
                        <PasswordIcon />
                        <Input
                            placeholder="!PassW0rd"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            type="submit"
                            label="Sign Up"
                            onClick={handleSubmit}
                            medium
                            whiteText
                            blueBackground
                            borderRounded
                        />
                        <Button
                            label="Sign In"
                            link={`/signin/${
                                callback ? `?callback=${callback}` : ``
                            }`}
                            medium
                            whiteText
                            borderRounded
                        />
                        <input
                            type="submit"
                            hidden={true}
                            onClick={handleSubmit}
                        />
                    </FormGroup>
                </SignUpForm>
            </SignUp>
        </SignUpContainer>
    );
};

export default SignUpComponent;
