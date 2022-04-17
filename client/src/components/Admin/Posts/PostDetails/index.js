import { useState, useEffect, useContext } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    PostDetails,
    FormSection,
    AvatarUpdateSection,
    Id,
    Label,
    Row,
    FormGroup,
    Timestamps,
    Input,
    TextArea,
    Select,
} from "./PostDetailsElements";

import { Button } from "../../..";

import {
    IdIcon,
    LockIcon,
    BlogIcon,
    LinkIcon,
    FormsIcon,
    EyeIcon,
} from "../../../../svg";

import { ConfirmBoxContext } from "../../../../context";

const PostDetailsComponent = ({ postId }) => {
    const [postDetails, setPostDetails] = useState("");
    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("Published");
    const [commentsEnabled, setCommentsEnabled] = useState(true);

    const [postThumbnail, setPostThumbnail] = useState("");

    const [categories, setCategories] = useState([]);

    const router = useRouter();

    //#region
    useEffect(async () => {
        await axios
            .get(`/admin/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setPostDetails(data.payload);
            })
            .catch(() => {
                setPostDetails(null);
            });

        await axios
            .get("/admin/category", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setCategories(data.payload);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        setTitle(postDetails?.title || "");
        setSlug(postDetails?.slug || "");
        setCategory(postDetails?.category?._id || "");
        setExcerpt(postDetails?.excerpt || "");
        setContent(postDetails?.content || "");
        setStatus(postDetails?.status || "Published");
        setCommentsEnabled(postDetails?.commentsEnabled);
        setPostThumbnail(postDetails?.thumbnail || "");
    }, [postDetails]);

    const updatePost = async (event) => {
        event.preventDefault();
        var formData = new FormData();

        formData.append(
            "thumbnail",
            document.getElementById("updatePostThumbnail").files[0]
        );
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("category", category);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        formData.append("status", status);
        formData.append("commentsEnabled", commentsEnabled);

        await axios
            .patch(`/admin/post/${postDetails?._id}`, formData, {
                headers: {
                    contentType: "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/posts",
                        query: {
                            notificationMessage: "Successfully updated post!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/posts",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/posts",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const deletePost = async () => {
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
    //#endregion

    return (
        <PostDetails>
            <FormSection>
                <Id>ID: {postDetails?._id}</Id>
                <Label>Title</Label>
                <FormGroup>
                    <IdIcon />
                    <Input
                        placeholder="Sample Post"
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Slug</Label>
                <FormGroup>
                    <LinkIcon />
                    <Input
                        placeholder="sample-slug"
                        type="text"
                        value={slug}
                        onChange={(e) => {
                            setSlug(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Category</Label>
                <FormGroup>
                    <BlogIcon />
                    <Select
                        value={category}
                        onChange={(e) => {
                            if (e.target.value == "add-category") {
                                e.preventDefault();
                                return router.push("/admin/categories/add");
                            }
                            setCategory(e.target.value);
                        }}
                    >
                        {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                        <option key="add-category" value="add-category">
                            Add Category
                        </option>
                    </Select>
                </FormGroup>
                <Label>Status</Label>
                <FormGroup>
                    <EyeIcon />
                    <Select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                        }}
                    >
                        <option value="Published">Published</option>
                        <option value="Unpublished">Unpublished</option>
                    </Select>
                </FormGroup>
                <Label>Excerpt</Label>
                <FormGroup>
                    <FormsIcon />
                    <TextArea
                        placeholder="Sample excerpt..."
                        type="text"
                        value={excerpt}
                        onChange={(e) => {
                            setExcerpt(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Content</Label>
                <FormGroup>
                    <FormsIcon />
                    <TextArea
                        placeholder="Sample content..."
                        type="text"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Comments Enabled: </Label>
                <FormGroup>
                    <LockIcon />
                    <Select
                        value={commentsEnabled}
                        onChange={(e) => {
                            setCommentsEnabled(e.target.value);
                        }}
                    >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </Select>
                </FormGroup>
                <Timestamps>
                    <p>
                        Created:{" "}
                        {new Date(postDetails?.createdAt).toLocaleString(
                            "sr-RS"
                        )}
                    </p>
                    <p>
                        Updated:{" "}
                        {new Date(postDetails?.updatedAt).toLocaleString(
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
                        onClick={updatePost}
                    />
                </Row>
                <input type="submit" hidden={true} onClick={updatePost} />
                <FormGroup>
                    <Button
                        label="Delete"
                        medium
                        whiteText
                        darkBackground
                        borderRounded
                        onClick={deletePost}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/posts/"
                        medium
                        whiteText
                        borderRounded
                    />
                </FormGroup>
            </FormSection>
            <AvatarUpdateSection>
                <img
                    src={postThumbnail}
                    alt={`${postDetails?.title} - Thumbnail`}
                />

                <Label>Upload thumbnail: </Label>
                <Input
                    id="updatePostThumbnail"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            let reader = new FileReader();
                            reader.onload = () => {
                                setPostThumbnail(reader.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        } else {
                            setPostThumbnail(postDetails?.thumbnail);
                        }
                    }}
                />
            </AvatarUpdateSection>
        </PostDetails>
    );
};

export default PostDetailsComponent;
