import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    AddShortURL,
    FormSection,
    Label,
    FormGroup,
    Input,
    Select,
} from "./ShortenURLElements";

import { Button } from "../../..";

import { LockIcon, LinkIcon } from "../../../../svg";

const AddShortURLComponent = () => {
    const [redirectTo, setRedirectTo] = useState("");
    const [slug, setSlug] = useState("");
    const [restricted, setRestricted] = useState("true");

    const router = useRouter();

    const generateRandomSlug = () => {
        var randomString = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            randomString += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        setSlug(randomString);
    };

    useEffect(() => {
        generateRandomSlug();
    }, []);

    const addShortURL = async (event) => {
        event.preventDefault();
        await axios
            .post(
                "/admin/url/",
                {
                    redirectTo,
                    slug,
                    restricted,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                }
            )
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/short-urls",
                        query: {
                            notificationMessage:
                                "Successfully added short url!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/short-urls/add",
                        query: {
                            notificationMessage: data.error.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/short-urls/add",
                    query: {
                        notificationMessage: error.response.data.error.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <AddShortURL>
            <FormSection>
                <Label>Redirect To</Label>
                <FormGroup>
                    <LinkIcon />
                    <Input
                        placeholder={`http://${process.env.SITE_DOMAIN}/post/hello-world`}
                        type="text"
                        value={redirectTo}
                        onChange={(e) => {
                            setRedirectTo(e.target.value);
                            if (!slug) {
                                generateRandomSlug();
                            }
                        }}
                    />
                </FormGroup>
                <Label>Slug</Label>
                <FormGroup>
                    <LinkIcon />
                    <Input
                        placeholder="hello-world"
                        type="text"
                        value={slug}
                        onChange={(e) => {
                            setSlug(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Restriction</Label>
                <FormGroup>
                    <LockIcon />
                    <Select
                        value={restricted}
                        onChange={(e) => {
                            setRestricted(e.target.value);
                        }}
                    >
                        <option value="true">Restricted</option>
                        <option value="false">Unrestricted</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Button
                        label="Add Short URL"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                        onClick={addShortURL}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/short-urls"
                        medium
                        whiteText
                        borderRounded
                    />
                    <input type="submit" hidden={true} onClick={addShortURL} />
                </FormGroup>
            </FormSection>
        </AddShortURL>
    );
};

export default AddShortURLComponent;
