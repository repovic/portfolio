import { useState, useEffect } from "react";
import axios from "../../../../services/axios";
import { useRouter } from "next/router";

import {
    ContactRecordDetails,
    FormSection,
    Id,
    Label,
    Row,
    Column,
    FormGroup,
    Timestamps,
    Input,
    TextArea,
} from "./ContactRecordDetailsElements";

import { Button } from "../../..";

import { IdIcon, AtIcon, EditIcon } from "../../../../svg";

const ContactRecordDetailsComponent = ({ contactRecordId }) => {
    const [contactRecordDetails, setcontactRecordDetails] = useState("");

    const router = useRouter();

    useEffect(async () => {
        await axios
            .get(`/admin/contact-record/${contactRecordId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                setcontactRecordDetails(data.payload);
            })
            .catch(() => {
                setcontactRecordDetails(null);
            });
    }, []);

    return (
        <ContactRecordDetails>
            <FormSection>
                <Id>ID: {contactRecordDetails?._id}</Id>
                <Label>First Name: </Label>
                <FormGroup>
                    <IdIcon />
                    <Input
                        defaultValue={contactRecordDetails?.firstName}
                        type="text"
                        disabled={true}
                    />
                </FormGroup>
                <Label>Last Name: </Label>
                <FormGroup>
                    <IdIcon />
                    <Input
                        defaultValue={contactRecordDetails?.lastName}
                        type="text"
                        disabled={true}
                    />
                </FormGroup>
                <Label>Email: </Label>
                <FormGroup>
                    <AtIcon />
                    <Input
                        defaultValue={contactRecordDetails?.email}
                        type="text"
                        disabled={true}
                    />
                </FormGroup>
                <Label>Message: </Label>
                <FormGroup>
                    <EditIcon />
                    <TextArea
                        defaultValue={contactRecordDetails?.message}
                        type="text"
                        disabled={true}
                    />
                </FormGroup>
                <Timestamps>
                    <p>
                        Created:{" "}
                        {new Date(
                            contactRecordDetails?.createdAt
                        ).toLocaleString("sr-RS")}
                    </p>
                    <p>
                        Updated:{" "}
                        {new Date(
                            contactRecordDetails?.updatedAt
                        ).toLocaleString("sr-RS")}
                    </p>
                </Timestamps>
                <Row>
                    <Button
                        link="/admin/contact-records/"
                        label="Cancel"
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                    />
                </Row>
            </FormSection>
        </ContactRecordDetails>
    );
};

export default ContactRecordDetailsComponent;
