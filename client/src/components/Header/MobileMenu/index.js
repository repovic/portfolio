import Link from "next/link";

import { MobileMenu, MenuLink } from "./MobileMenuElements";

import { Button } from "../../";

const MobileMenuComponent = ({
    isNavigationOpen,
    closeNavigation,
    headerLinks,
    ...rest
}) => {
    return (
        <MobileMenu
            isNavigationOpen={isNavigationOpen}
            onClick={closeNavigation}
            {...rest}
        >
            {headerLinks?.map((link, index) => {
                if (link.isButton)
                    return (
                        <MenuLink key={index}>
                            <Button
                                label={link.label}
                                link={link.link}
                                onClick={closeNavigation}
                                large
                                whiteText
                                blueBackground
                                borderRounded
                            />
                        </MenuLink>
                    );
                return (
                    <MobileMenuLink
                        key={index}
                        title={link.label}
                        link={link.link}
                    />
                );
            })}
        </MobileMenu>
    );
};

const MobileMenuLink = ({ title, link, ...rest }) => {
    return (
        <Link href={link}>
            <a>
                <MenuLink {...rest}>{title}</MenuLink>
            </a>
        </Link>
    );
};

export default MobileMenuComponent;
