import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    AddPost,
    FormSection,
    AvatarUpdateSection,
    Label,
    FormGroup,
    Timestamps,
    Input,
    TextArea,
    Select,
} from "./AddPostElements";

import { Button } from "../../..";

import { IdIcon, BlogIcon, LinkIcon, FormsIcon } from "../../../../svg";

const UserDetailsComponent = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");

    const [postThumbnail, setPostThumbnail] = useState(
        `${process.env.CLIENT_URL}assets/images/post-thumbnail.png`
    );

    const [categories, setCategories] = useState([]);

    const router = useRouter();

    useEffect(async () => {
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
        setSlug(title.toString().split(" ").join("-").trim().toLowerCase());
    }, [title]);

    const addPost = async () => {
        const formData = new FormData();

        formData.append(
            "thumbnail",
            document.getElementById("postThumbnail").files[0]
        );

        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("category", category);
        formData.append("excerpt", excerpt);
        formData.append("content", content);

        await axios
            .post("/admin/post/", formData, {
                headers: {
                    contentType: "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/posts",
                        query: {
                            notificationMessage: "Successfully added post!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/posts/add",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/posts/add",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <AddPost>
            <FormSection>
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
                        onChange={(e) => {
                            if (e.target.value == "add-category") {
                                e.preventDefault();
                                return router.push("/admin/categories/add");
                            }
                            setCategory(e.target.value);
                        }}
                    >
                        <option value="" selected disabled hidden>
                            Select category
                        </option>
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
                        placeholder="Sample content... (supports MarkDown)"
                        type="text"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        label="Add Post"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                        onClick={addPost}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/posts"
                        medium
                        whiteText
                        borderRounded
                    />
                    <input type="submit" hidden={true} onClick={addPost} />
                </FormGroup>
            </FormSection>
            <AvatarUpdateSection>
                <img src={postThumbnail} alt={``} />
                <Label>Upload post thumbnail: </Label>
                <Input
                    id="postThumbnail"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            let reader = new FileReader();
                            reader.onload = () => {
                                setPostThumbnail(reader.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}
                />
            </AvatarUpdateSection>
        </AddPost>
    );
};

export default UserDetailsComponent;
