import { useState, useEffect } from "react";
import Link from "next/link";

import {
    PortfolioSection,
    Heading,
    PortfoliosContainer,
    Portfolio,
    PortfolioInfo,
    PortfolioTitle,
    PortfolioSubtitle,
} from "./PortfolioSectionElements";

import { LineBreak } from "../..";

import { LinkIcon } from "../../../svg";
const PortfolioSectionComponent = ({ projects: serverProjects, ...rest }) => {
    const [projects, setProjects] = useState(serverProjects);

    useEffect(() => {
        setProjects(serverProjects);
    }, []);

    return (
        <PortfolioSection {...rest}>
            <Heading data-aos="fade-right">
                <h1>Portfolio</h1>
                <div>
                    <LineBreak blueBackground />
                </div>
                <h2>Let my projects speak for me:</h2>
            </Heading>
            <PortfoliosContainer>
                {projects.map((project) => (
                    <Link href={`/project/${project.slug}`} key={project._id}>
                        <a draggable={false}>
                            <Portfolio data-aos="zoom-in" key={project._id}>
                                <img
                                    src={project.featuredImage}
                                    loading={"lazy"}
                                    draggable={false}
                                />
                                <PortfolioInfo>
                                    <div>
                                        <PortfolioTitle>
                                            {project.title}
                                        </PortfolioTitle>
                                        <PortfolioSubtitle>
                                            {project.excerpt}
                                        </PortfolioSubtitle>
                                    </div>
                                    <LinkIcon />
                                </PortfolioInfo>
                            </Portfolio>
                        </a>
                    </Link>
                ))}
            </PortfoliosContainer>
        </PortfolioSection>
    );
};

export default PortfolioSectionComponent;
