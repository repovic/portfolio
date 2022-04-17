import Head from "next/head";
import { useContext } from "react";
import { Header, Layout, ShortURLsPage } from "../../../components";
import { UserContext } from "../../../context/";
import getOptions from "../../../util/getOptions";

const AdminPage = ({ options }) => {
    const { user } = useContext(UserContext);

    if (user.authToken && user.data?.role == "Administrator") {
        return (
            <>
                <Head>
                    <title>Admin / Short URLs - {options["site-title"]}</title>
                </Head>
                <Header options={options} />
                <Layout user={user} heading="Short URLs">
                    <ShortURLsPage />
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
