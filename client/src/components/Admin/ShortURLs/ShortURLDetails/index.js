import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    ShortUrlDetails,
    FormSection,
    Id,
    Label,
    Row,
    FormGroup,
    Timestamps,
    Input,
    Select,
} from "./ShortURLDetailsElements";

import { Button } from "../../..";

import { LockIcon, CalculatorIcon, LinkIcon } from "../../../../svg";

const ShortURLDetailsComponent = ({ shortUrlId }) => {
    const [shortUrlDetails, setShortUrlDetails] = useState("");

    const [redirectTo, setRedirectTo] = useState("");
    const [slug, setSlug] = useState("");
    const [numberOfRedirects, setNumberOfRedirects] = useState("");
    const [restricted, setRestricted] = useState("");

    const router = useRouter();

    useEffect(async () => {
        await axios
            .get(`/admin/url/${shortUrlId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setShortUrlDetails(data.payload);
            })
            .catch(() => {
                setShortUrlDetails(null);
            });
    }, []);

    useEffect(() => {
        setRedirectTo(shortUrlDetails?.redirectTo || "");
        setSlug(shortUrlDetails?.slug || "");
        setNumberOfRedirects(shortUrlDetails?.numberOfRedirects || "");
        setRestricted(shortUrlDetails?.restricted);
    }, [shortUrlDetails]);

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

    const updateShortUrl = async (event) => {
        event.preventDefault();

        await axios
            .patch(
                `/admin/url/${shortUrlDetails?._id}`,
                {
                    redirectTo,
                    slug,
                    numberOfRedirects,
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
                                "Successfully updated short url!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/short-urls",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/short-urls",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const banShortUrl = async (event) => {
        event.preventDefault();

        await axios
            .post(
                `/admin/url/${shortUrlDetails?._id}/ban`,
                {},
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
                        pathname: "/admin/short-urls/",
                        query: {
                            notificationMessage:
                                "Successfully banned short url!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/short-urls/",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/short-urls/",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const unbanShortUrl = async (event) => {
        event.preventDefault();

        await axios
            .post(
                `/admin/url/${shortUrlDetails?._id}/unban`,
                {},
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
                        pathname: "/admin/short-urls/",
                        query: {
                            notificationMessage:
                                "Successfully unbanned short url!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/short-urls/",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/short-urls/",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <ShortUrlDetails>
            <FormSection>
                <Id>ID: {shortUrlDetails?._id}</Id>
                <Label>Redirect To</Label>
                <FormGroup>
                    <LinkIcon />
                    <Input
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
                        type="text"
                        value={slug}
                        onChange={(e) => {
                            setSlug(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Number of redirects</Label>
                <FormGroup>
                    <CalculatorIcon />
                    <Input
                        type="number"
                        value={numberOfRedirects}
                        onChange={(e) => {
                            setNumberOfRedirects(e.target.value);
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
                <Timestamps>
                    <p>
                        Created:{" "}
                        {new Date(shortUrlDetails?.createdAt).toLocaleString(
                            "sr-RS"
                        )}
                    </p>
                    <p>
                        Updated:{" "}
                        {new Date(shortUrlDetails?.updatedAt).toLocaleString(
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
                        onClick={updateShortUrl}
                    />
                </Row>
                <input type="submit" hidden={true} onClick={updateShortUrl} />
                <FormGroup>
                    {shortUrlDetails?.banned ? (
                        <Button
                            label="Unban"
                            onClick={unbanShortUrl}
                            medium
                            whiteText
                            darkBackground
                            borderRounded
                        />
                    ) : (
                        <Button
                            label="Ban"
                            onClick={banShortUrl}
                            medium
                            whiteText
                            darkBackground
                            borderRounded
                        />
                    )}
                    <Button
                        link="/admin/short-urls/"
                        label="Cancel"
                        medium
                        whiteText
                        borderRounded
                    />
                </FormGroup>
            </FormSection>
        </ShortUrlDetails>
    );
};

export default ShortURLDetailsComponent;
