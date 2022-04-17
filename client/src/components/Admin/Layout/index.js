import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
    Layout,
    LeftSidebar,
    Profile,
    DisplayName,
    Role,
    Username,
    UserAvatar,
    SidebarActon,
    Page,
    Heading,
    Copyright,
} from "./LayoutElements";

import {
    DashboardIcon,
    UsersIcon,
    BlogIcon,
    FormsIcon,
    OptionsIcon,
    UrlShortenerIcon,
} from "../../../svg";

const LayoutComponent = ({ user, heading, children }) => {
    const router = useRouter();

    useEffect(() => {
        const disableAdminDashboardOnMobile = () => {
            if (window.location.href.includes("admin")) {
                if (window.innerWidth < 1600) {
                    router.push({
                        pathname: "/",
                        query: {
                            notificationMessage:
                                "You cannot use Admin Dashboard at this time!",
                            notificationType: "error",
                        },
                    });
                }
            }
        };
        disableAdminDashboardOnMobile();
        window.addEventListener("resize", () => {
            disableAdminDashboardOnMobile();
        });
    }, []);

    return (
        <Layout>
            <LeftSidebar>
                <Profile>
                    <div>
                        <DisplayName>{user.data?.displayName}</DisplayName>
                        <Role>{user.data?.role}</Role>
                        <Username>@{user.data?.username}</Username>
                    </div>
                    <UserAvatar
                        src={user.data?.avatarUrl}
                        alt={user.data?.displayName + " - Avatar"}
                    />
                </Profile>
                <SidebarItem
                    link="dashboard"
                    label="Dashboard"
                    heading={heading}
                >
                    <DashboardIcon />
                </SidebarItem>
                <SidebarItem
                    link="short-urls"
                    label="Short URLs"
                    heading={heading}
                >
                    <UrlShortenerIcon />
                </SidebarItem>
                <SidebarItem link="users" label="Users" heading={heading}>
                    <UsersIcon />
                </SidebarItem>
                <SidebarItem link="posts" label="Blog" heading={heading}>
                    <BlogIcon />
                </SidebarItem>
                <SidebarItem
                    link="categories"
                    label="Categories"
                    heading={heading}
                >
                    <BlogIcon />
                </SidebarItem>
                <SidebarItem link="projects" label="Projects" heading={heading}>
                    <BlogIcon />
                </SidebarItem>
                <SidebarItem link="options" label="Options" heading={heading}>
                    <OptionsIcon />
                </SidebarItem>
                <SidebarItem
                    link="contact-records"
                    label="Contact Records"
                    heading={heading}
                >
                    <FormsIcon />
                </SidebarItem>
            </LeftSidebar>
            <Page>
                <Heading>
                    <h1>{heading}</h1>
                </Heading>
                {children}
                <Copyright>
                    <p>
                        Copyright © 2021-{new Date().getFullYear()} Vasilije
                        Repović - All rights reserved!
                    </p>
                </Copyright>
            </Page>
        </Layout>
    );
};

const SidebarItem = ({ link, label, heading, children, ...rest }) => {
    return (
        <Link href={`/admin/${link}`}>
            <a>
                <SidebarActon {...rest} isActive={label == heading}>
                    {children}
                    <p>{label}</p>
                </SidebarActon>
            </a>
        </Link>
    );
};

export default LayoutComponent;
