import { useState, useEffect, useContext } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    ProjectDetails,
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
} from "./ProjectDetailsElements";

import { Button } from "../../..";

import { IdIcon, LockIcon, FormsIcon, LinkIcon } from "../../../../svg";

import { ConfirmBoxContext } from "../../../../context";

const ProjectDetailsComponent = ({ projectId }) => {
    const [projectDetails, setProjectDetails] = useState("");
    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [url, setUrl] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [description, setDescription] = useState("");
    const [commentsEnabled, setCommentsEnabled] = useState(true);

    const [featuredImage, setFeaturedImage] = useState("");

    const router = useRouter();

    //#region
    useEffect(async () => {
        await axios
            .get(`/admin/project/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setProjectDetails(data.payload);
            })
            .catch(() => {
                setProjectDetails(null);
            });
    }, []);

    useEffect(() => {
        setTitle(projectDetails?.title || "");
        setSlug(projectDetails?.slug || "");
        setUrl(projectDetails?.url || "");
        setFeaturedImage(projectDetails?.featuredImage || "");
        setExcerpt(projectDetails?.excerpt || "");
        setDescription(projectDetails?.description || "");
        setCommentsEnabled(projectDetails?.commentsEnabled);
    }, [projectDetails]);

    const updateProject = async (event) => {
        event.preventDefault();
        var formData = new FormData();

        formData.append(
            "featuredImage",
            document.getElementById("updateProjectFeaturedImage").files[0]
        );

        for (const file of document.getElementById("updateProjectImages")
            .files) {
            formData.append("images", file);
        }

        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("url", url);
        formData.append("excerpt", excerpt);
        formData.append("description", description);
        formData.append("commentsEnabled", commentsEnabled);

        await axios
            .patch(`/admin/project/${projectDetails?._id}`, formData, {
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
                        pathname: "/admin/projects",
                        query: {
                            notificationMessage:
                                "Successfully updated project!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/projects",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/projects",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    const deleteProject = async () => {
        showConfirmBox(
            `Are you sure you want to delete that project?`,
            async () => {
                await axios
                    .delete(`/admin/project/${projectId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        router.push({
                            pathname: "/admin/projects",
                            query: {
                                notificationMessage:
                                    "Successfully deleted project!",
                                notificationType: "success",
                            },
                        });
                    })
                    .catch((error) => {
                        router.push({
                            pathname: "/admin/projects",
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
        <ProjectDetails>
            <FormSection>
                <Id>ID: {projectDetails?._id}</Id>
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
                        {new Date(projectDetails?.createdAt).toLocaleString(
                            "sr-RS"
                        )}
                    </p>
                    <p>
                        Updated:{" "}
                        {new Date(projectDetails?.updatedAt).toLocaleString(
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
                        onClick={updateProject}
                    />
                </Row>
                <input type="submit" hidden={true} onClick={updateProject} />
                <FormGroup>
                    <Button
                        label="Delete"
                        medium
                        whiteText
                        darkBackground
                        borderRounded
                        onClick={deleteProject}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/projects/"
                        medium
                        whiteText
                        borderRounded
                    />
                </FormGroup>
            </FormSection>
            <AvatarUpdateSection>
                <img
                    src={featuredImage}
                    alt={`${projectDetails?.title} - Featured Image`}
                />

                <Label>Upload thumbnail: </Label>
                <Input
                    id="updateProjectFeaturedImage"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            let reader = new FileReader();
                            reader.onload = () => {
                                setFeaturedImage(reader.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        } else {
                            setFeaturedImage(projectDetails?.featuredImage);
                        }
                    }}
                />

                <Label>Upload images:</Label>
                <Input id="updateProjectImages" type="file" multiple />
            </AvatarUpdateSection>
        </ProjectDetails>
    );
};

export default ProjectDetailsComponent;
