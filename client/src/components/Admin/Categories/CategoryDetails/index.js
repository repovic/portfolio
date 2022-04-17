import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    CategoryDetails,
    FormSection,
    Id,
    Label,
    Row,
    Column,
    FormGroup,
    Timestamps,
    Input,
} from "./CategoryDetailsElements";

import { Button } from "../../..";

import { IdIcon } from "../../../../svg";

const CategoryDetailsComponent = ({ categoryId }) => {
    const [categoryDetails, setCategoryDetails] = useState("");

    const [name, setName] = useState("");

    const router = useRouter();

    useEffect(async () => {
        await axios
            .get(`/admin/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setCategoryDetails(data.payload);
            })
            .catch(() => {
                setCategoryDetails(null);
            });
    }, []);

    useEffect(() => {
        setName(categoryDetails?.name);
    }, [categoryDetails]);

    const updateCategory = async (event) => {
        event.preventDefault();

        await axios
            .patch(
                `/admin/category/${categoryDetails?._id}`,
                {
                    name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                }
            )
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/categories",
                        query: {
                            notificationMessage:
                                "Successfully updated category!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/categories",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/categories",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <CategoryDetails>
            <FormSection>
                <Id>ID: {categoryDetails?._id}</Id>
                <Label>Name</Label>
                <FormGroup>
                    <IdIcon />
                    <Input
                        defaultValue={categoryDetails?.name}
                        type="text"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </FormGroup>
                <Timestamps>
                    <p>
                        Created:{" "}
                        {new Date(categoryDetails?.createdAt).toLocaleString(
                            "sr-RS"
                        )}
                    </p>
                    <p>
                        Updated:{" "}
                        {new Date(categoryDetails?.updatedAt).toLocaleString(
                            "sr-RS"
                        )}
                    </p>
                </Timestamps>
                <Row>
                    <Column>
                        <FormGroup>
                            <Button
                                label="Update"
                                medium
                                whiteText
                                blueBackground
                                borderRounded
                                onClick={updateCategory}
                            />
                        </FormGroup>
                    </Column>
                    <Column>
                        <FormGroup>
                            <Button
                                link="/admin/categories/"
                                label="Cancel"
                                medium
                                whiteText
                                borderRounded
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <input type="submit" hidden={true} onClick={updateCategory} />
            </FormSection>
        </CategoryDetails>
    );
};

export default CategoryDetailsComponent;
