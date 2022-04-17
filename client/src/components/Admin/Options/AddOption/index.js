import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    AddOption,
    FormSection,
    Label,
    FormGroup,
    Input,
    TextArea,
} from "./AddOptionElements";

import { Button } from "../../..";

import { OptionsIcon, FormsIcon } from "../../../../svg";

const AddOptionComponent = () => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    const router = useRouter();

    const addOption = async (event) => {
        event.preventDefault();
        const valueJSON = JSON.parse(value);
        await axios
            .post(
                "/admin/option/",
                {
                    name,
                    value: valueJSON,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
                    },
                }
            )
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/options",
                        query: {
                            notificationMessage: "Successfully added option!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/options/add",
                        query: {
                            notificationMessage: data.error.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/options/add",
                    query: {
                        notificationMessage: error.response.data.error.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <AddOption>
            <FormSection>
                <Label>Name</Label>
                <FormGroup>
                    <OptionsIcon />
                    <Input
                        placeholder="option-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </FormGroup>
                <Label>Value</Label>
                <FormGroup>
                    <FormsIcon />
                    <TextArea
                        wrap="off"
                        spellCheck="false"
                        autoComplete="off"
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        label="Add Option"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                        onClick={addOption}
                    />
                    <Button
                        label="Cancel"
                        link="/admin/options"
                        medium
                        whiteText
                        borderRounded
                    />
                    <input type="submit" hidden={true} onClick={addOption} />
                </FormGroup>
            </FormSection>
        </AddOption>
    );
};

export default AddOptionComponent;
