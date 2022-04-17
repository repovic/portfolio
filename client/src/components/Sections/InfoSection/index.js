import { InfoSection } from "./InfoSectionElements";

import {
    TextWrapper,
    TopLine,
    Heading,
    JobTitle,
    Subtitile,
    ImageWrapper,
    InfoSectionImage,
} from "./InfoSectionElements";

import { Button, Row, Column, LineBreak } from "../../";

const InfoSectionComponent = ({ infoSectionProps, ...rest }) => {
    return (
        <InfoSection
            backgroundImage={infoSectionProps?.backgroundImage}
            {...rest}
        >
            <Row>
                <Column data-aos="fade-right">
                    <TextWrapper>
                        <TopLine>{infoSectionProps?.topLine}</TopLine>
                        <Heading>{infoSectionProps?.heading}</Heading>
                        <JobTitle>{infoSectionProps?.jobTitle}</JobTitle>
                        <LineBreak blueBackground />
                        <Subtitile>{infoSectionProps?.subTitle}</Subtitile>
                        <Button
                            label={infoSectionProps?.button?.label}
                            link={infoSectionProps?.button?.link}
                            medium
                            whiteText
                            blueBackground
                            borderRounded
                        />
                    </TextWrapper>
                </Column>
                <Column data-aos="fade-left">
                    <ImageWrapper>
                        <InfoSectionImage
                            draggable={false}
                            src={`./assets/illustrations/${infoSectionProps?.illustartion}`}
                            alt=""
                        />
                    </ImageWrapper>
                </Column>
            </Row>
        </InfoSection>
    );
};

export default InfoSectionComponent;
