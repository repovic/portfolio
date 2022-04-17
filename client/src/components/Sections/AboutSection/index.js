import { useContext } from "react";

import {
    AboutSection,
    Wrapper,
    Heading,
    ImageWrapper,
    Image,
    ImageInfo,
    ImageTitle,
    ImageSubtitle,
    TextWrapper,
    About,
    AboutText,
    Skills,
    Skill,
    ActionButtons,
} from "./AboutSectionElements";

import { LineBreak, Button } from "../..";

import ReactMarkdown from "react-markdown";
import router from "next/router";

const AboutSectionComponent = ({ aboutSectionProps, ...rest }) => {
    return (
        <AboutSection {...rest}>
            <Wrapper>
                <ImageWrapper data-aos-disabled="fade-right">
                    <Image>
                        <img
                            src={aboutSectionProps?.image}
                            loading={"lazy"}
                            draggable={false}
                        />
                        <ImageInfo>
                            <div>
                                <ImageTitle>
                                    {aboutSectionProps?.name}
                                </ImageTitle>
                                <ImageSubtitle>
                                    {aboutSectionProps?.role}
                                </ImageSubtitle>
                            </div>
                        </ImageInfo>
                    </Image>
                </ImageWrapper>
                <TextWrapper data-aos="fade-left">
                    <div>
                        <Heading>
                            <h1>About Me</h1>
                            <div>
                                <LineBreak blueBackground />
                            </div>
                        </Heading>
                        <About>
                            <AboutText>
                                <ReactMarkdown
                                    className="markdown-body"
                                    children={aboutSectionProps?.about}
                                />
                            </AboutText>
                            <Skills>
                                {aboutSectionProps?.skills?.map(
                                    (skill, index) => (
                                        <Skill key={index}>
                                            <img
                                                src={`/assets/icons/${skill.icon}`}
                                                loading={"lazy"}
                                                draggable={false}
                                            />
                                            <p>{skill.label}</p>
                                        </Skill>
                                    )
                                )}
                            </Skills>
                            <ActionButtons>
                                <Button
                                    label="Download CV"
                                    onClick={() => {
                                        window.open(
                                            "https://rpvc.ga/cv/",
                                            "_blank"
                                        );
                                    }}
                                    medium
                                    whiteText
                                    darkBackground
                                    borderRounded
                                />
                                <Button
                                    label="View portfolio"
                                    link="#portfolio"
                                    medium
                                    whiteText
                                    blueBackground
                                    borderRounded
                                />
                            </ActionButtons>
                        </About>
                    </div>
                </TextWrapper>
            </Wrapper>
        </AboutSection>
    );
};

export default AboutSectionComponent;
