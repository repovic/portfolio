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
    Option,
    OptionName,
    OptionValue,
    OptVal,
    Options,
    Label,
} from "./OptionsElements";

import { EditIcon, TrashIcon } from "../../../svg";

const OptionsPage = () => {
    const [options, setOptions] = useState(null);
    const [currentShownOptions, setCurrentShownOptions] = useState(options);
    const [searchQuery, setSearchQuery] = useState();

    const { showConfirmBox } = useContext(ConfirmBoxContext);

    const router = useRouter();

    useEffect(() => {
        if (searchQuery) {
            const searchResults = options?.filter(
                (option) =>
                    option._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    option.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    option.value
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setCurrentShownOptions(searchResults);
        } else {
            setCurrentShownOptions(options);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            localStorage.setItem("auth-token", "");
            return;
        }

        refreshOptions();
    }, []);

    useEffect(() => {
        setCurrentShownOptions(options);
    }, [options]);

    const refreshOptions = async () => {
        await axios
            .get("/admin/option/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "auth-token"
                    )}`,
                },
            })
            .then(({ data }) => {
                if (data.success) {
                    setOptions(data?.payload);
                } else {
                    console.error(data?.error?.message);
                }
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const deleteOption = async (id) => {
        showConfirmBox(
            `Are you sure you want to delete that option?`,
            async () => {
                await axios
                    .delete(`/admin/option/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "auth-token"
                            )}`,
                        },
                    })
                    .then(() => {
                        refreshOptions();
                        router.push({
                            pathname: "/admin/options",
                            query: {
                                notificationMessage:
                                    "Successfully deleted option!",
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
                        Showing {currentShownOptions?.length || 0} results.
                    </ResultsCount>
                </div>
                <Link href={"/admin/options/add"}>
                    <Button>Add Option</Button>
                </Link>
            </Navigation>
            {currentShownOptions?.map((option) => (
                <Option key={option._id}>
                    <OptionName>
                        <Label>Name:</Label>
                        <div>{option.name}</div>
                    </OptionName>
                    <OptionValue>
                        <Label>Value: </Label>
                        <OptVal>{JSON.stringify(option.value, null, 4)}</OptVal>
                    </OptionValue>
                    <Options>
                        <Link href={`/admin/options/${option._id}`}>
                            <div>
                                <EditIcon />
                            </div>
                        </Link>
                        <div>
                            <TrashIcon
                                onClick={() => {
                                    deleteOption(option._id);
                                }}
                            />
                        </div>
                    </Options>
                </Option>
            ))}
        </>
    );
};

export default OptionsPage;
