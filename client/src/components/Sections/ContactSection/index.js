import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import axios from "../../../services/axios";

import {
    ContactSection,
    ContactDetails,
    ContactDetail,
    Location,
    ContactFormWrapper,
    Heading,
    ContactForm,
    Row,
    Column,
    Label,
    FormGroup,
    Input,
    TextArea,
} from "./ContactSectionElements";

import { LineBreak, Button } from "../..";

import { IdIcon, EmailIcon } from "../../../svg/";
import { UserContext } from "../../../context/";
import { ConfirmBoxContext } from "../../../context/";

const ContactSectionComponent = ({ contactDetails, ...rest }) => {
    const { user } = useContext(UserContext);
    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();

    const saveRecord = async () => {
        showConfirmBox(
            `Are you sure you want to submit contact message?`,
            async () => {
                await axios
                    .post("/contact-record", {
                        firstName,
                        lastName,
                        email,
                        message,
                    })
                    .then(({ data }) => {
                        if (data.success) {
                            router.push(
                                {
                                    path: "/",
                                    query: {
                                        notificationMessage:
                                            "Message sent successfully!",
                                        notificationType: "success",
                                    },
                                },
                                undefined,
                                { shallow: true }
                            );
                            setMessage("");
                        } else {
                            router.push(
                                {
                                    path: "/",
                                    query: {
                                        notificationMessage:
                                            data?.error?.message,
                                        notificationType: "error",
                                    },
                                },
                                undefined,
                                { shallow: true }
                            );
                        }
                    })
                    .catch((error) => {
                        router.push(
                            {
                                path: "/",
                                query: {
                                    notificationMessage:
                                        error?.response?.data?.error?.message,
                                    notificationType: "error",
                                },
                            },
                            undefined,
                            { shallow: true }
                        );
                    });
            }
        );
    };
    useEffect(() => {
        if (user.data) {
            setFirstName(user.data?.firstName || "");
            setLastName(user.data?.lastName || "");
            setEmail(user.data?.email || "");
        }
    }, [user]);
    return (
        <ContactSection {...rest}>
            <Row className="wrap-reverse">
                <ContactDetails data-aos="fade-right">
                    <div>
                        <Heading>
                            <h1>Contact Details</h1>
                            <div>
                                <LineBreak blueBackground />
                            </div>
                        </Heading>
                        <Label>Phone</Label>
                        <Link href={contactDetails.phone.href}>
                            <a>
                                <ContactDetail>
                                    {contactDetails.phone.label}
                                    <IdIcon />
                                </ContactDetail>
                            </a>
                        </Link>
                        <Label>Email</Label>
                        <Link href={contactDetails.email.href}>
                            <a>
                                <ContactDetail>
                                    {contactDetails.email.label}
                                    <EmailIcon />
                                </ContactDetail>
                            </a>
                        </Link>
                        <Location
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_KEY}&q=${contactDetails.location}`}
                            width="600"
                            height="450"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </ContactDetails>
                <ContactFormWrapper data-aos="fade-left">
                    <div>
                        <Heading>
                            <h1>Contact Form</h1>
                            <div>
                                <LineBreak blueBackground />
                            </div>
                        </Heading>
                        <ContactForm>
                            <Row>
                                <Column>
                                    <div>
                                        <Label>First Name</Label>
                                        <FormGroup>
                                            <IdIcon />
                                            <Input
                                                placeholder="John"
                                                value={firstName}
                                                type="text"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                onChange={(e) => {
                                                    setFirstName(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormGroup>
                                    </div>
                                </Column>
                                <Column>
                                    <div>
                                        <Label>Last Name</Label>
                                        <FormGroup>
                                            <IdIcon />
                                            <Input
                                                placeholder="Doe"
                                                value={lastName}
                                                type="text"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                }}
                                            />
                                        </FormGroup>
                                    </div>
                                </Column>
                            </Row>
                            <Label>Email</Label>
                            <FormGroup>
                                <EmailIcon />
                                <Input
                                    placeholder="john@doe.com"
                                    value={email}
                                    type="text"
                                    inputMode="email"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </FormGroup>
                            <Label>Message</Label>
                            <FormGroup>
                                <TextArea
                                    placeholder="Message"
                                    value={message}
                                    type="text"
                                    inputMode="text"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                />
                            </FormGroup>
                            <Button
                                label="Submit"
                                medium
                                whiteText
                                blueBackground
                                borderRounded
                                onClick={saveRecord}
                            />
                            <input type="submit" onClick={saveRecord} hidden />
                        </ContactForm>
                    </div>
                </ContactFormWrapper>
            </Row>
        </ContactSection>
    );
};

export default ContactSectionComponent;
