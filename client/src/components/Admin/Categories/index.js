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
    CategoryContainer,
    Category,
    Title,
    Author,
    UserDetails,
    DisplayName,
    Role,
    Email,
    Username,
    UserAvatar,
    Options,
    Label,
} from "./CategoriesElements";

import { EditIcon, TrashIcon } from "../../../svg";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [currentShownCategories, setCurrentShownCategories] =
        useState(categories);
    const [searchQuery, setSearchQuery] = useState();

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    useEffect(() => {
        if (searchQuery) {
            const searchResults = categories?.filter(
                (category) =>
                    category._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    category.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    category.author._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    category.author.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    category.author.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    category.author.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    category.author.displayName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    category.author.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setCurrentShownCategories(searchResults);
        } else {
            setCurrentShownCategories(categories);
        }
    }, [searchQuery]);

    useEffect(() => {
        refreshCategories();
    }, []);
    useEffect(() => {
        setCurrentShownCategories(categories);
    }, [categories]);

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
                if (data.success) {
                    setCategories(data.payload);
                } else {
                    //setError(data?.error?.message);
                }
            })
            .catch((error) => {
                console.log(error);
                // setError(error?.message);
            });
    };

    const deleteCategory = async (categoryId) => {
        showConfirmBox(
            `Are you sure you want to delete that category?`,
            async () => {
                await axios
                    .delete(`/admin/category/${categoryId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        refreshCategories();
                        router.push({
                            pathname: "/admin/categories",
                            query: {
                                notificationMessage:
                                    "Successfully deleted category!",
                                notificationType: "success",
                            },
                        });
                    })
                    .catch((error) => {
                        router.push({
                            pathname: "/admin/categories",
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
                        Showing {currentShownCategories?.length || 0} results.
                    </ResultsCount>
                </div>
                <Link href={"/admin/categories/add"}>
                    <Button>Add Category</Button>
                </Link>
            </Navigation>
            <CategoryContainer>
                {currentShownCategories?.map((category) => (
                    <Category key={category._id}>
                        <Title>
                            <Label>Name: </Label>
                            <div>{category.name}</div>
                        </Title>
                        <Author>
                            <UserDetails>
                                <UserAvatar
                                    src={category.author?.avatarUrl}
                                    alt={
                                        category.author?.displayName +
                                        " - Avatar"
                                    }
                                />
                                <div>
                                    <DisplayName>
                                        {category.author.displayName} •{" "}
                                        <Role>{category.author.role}</Role>
                                    </DisplayName>
                                    <Email>{category.author.email}</Email>
                                    <Username>
                                        @{category.author.username}
                                    </Username>
                                </div>
                            </UserDetails>
                        </Author>
                        <Options>
                            <Link href={`/admin/categories/${category._id}`}>
                                <a>
                                    <div>
                                        <EditIcon />
                                    </div>
                                </a>
                            </Link>
                            <div>
                                <TrashIcon
                                    onClick={() => {
                                        deleteCategory(category._id);
                                    }}
                                />
                            </div>
                        </Options>
                    </Category>
                ))}
            </CategoryContainer>
        </>
    );
};

export default CategoriesPage;
