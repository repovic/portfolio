import Head from "next/head";
import { useEffect } from "react";
import {
    Header,
    InfoSection,
    AboutSection,
    PortfolioSection,
    ContactSection,
    Footer,
} from "../components/";
import axios from "../services/axios";
import getOptions from "../util/getOptions";

const Home = ({ options, projects }) => {
    return (
        <>
            <Head>
                <title>
                    {options["site-title"]} - {options["about-section"].role}
                </title>
            </Head>
            <Header options={options} />
            <InfoSection id="hero" infoSectionProps={options["main-section"]} />
            <AboutSection
                id="about"
                aboutSectionProps={options["about-section"]}
            />
            <PortfolioSection id="portfolio" projects={projects} />
            <ContactSection
                id="contact"
                contactDetails={options["contact-details"]}
            />
            <Footer options={options} />
        </>
    );
};

export const getServerSideProps = async (context) => {
    var projects = null;
    await axios
        .get(`/project/`, {})
        .then(({ data }) => {
            if (data.success) {
                projects = data.payload;
            }
        })
        .catch(() => {
            projects = null;
        });
    return {
        props: {
            options: (await getOptions()) || null,
            projects: projects || null,
        },
    };
};

export default Home;
