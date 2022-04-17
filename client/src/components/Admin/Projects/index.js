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
    ProjectsContainer,
    Project,
    Title,
    Label,
    Url,
    Description,
    Author,
    UserDetails,
    UserAvatar,
    DisplayName,
    Email,
    Role,
    Username,
    Options,
} from "./ProjectsElements";

import { EditIcon, TrashIcon, LinkIcon } from "../../../svg";

const ProjectsPage = () => {
    const [projects, setProjects] = useState(null);
    const [currentShownProjects, setCurrentShownProjects] = useState(projects);
    const [searchQuery, setSearchQuery] = useState();

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    useEffect(() => {
        if (searchQuery) {
            const searchResults = projects?.filter(
                (project) =>
                    project._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.slug
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.author._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.author.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.author.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.author.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.author.displayName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.author.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.url
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.excerpt
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    project.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setCurrentShownProjects(searchResults);
        } else {
            setCurrentShownProjects(projects);
        }
    }, [searchQuery]);

    useEffect(() => {
        refreshProjects();
    }, []);

    const refreshProjects = async () => {
        await axios
            .get("/admin/project/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setProjects(data?.payload);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setCurrentShownProjects(projects);
    }, [projects]);

    const deleteProject = async (projectId) => {
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
                        refreshProjects();
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
                        Showing {currentShownProjects?.length || 0} results.
                    </ResultsCount>
                </div>
                <Link href="/admin/projects/add">
                    <Button>Add Project</Button>
                </Link>
            </Navigation>
            <ProjectsContainer>
                {currentShownProjects?.map((project) => (
                    <Project key={project._id}>
                        <Title>
                            <Label>Title: </Label>
                            <div>{project.title}</div>
                        </Title>
                        <Url>
                            <Label>URL: </Label>
                            <Link href={project.url}>
                                <a>
                                    <div>{project.url}</div>
                                </a>
                            </Link>
                        </Url>
                        <Description>
                            <Label>Excerpt: </Label>
                            <div>
                                {project.excerpt.length > 50
                                    ? project.excerpt.substr(0, 50) + "..."
                                    : project.excerpt}
                            </div>
                        </Description>
                        <Author>
                            <UserDetails>
                                <UserAvatar
                                    src={project.author?.avatarUrl}
                                    alt={
                                        project.author?.displayName +
                                        " - Avatar"
                                    }
                                />
                                <div>
                                    <DisplayName>
                                        {project.author.displayName} •{" "}
                                        <Role>{project.author.role}</Role>
                                    </DisplayName>
                                    <Email>{project.author.email}</Email>
                                    <Username>
                                        @{project.author.username}
                                    </Username>
                                </div>
                            </UserDetails>
                        </Author>
                        <Options>
                            <Link href={`/project/${project.slug}`}>
                                <a>
                                    <div>
                                        <LinkIcon />
                                    </div>
                                </a>
                            </Link>
                            <Link href={`/admin/projects/${project._id}`}>
                                <a>
                                    <div>
                                        <EditIcon />
                                    </div>
                                </a>
                            </Link>
                            <div>
                                <TrashIcon
                                    onClick={() => {
                                        deleteProject(project._id);
                                    }}
                                />
                            </div>
                        </Options>
                    </Project>
                ))}
            </ProjectsContainer>
        </>
    );
};

export default ProjectsPage;
