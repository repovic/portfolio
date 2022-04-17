import { useState, useEffect, useContext } from "react";
import axios from "../../../services/axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { ConfirmBoxContext } from "../../../context/";

import {
    Navigation,
    SearchInput,
    Filter,
    ResultsCount,
    Button,
    PostContainer,
    Post,
    Title,
    Category,
    Excerpt,
    Author,
    UserDetails,
    DisplayName,
    Role,
    Email,
    Username,
    UserAvatar,
    Options,
    Label,
} from "./PostsElements";

import { EditIcon, TrashIcon, LinkIcon } from "../../../svg";

const PostsPage = () => {
    const [posts, setPosts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [currentShownPosts, setCurrentShownPosts] = useState(posts);
    const [searchQuery, setSearchQuery] = useState("");

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    useEffect(() => {
        if (searchQuery) {
            const searchResults = posts?.filter(
                (post) =>
                    post._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.slug
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.displayName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.category._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.category.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.content
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.excerpt
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setCurrentShownPosts(searchResults);
            window.document.querySelector("select").selectedIndex = 0;
        } else {
            setCurrentShownPosts(posts);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            localStorage.setItem("auth-token", "");
            return;
        }

        const getPosts = async () => {
            await axios
                .get("/admin/post/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    if (data.success) {
                        setPosts(data?.payload);
                    } else {
                        //setError(data?.error?.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    // setError(error?.message);
                });
        };
        getPosts();

        const getCategories = async () => {
            await axios
                .get("/admin/category/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                })
                .then(({ data }) => {
                    if (data.success) {
                        setCategories(data?.payload);
                    } else {
                        //setError(data?.error?.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    // setError(error?.message);
                });
        };
        getCategories();
    }, []);

    useEffect(() => {
        setCurrentShownPosts(posts);
    }, [posts]);

    const handleChange = (event) => {
        setSearchQuery("");
        if (
            event.target.value !== "all" &&
            event.target.value !== "add-category"
        ) {
            setCurrentShownPosts(
                posts?.filter(
                    (post) => post.category.name == event.target.value
                )
            );
        } else if (event.target.value == "add-category") {
            event.preventDefault();
            router.push("/admin/categories/add/");
        } else {
            setCurrentShownPosts(posts);
        }
    };

    const refreshPosts = async () => {
        await axios
            .get("/admin/post/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setPosts(data?.payload);
            })
            .catch((error) => {
                console.log(error);
            });
        window.document.querySelector("select").selectedIndex = 0;
    };

    const refreshCategories = async () => {
        await axios
            .get("/admin/category/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setCategories(data?.payload);
            })
            .catch((error) => {
                console.log(error);
            });
        window.document.querySelector("select").selectedIndex = 0;
    };

    const deletePost = async (postId) => {
        showConfirmBox(
            `Are you sure you want to delete that post?`,
            async () => {
                await axios
                    .delete(`/admin/post/${postId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        refreshPosts();
                        router.push({
                            pathname: "/admin/posts",
                            query: {
                                notificationMessage:
                                    "Successfully deleted post!",
                                notificationType: "success",
                            },
                        });
                    })
                    .catch((error) => {
                        router.push({
                            pathname: "/admin/posts",
                            query: {
                                notificationMessage: error.message,
                                notificationType: "error",
                            },
                        });
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
                        <option value="all">All Categories</option>
                        {categories?.map((category) => (
                            <option key={category._id} vaule={category?.name}>
                                {category?.name}
                            </option>
                        ))}
                        <option key="add-category" value="add-category">
                            Add Category
                        </option>
                    </Filter>
                    <ResultsCount>
                        Showing {currentShownPosts?.length || 0} results.
                    </ResultsCount>
                </div>
                <Link href={"/admin/posts/add"}>
                    <Button>Add Post</Button>
                </Link>
            </Navigation>
            <PostContainer>
                {currentShownPosts?.map((post) => (
                    <Post key={post._id}>
                        <Title>
                            <Label>Title: </Label>
                            <div>
                                {post.title.length > 20
                                    ? post.title.substr(0, 20) + "..."
                                    : post.title}
                            </div>
                        </Title>
                        <Category>
                            <Label>Category: </Label>
                            <div>{post.category.name}</div>
                        </Category>
                        <Excerpt>
                            <Label>Excerpt: </Label>
                            <div>
                                {post.excerpt.length > 50
                                    ? post.excerpt.substr(0, 50) + "..."
                                    : post.excerpt}
                            </div>
                        </Excerpt>
                        <Author>
                            <UserDetails>
                                <UserAvatar
                                    src={post.author?.avatarUrl}
                                    alt={post.author?.displayName + " - Avatar"}
                                />
                                <div>
                                    <DisplayName>
                                        {post.author.displayName} •{" "}
                                        <Role>{post.author.role}</Role>
                                    </DisplayName>
                                    <Email>{post.author.email}</Email>
                                    <Username>@{post.author.username}</Username>
                                </div>
                            </UserDetails>
                        </Author>
                        <Options>
                            <Link href={`/blog/${post.slug}`}>
                                <a>
                                    <div>
                                        <LinkIcon />
                                    </div>
                                </a>
                            </Link>
                            <Link href={`/admin/posts/${post._id}`}>
                                <a>
                                    <div>
                                        <EditIcon />
                                    </div>
                                </a>
                            </Link>
                            <div>
                                <TrashIcon
                                    onClick={() => {
                                        deletePost(post._id);
                                    }}
                                />
                            </div>
                        </Options>
                    </Post>
                ))}
            </PostContainer>
        </>
    );
};

export default PostsPage;
