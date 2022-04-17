import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import axios from "../../services/axios";
import { UserContext } from "../../context/";

import ReactMarkdown from "react-markdown";

import {
    Project,
    Thumbnail,
    Heading,
    Excerpt,
    Title,
    Content,
    Meta,
    Description,
    Blue,
} from "./ProjectElements";

import { Button, Gallery, Comments, Page404 } from "..";

const ProjectComponent = ({ project: serverProject, options }) => {
    const { user } = useContext(UserContext);
    const [project, setProject] = useState(serverProject);

    const router = useRouter();

    useEffect(() => {
        setProject(serverProject);
    }, []);

    const refreshComments = async () => {
        await axios.get(`/comment/project/${project._id}`).then(({ data }) => {
            var refreshedProject = project;
            refreshedProject.comments = data.payload;
            setProject(refreshedProject);
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
                            pathname: `/project/${project.slug}`,
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
                            pathname: `/project/${project.slug}`,
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
                    pathname: `/project/${project.slug}`,
                    query: {
                        notificationMessage:
                            "You must be logged in to like a comment!",
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
                            pathname: `/project/${project.slug}`,
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
                            pathname: `/project/${project.slug}`,
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
                    pathname: `/project/${project.slug}`,
                    query: {
                        notificationMessage:
                            "You must be logged in to dislike a comment!",
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
                `/comment/project/${project._id}`,
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
                        pathname: `/project/${project.slug}`,
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
                        pathname: `/project/${project.slug}`,
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
                        pathname: `/project/${project.slug}`,
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
                        pathname: `/project/${project.slug}`,
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

    if (project) {
        return (
            <>
                <Head>
                    <title>
                        {project.title} - {options["site-title"]} / Portfolio
                    </title>
                </Head>
                <Project>
                    <Thumbnail>
                        <img src={project.featuredImage} draggable="false" />
                        <Heading>
                            <div>
                                <Excerpt>{project.excerpt}</Excerpt>
                                <Link href={`/project/${project.slug}/`}>
                                    <a>
                                        <Title>{project?.title}</Title>
                                    </a>
                                </Link>
                            </div>
                            <div className="w20 hide-mobile">
                                <Button
                                    label="View Live"
                                    href={project.url}
                                    target="_blank"
                                    medium
                                    whiteText
                                    blueBackground
                                    borderRounded
                                />
                            </div>
                            <div className="w20 hide-pc">
                                <Button
                                    label="View"
                                    href={project.url}
                                    target="_blank"
                                    medium
                                    whiteText
                                    blueBackground
                                    borderRounded
                                />
                            </div>
                        </Heading>
                    </Thumbnail>
                    <Content>
                        <Meta>
                            Posted at{" "}
                            {new Date(project?.createdAt).toLocaleDateString(
                                "sr-RS"
                            )}{" "}
                            by <Blue>{project?.author?.displayName}</Blue>{" "}
                            <br />
                            {project?.commentsEnabled ? (
                                <Link
                                    href={`/project/${project.slug}/#comments`}
                                >
                                    <a>
                                        {project?.comments?.length == 0
                                            ? `No Comments`
                                            : `${project?.comments?.length} Comment/s`}
                                    </a>
                                </Link>
                            ) : project?.comments?.length == 0 ? null : (
                                `${project?.comments?.length} Comment/s (Disabled)`
                            )}
                        </Meta>
                        <Description>
                            <ReactMarkdown
                                className="markdown-body"
                                children={project?.description}
                            />
                        </Description>
                    </Content>
                    <Gallery images={project?.images} />
                    <Comments
                        user={user}
                        comments={project?.comments}
                        commentsEnabled={project?.commentsEnabled}
                        refreshComments={refreshComments}
                        likeComment={likeComment}
                        dislikeComment={dislikeComment}
                        postComment={postComment}
                        deleteComment={deleteComment}
                    />
                </Project>
            </>
        );
    } else {
        return <Page404 />;
    }
};

export default ProjectComponent;
