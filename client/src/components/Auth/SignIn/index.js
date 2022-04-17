import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { UserContext, ConfirmBoxContext } from "../../../context/";

import {
    SignInContainer,
    SignIn,
    Heading,
    Subtitle,
    Blue,
    SignInForm,
    Label,
    FormGroup,
    Input,
} from "./SignInElements";

import { AtIcon, PasswordIcon } from "../../../svg/";

import { Button } from "../../";

const SignInComponent = () => {
    const { signIn } = useContext(UserContext);
    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [callback, setCallback] = useState(router.query.callback || null);

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn({ username, password, callback });
    };

    return (
        <SignInContainer>
            <SignIn>
                <Heading>Welcome back</Heading>
                <Subtitle>
                    Don't have an account?{" "}
                    <Blue>
                        <Link
                            href={`/signup/${
                                callback ? `?callback=${callback}` : ``
                            }`}
                        >
                            <a>Sign Up</a>
                        </Link>
                    </Blue>
                </Subtitle>
                <SignInForm>
                    <Label>Username</Label>
                    <FormGroup>
                        <AtIcon />
                        <Input
                            placeholder="AwesomeUser142"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <Label>Password</Label>
                    <FormGroup id="password">
                        <PasswordIcon />
                        <Input
                            placeholder="P@$$w0rd"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Blue
                            onClick={() => {
                                showConfirmBox(
                                    `Just relax and try to remember your password :)`,
                                    () => {
                                        console.log(`Just keep trying :)`);
                                    }
                                );
                            }}
                        >
                            Forgot ?
                        </Blue>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            label="Sign In"
                            medium
                            whiteText
                            blueBackground
                            borderRounded
                            onClick={handleSubmit}
                        />
                        <Button
                            label="Sign Up"
                            link={`/signup/${
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
                </SignInForm>
            </SignIn>
        </SignInContainer>
    );
};

export default SignInComponent;
