import { useState, useEffect, useContext } from "react";
import axios from "../../../services/axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { ConfirmBoxContext } from "../../../context/";

import {
    Navigation,
    SearchInput,
    ResultsCount,
    Button,
    ShortenedURL,
    FullURL,
    NumberOfRedirects,
    ShortURL,
    Author,
    UserDetails,
    DisplayName,
    Role,
    Email,
    Username,
    UserAvatar,
    Options,
    Label,
    Light,
} from "./ShortURLsElements";

import {
    ArrowRightIcon,
    EditIcon,
    LockIcon,
    UnlockIcon,
    TrashIcon,
} from "../../../svg";

const ShortURLsPage = () => {
    const [urls, setUrls] = useState(null);
    const [currentShownUrls, setCurrentShownUrls] = useState(urls);
    const [searchQuery, setSearchQuery] = useState();

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    useEffect(() => {
        if (searchQuery) {
            const searchResults = urls?.filter(
                (url) =>
                    url._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    url.slug
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    url.redirectTo
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    url.author._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    url.author.displayName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    url.author.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    url.author.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    url.author.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    url.author.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setCurrentShownUrls(searchResults);
        } else {
            setCurrentShownUrls(urls);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            localStorage.setItem("auth-token", "");
            return;
        }

        refreshUrls();
    }, []);

    useEffect(() => {
        setCurrentShownUrls(urls);
    }, [urls]);

    const refreshUrls = async () => {
        await axios
            .get("/admin/url/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                if (data.success) {
                    setUrls(data?.payload);
                } else {
                    console.error(data?.error?.message);
                }
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const restrictUrl = async (id) => {
        showConfirmBox(
            `Are you sure you want to restrict that url?`,
            async () => {
                await axios
                    .post(`/admin/url/${id}/restrict`, undefined, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        refreshUrls();
                        router.push({
                            pathname: "/admin/short-urls",
                            query: {
                                notificationMessage:
                                    "Successfully restricted short url!",
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

    const unrestrictUrl = async (id) => {
        showConfirmBox(
            `Are you sure you want to unrestrict that url?`,
            async () => {
                await axios
                    .post(`/admin/url/${id}/unrestrict`, undefined, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        refreshUrls();
                        router.push({
                            pathname: "/admin/short-urls",
                            query: {
                                notificationMessage:
                                    "Successfully unrestricted short url!",
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

    const deleteUrl = async (id) => {
        showConfirmBox(
            `Are you sure you want to delete that url?`,
            async () => {
                await axios
                    .delete(`/admin/url/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        refreshUrls();
                        router.push({
                            pathname: "/admin/short-urls",
                            query: {
                                notificationMessage:
                                    "Successfully deleted short url!",
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <ResultsCount>
                        Showing {currentShownUrls?.length || 0} results.
                    </ResultsCount>
                </div>
                <Link href={`/admin/short-urls/add`}>
                    <Button>Add Short URL</Button>
                </Link>
            </Navigation>
            {currentShownUrls?.map((url) => (
                <ShortenedURL key={url._id}>
                    <ShortURL>
                        <Label>Short URL:</Label>
                        <div>
                            <Light>
                                http://{process.env.URL_SHORTENER_DOMAIN}/
                            </Light>
                            {url.slug}
                        </div>
                    </ShortURL>
                    <NumberOfRedirects>
                        {url.numberOfRedirects}
                        <ArrowRightIcon />
                    </NumberOfRedirects>
                    <FullURL>
                        <Label>Full URL: </Label>
                        <div>{url.redirectTo}</div>
                    </FullURL>
                    <Author>
                        <UserDetails>
                            <UserAvatar
                                src={url.author?.avatarUrl}
                                alt={url.author?.displayName + " - Avatar"}
                            />
                            <div>
                                <DisplayName>
                                    {url.author.displayName} •{" "}
                                    <Role>{url.author.role}</Role>
                                </DisplayName>
                                <Email>{url.author.email}</Email>
                                <Username>@{url.author.username}</Username>
                            </div>
                        </UserDetails>
                    </Author>
                    <Options>
                        <div>
                            {url.restricted ? (
                                <LockIcon
                                    onClick={() => {
                                        unrestrictUrl(url._id);
                                    }}
                                />
                            ) : (
                                <UnlockIcon
                                    onClick={() => {
                                        restrictUrl(url._id);
                                    }}
                                />
                            )}
                        </div>
                        <div>
                            <Link href={`/admin/short-urls/${url._id}`}>
                                <a>
                                    <EditIcon />
                                </a>
                            </Link>
                        </div>
                        <div>
                            <TrashIcon
                                onClick={() => {
                                    deleteUrl(url._id);
                                }}
                            />
                        </div>
                    </Options>
                </ShortenedURL>
            ))}
        </>
    );
};

export default ShortURLsPage;
