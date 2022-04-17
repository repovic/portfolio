import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "../../../context/";
import { Header, Layout, PostsPage } from "../../../components";
import getOptions from "../../../util/getOptions";

const AdminPage = ({ options }) => {
    const { user } = useContext(UserContext);

    if (user.authToken && user.data?.role == "Administrator") {
        return (
            <>
                <Head>
                    <title>Admin / Blog - {options["site-title"]}</title>
                </Head>
                <Header options={options} />
                <Layout user={user} heading="Blog">
                    <PostsPage />
                </Layout>
            </>
        );
    } else {
        return null;
    }
};

export const getServerSideProps = async (context) => {
    return {
        props: {
            options: (await getOptions()) || null,
        },
    };
};

export default AdminPage;
