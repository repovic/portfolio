import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import ReactMarkdown from "react-markdown";

import axios from "../../../services/axios";
import { UserContext } from "../../../context/";

import {
    Post,
    Thumbnail,
    Heading,
    Category,
    Title,
    Content,
    Meta,
    Description,
    Blue,
} from "./PostElements";

import { Comments, Page404 } from "../..";

const PostComponent = ({ post: serverPost, options }) => {
    const { user } = useContext(UserContext);
    const [post, setPost] = useState(serverPost);

    const router = useRouter();

    useEffect(() => {
        setPost(serverPost);
    }, []);

    const refreshPost = async () => {
        setPost(await axios.get(`/post/${post.slug}`));
    };

    const refreshComments = async () => {
        await axios.get(`/comment/post/${post._id}`).then(({ data }) => {
            var refreshedPost = post;
            refreshedPost.comments = data.payload;
            setPost(refreshedPost);
        });
    };

    const likeComment = async (commentId) => {
        if (user.authToken) {
            await axios
                .post(`/comment/${commentId}/like`, undefined, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                })
                .then(() => {
                    refreshComments();
                    router.push(
                        {
                            pathname: `/blog/${post.slug}`,
                            query: {
                                notificationMessage:
                                    "Successfully liked comment!",
                                notificationType: "success",
                            },
                        },
                        undefined,
                        { shallow: true }
                    );
                })
                .catch(({ data }) => {
                    router.push(
                        {
                            pathname: `/blog/${post.slug}`,
                            query: {
                                notificationMessage: data?.error?.message,
                                notificationType: "error",
                            },
                        },
                        undefined,
                        { shallow: true }
                    );
                });
        } else {
            router.push(
                {
                    pathname: `/blog/${post.slug}`,
                    query: {
                        notificationMessage:
                            "You must be logged in to post a comment!",
                        notificationType: "error",
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    };
    const dislikeComment = async (commentId) => {
        if (user.authToken) {
            await axios
                .post(`/comment/${commentId}/dislike`, undefined, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                })
                .then(() => {
                    refreshComments();
                    router.push(
                        {
                            pathname: `/blog/${post.slug}`,
                            query: {
                                notificationMessage:
                                    "Successfully disliked comment!",
                                notificationType: "success",
                            },
                        },
                        undefined,
                        { shallow: true }
                    );
                })
                .catch(({ data }) => {
                    router.push(
                        {
                            pathname: `/blog/${post.slug}`,
                            query: {
                                notificationMessage: data?.error?.message,
                                notificationType: "error",
                            },
                        },
                        undefined,
                        { shallow: true }
                    );
                });
        } else {
            router.push(
                {
                    pathname: `/blog/${post.slug}`,
                    query: {
                        notificationMessage:
                            "You must be logged in to post a comment!",
                        notificationType: "error",
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    };

    const postComment = async (content) => {
        await axios
            .post(
                `/comment/post/${post._id}`,
                {
                    content: content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                }
            )
            .then(({ data }) => {
                refreshComments();
                router.push(
                    {
                        pathname: `/blog/${post.slug}`,
                        query: {
                            notificationMessage: "Successfully posted comment!",
                            notificationType: "success",
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            })
            .catch(({ data }) => {
                router.push(
                    {
                        pathname: `/blog/${post.slug}`,
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            });
    };

    const deleteComment = async (commentId) => {
        await axios
            .delete(`/admin/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                refreshComments();
                router.push(
                    {
                        pathname: `/blog/${post.slug}`,
                        query: {
                            notificationMessage:
                                "Successfully deleted comment!",
                            notificationType: "success",
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            })
            .catch(({ data }) => {
                router.push(
                    {
                        pathname: `/blog/${post.slug}`,
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            });
    };

    if (post) {
        return (
            <>
                <Head>
                    <title>
                        {post.title} - {options["site-title"]} / Blog
                    </title>
                </Head>
                <Post>
                    <Thumbnail>
                        <img src={post.thumbnail} draggable="false" />
                        <Heading>
                            <Category>{post.category?.name}</Category>
                            <Link href={`/blog/${post.slug}/`}>
                                <a>
                                    <Title>{post.title}</Title>
                                </a>
                            </Link>
                        </Heading>
                    </Thumbnail>
                    <Content>
                        <Meta>
                            Posted at{" "}
                            {new Date(post.createdAt).toLocaleDateString(
                                "sr-RS"
                            )}{" "}
                            by <Blue>{post.author?.displayName}</Blue> <br />
                            {post.commentsEnabled ? (
                                <Link href={`/blog/${post.slug}/#comments`}>
                                    <a>{post.comments?.length} Comment/s</a>
                                </Link>
                            ) : null}
                        </Meta>
                        <Description>
                            <ReactMarkdown
                                className="markdown-body"
                                children={post.content}
                            />
                        </Description>
                    </Content>
                    <Comments
                        user={user}
                        comments={post.comments}
                        commentsEnabled={post.commentsEnabled}
                        refreshComments={refreshComments}
                        likeComment={likeComment}
                        dislikeComment={dislikeComment}
                        postComment={postComment}
                        deleteComment={deleteComment}
                    />
                </Post>
            </>
        );
    } else {
        return <Page404 />;
    }
};

export default PostComponent;
