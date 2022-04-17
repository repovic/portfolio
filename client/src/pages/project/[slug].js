import { Header, Project, Footer } from "../../components/";
import getOptions from "../../util/getOptions";
import axios from "../../services/axios";

const ProjectPage = ({ slug, project, options }) => {
    return (
        <>
            <Header options={options} />
            <Project project={project} options={options} />
            <Footer options={options} />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const slug = context.query.slug;
    var project = null;
    await axios
        .get(`/project/${slug}`, {})
        .then(({ data }) => {
            if (data.success) {
                project = data.payload;
            }
        })
        .catch(() => {
            project = null;
        });
    return {
        props: {
            project: project || null,
            options: (await getOptions()) || null,
        },
    };
};

export default ProjectPage;
