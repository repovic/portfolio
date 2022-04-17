import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    AddProject,
    FormSection,
    AvatarUpdateSection,
    Label,
    FormGroup,
    Input,
    TextArea,
} from "./AddProjectElements";

import { Button } from "../../..";

import { IdIcon, FormsIcon, LinkIcon } from "../../../../svg";

const UserDetailsComponent = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [url, setUrl] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [description, setDescription] = useState("");

    const [featuredImage, setFeaturedImage] = useState(
        `${process.env.CLIENT_URL}/assets/images/project-thumbnail.png`
    );

    const router = useRouter();

    useEffect(() => {
        setSlug(title.toString().split(" ").join("-").trim().toLowerCase());
    }, [title]);

    const addProject = async () => {
        const formData = new FormData();

        formData.append(
            "featuredImage",
            document.getElementById("projectFeaturedImage").files[0]
        );

        for (const file of document.getElementById("projectImages").files) {
            formData.append("images", file);
        }

        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("url", url);
        formData.append("excerpt", excerpt);
        formData.append("description", description);

        await axios
            .post("/admin/project/", formData, {
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
                        pathname: "/admin/projects",
                        query: {
                            notificationMessage: "Successfully added project!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/projects/add",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/projects/add",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <AddProject>
            <FormSection>
                <Label>Title</Label>
                <FormGroup>
                    <IdIcon />
                    <Input
                        placeholder="Sample Project"
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
                <Label>URL</Label>
                <FormGroup>
                    <LinkIcon />
                    <Input
                        placeholder={`http://${process.env.SITE_DOMAIN}`}
                        type="text"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Excerpt</Label>
                <FormGroup>
                    <FormsIcon />
                    <Input
                        placeholder="Sample excerpt..."
                        type="text"
                        value={excerpt}
                        onChange={(e) => {
                            setExcerpt(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Description</Label>
                <FormGroup>
                    <FormsIcon />
                    <TextArea
                        placeholder="Sample description..."
                        type="text"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        label="Add Project"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                        onClick={addProject}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/projects"
                        medium
                        whiteText
                        borderRounded
                    />
                    <input type="submit" hidden={true} onClick={addProject} />
                </FormGroup>
            </FormSection>
            <AvatarUpdateSection>
                <img src={featuredImage} alt={``} />
                <Label>Upload featured image: </Label>
                <Input
                    id="projectFeaturedImage"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            let reader = new FileReader();
                            reader.onload = () => {
                                setFeaturedImage(reader.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}
                />

                <Label>Upload images</Label>
                <Input id="projectImages" type="file" multiple />
            </AvatarUpdateSection>
        </AddProject>
    );
};

export default UserDetailsComponent;
