import { useEffect, useState } from "react";
import Link from "next/link";

import {
    Footer,
    Copyright,
    SocialMedia,
    SocialMediaItem,
} from "./FooterElements";

import { GitHubIcon, EmailIcon, FacebookIcon, InstagramIcon } from "../../svg";

const FooterComponent = ({ options, ...rest }) => {
    const [attributes, setAttributes] = useState([
        { "data-aos": "fade-right" },
        { "data-aos": "fade-left" },
    ]);

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
        <Footer {...rest}>
            <Copyright {...attributes[0]}>
                Copyright © 2021-{new Date().getFullYear()}
                <Link href="/#">
                    <a> {options["site-title"]} </a>
                </Link>{" "}
                - All rights reserved!
            </Copyright>
            <SocialMedia {...attributes[1]}>
                <SocialMediaItem
                    href={options["social-media-links"].github}
                    target="_blank"
                    key={1}
                >
                    <GitHubIcon />
                </SocialMediaItem>
                <SocialMediaItem
                    href={options["social-media-links"].email}
                    target="_blank"
                    key={2}
                >
                    <EmailIcon />
                </SocialMediaItem>
                <SocialMediaItem
                    href={options["social-media-links"].facebook}
                    target="_blank"
                    key={3}
                >
                    <FacebookIcon />
                </SocialMediaItem>
                <SocialMediaItem
                    href={options["social-media-links"].instagram}
                    target="_blank"
                    key={4}
                >
                    <InstagramIcon />
                </SocialMediaItem>
            </SocialMedia>
        </Footer>
    );
};

export default FooterComponent;
