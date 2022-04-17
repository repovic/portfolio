import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { UserContext } from "../../context/";

import {
    Header,
    Branding,
    Title,
    Navigation,
    NavLink,
    NavIcon,
} from "./HeaderElements";

import {
    MenuIcon,
    CloseIcon,
    SearchIcon,
    SearchIconClose,
    PersonIcon,
    SignInIcon,
} from "../../svg";

import MobileMenu from "./MobileMenu";
import SearchMenu from "./SearchMenu";
import UserDetails from "./UserDetails";

import { Button } from "../";

const HeaderComponent = ({ options, ...rest }) => {
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

    const [attributes, setAttributes] = useState([
        { "data-aos": "fade-right" },
        { "data-aos": "fade-left" },
    ]);

    const { user } = useContext(UserContext);

    const toggleNavigation = () => {
        hideCollapsableContent();
        setIsNavigationOpen(!isNavigationOpen);
    };

    const closeNavigation = () => {
        setIsNavigationOpen(false);
    };

    const toggleSearchMenu = () => {
        hideCollapsableContent();
        setIsSearchMenuOpen(!isSearchMenuOpen);
    };

    const closeSearchMenu = () => {
        setIsSearchMenuOpen(false);
    };

    const toggleUserDetails = () => {
        hideCollapsableContent();
        setIsUserDetailsOpen(!isUserDetailsOpen);
    };

    const closeUserDetails = () => {
        setIsUserDetailsOpen(false);
    };

    const hideCollapsableContent = () => {
        closeNavigation();
        closeSearchMenu();
        closeUserDetails();
    };

    useEffect(() => {
        if (window !== undefined) {
            if (!(window.innerWidth < 1500)) {
                setAttributes([
                    { "data-aos": "fade-right" },
                    { "data-aos": "fade-left" },
                ]);
            } else {
                setAttributes([]);
            }
        }
    }, []);

    return (
        <>
            <MobileMenu
                isNavigationOpen={isNavigationOpen}
                closeNavigation={closeNavigation}
                headerLinks={options["header-links"]}
            />
            <SearchMenu
                isSearchMenuOpen={isSearchMenuOpen}
                closeSearchMenu={closeSearchMenu}
            />
            <UserDetails
                isUserDetailsOpen={isUserDetailsOpen}
                closeUserDetails={closeUserDetails}
            />
            <Header {...rest}>
                <Branding {...attributes[0]} data-aos-once="true">
                    <NavigationIcon onClick={toggleNavigation}>
                        {isNavigationOpen ? <CloseIcon /> : <MenuIcon />}
                    </NavigationIcon>
                    <Link href="/">
                        <a>
                            <Title onClick={hideCollapsableContent}>
                                {options["site-title"]}
                            </Title>
                        </a>
                    </Link>
                </Branding>
                <Navigation {...attributes[1]} data-aos-once="true">
                    {options["header-links"].map((link, index) => {
                        if (link.isButton)
                            return (
                                <NavLink noHover key={index}>
                                    <Button
                                        label={link.label}
                                        link={link.link}
                                        onClick={closeSearchMenu}
                                        medium
                                        whiteText
                                        blueBackground
                                        borderRounded
                                        hideOnMobile
                                    />
                                </NavLink>
                            );
                        return (
                            <NavigationLink
                                key={index}
                                onClick={closeSearchMenu}
                                label={link.label}
                                link={link.link}
                            />
                        );
                    })}
                    {user.authToken ? (
                        <NavigationIcon onClick={toggleUserDetails}>
                            <PersonIcon />
                        </NavigationIcon>
                    ) : (
                        <Link href="/signin">
                            <a>
                                <NavigationIcon onClick={toggleUserDetails}>
                                    <SignInIcon />
                                </NavigationIcon>
                            </a>
                        </Link>
                    )}
                    <NavigationIcon onClick={toggleSearchMenu}>
                        {isSearchMenuOpen ? (
                            <SearchIconClose />
                        ) : (
                            <SearchIcon />
                        )}
                    </NavigationIcon>
                </Navigation>
            </Header>
        </>
    );
};

const NavigationLink = ({ label, link, ...rest }) => {
    if (link)
        return (
            <Link href={link}>
                <a>
                    <NavLink {...rest}>{label}</NavLink>
                </a>
            </Link>
        );
    return <NavLink {...rest}>{label}</NavLink>;
};

const NavigationIcon = ({ children, ...rest }) => {
    return <NavIcon {...rest}>{children}</NavIcon>;
};

export default HeaderComponent;
