import { useState, useEffect, useContext } from "react";
import axios from "../../../services/axios";
import { useRouter } from "next/router";
import Link from "next/link";

import { ConfirmBoxContext } from "../../../context/";

import {
    Navigation,
    SearchInput,
    ResultsCount,
    ContactRecord,
    ContactRecordUserDetails,
    ContactRecordMessage,
    Options,
    Label,
} from "./ContactRecordsElements";

import { ViewIcon, TrashIcon } from "../../../svg";

const ContactRecordsPage = () => {
    const [contactRecords, setContactRecords] = useState(null);
    const [currentShownContactRecords, setCurrentShownContactRecords] =
        useState(contactRecords);
    const [searchQuery, setSearchQuery] = useState();

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    useEffect(() => {
        if (searchQuery) {
            const searchResults = contactRecords?.filter(
                (contactRecord) =>
                    contactRecord._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    contactRecord.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    contactRecord.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    contactRecord.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    contactRecord.message
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    contactRecord.ip
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setCurrentShownContactRecords(searchResults);
        } else {
            setCurrentShownContactRecords(contactRecords);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            localStorage.setItem("auth-token", "");
            return;
        }

        refreshContactRecords();
    }, []);

    useEffect(() => {
        setCurrentShownContactRecords(contactRecords);
    }, [contactRecords]);

    const refreshContactRecords = async () => {
        await axios
            .get("/admin/contact-record/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                if (data.success) {
                    setContactRecords(data?.payload);
                } else {
                    console.error(data?.error?.message);
                }
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const deleteContactRecord = async (id) => {
        showConfirmBox(
            `Are you sure you want to delete that contact record?`,
            async () => {
                await axios
                    .delete(`/admin/contact-record/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        refreshContactRecords();
                        router.push({
                            pathname: "/admin/contact-records",
                            query: {
                                notificationMessage:
                                    "Successfully deleted contact record!",
                                notificationType: "success",
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
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
                        Showing {currentShownContactRecords?.length || 0}{" "}
                        results.
                    </ResultsCount>
                </div>
            </Navigation>
            {currentShownContactRecords?.map((contactRecord) => (
                <ContactRecord key={contactRecord._id}>
                    <ContactRecordUserDetails>
                        <Label>Display name:</Label>
                        <div>
                            {contactRecord.firstName +
                                " " +
                                contactRecord.lastName}
                        </div>
                    </ContactRecordUserDetails>
                    <ContactRecordUserDetails>
                        <Label>Email:</Label>
                        <div>{contactRecord.email}</div>
                    </ContactRecordUserDetails>
                    <ContactRecordMessage>
                        <Label>Message: </Label>
                        <div>
                            {contactRecord.message.length > 150
                                ? contactRecord.message
                                      .substring(0, 150)
                                      .trim() + "..."
                                : contactRecord.message.trim()}
                        </div>
                    </ContactRecordMessage>
                    <ContactRecordUserDetails>
                        <Label>IP:</Label>
                        <div>{contactRecord.ip}</div>
                    </ContactRecordUserDetails>
                    <Options>
                        <Link
                            href={`/admin/contact-records/${contactRecord._id}`}
                        >
                            <a>
                                <div>
                                    <ViewIcon />
                                </div>
                            </a>
                        </Link>
                        <div>
                            <TrashIcon
                                onClick={() => {
                                    deleteContactRecord(contactRecord._id);
                                }}
                            />
                        </div>
                    </Options>
                </ContactRecord>
            ))}
        </>
    );
};

export default ContactRecordsPage;
