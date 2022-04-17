import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    OptionDetails,
    FormSection,
    Id,
    Label,
    FormGroup,
    Timestamps,
    Input,
    TextArea,
} from "./OptionDetailsElements";

import { Button } from "../../..";

import { OptionsIcon, FormsIcon } from "../../../../svg";

const OptionDetailsComponent = ({ optionId }) => {
    const [optionDetails, setOptionDetails] = useState("");

    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    const router = useRouter();

    useEffect(async () => {
        await axios
            .get(`/admin/option/${optionId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setOptionDetails(data.payload);
            })
            .catch(() => {
                setOptionDetails(null);
            });
    }, []);

    useEffect(() => {
        setName(optionDetails?.name);
        setValue(JSON.stringify(optionDetails?.value));
    }, [optionDetails]);

    const updateOption = async (event) => {
        event.preventDefault();
        const valueJSON = JSON.parse(value);
        await axios
            .patch(
                `/admin/option/${optionDetails?._id}`,
                {
                    name,
                    value: valueJSON,
                },
                {
                    headers: {
                        contentType: "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                }
            )
            .then(async ({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: "/admin/options",
                        query: {
                            notificationMessage: "Successfully updated option!",
                            notificationType: "success",
                        },
                    });
                } else {
                    router.push({
                        pathname: "/admin/options",
                        query: {
                            notificationMessage: data?.error?.message,
                            notificationType: "error",
                        },
                    });
                }
            })
            .catch((error) => {
                router.push({
                    pathname: "/admin/options",
                    query: {
                        notificationMessage:
                            error?.response?.data?.error?.message,
                        notificationType: "error",
                    },
                });
            });
    };

    return (
        <OptionDetails>
            <FormSection>
                <form encType="multipart/form-data">
                    <Id>ID: {optionDetails?._id}</Id>
                    <Label>Name</Label>
                    <FormGroup>
                        <OptionsIcon />
                        <Input
                            defaultValue={optionDetails?.name}
                            type="text"
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
                            defaultValue={JSON.stringify(
                                optionDetails?.value,
                                null,
                                4
                            )}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <Timestamps>
                        <p>
                            Created:{" "}
                            {new Date(optionDetails?.createdAt).toLocaleString(
                                "sr-RS"
                            )}
                        </p>
                        <p>
                            Updated:{" "}
                            {new Date(optionDetails?.updatedAt).toLocaleString(
                                "sr-RS"
                            )}
                        </p>
                    </Timestamps>
                    <input type="submit" hidden={true} onClick={updateOption} />
                    <FormGroup>
                        <Button
                            label="Update"
                            medium
                            whiteText
                            blueBackground
                            borderRounded
                            onClick={updateOption}
                        />
                        <Button
                            link="/admin/options/"
                            label="Cancel"
                            medium
                            whiteText
                            borderRounded
                        />
                    </FormGroup>
                </form>
            </FormSection>
        </OptionDetails>
    );
};

export default OptionDetailsComponent;
