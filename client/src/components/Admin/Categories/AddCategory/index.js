import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    AddCategory,
    FormSection,
    Label,
    FormGroup,
    Input,
} from "./AddCategoryElements";

import { Button } from "../../..";

import { IdIcon } from "../../../../svg";

const AddCategoryComponent = () => {
    const [name, setName] = useState("");

    const router = useRouter();

    const addCategory = async (event) => {
        event.preventDefault();
        await axios
            .post(
                "/admin/category/",
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
                                "Successfully added categories!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/categories/add",
                        query: {
                            notificationMessage: data.error.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/categories/add",
                    query: {
                        notificationMessage: error.response.data.error.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <AddCategory>
            <FormSection>
                <Label>Name</Label>
                <FormGroup>
                    <IdIcon />
                    <Input
                        placeholder="Uncategorized"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        label="Add Category"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                        onClick={addCategory}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/categories"
                        medium
                        whiteText
                        borderRounded
                    />
                    <input type="submit" hidden={true} onClick={addCategory} />
                </FormGroup>
            </FormSection>
        </AddCategory>
    );
};

export default AddCategoryComponent;
