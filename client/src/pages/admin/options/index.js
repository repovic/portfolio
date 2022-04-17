import Head from "next/head";
import { useContext } from "react";
import { Header, Layout, OptionsPage } from "../../../components";
import getOptions from "../../../util/getOptions";
import { UserContext } from "../../../context/";

const AdminPage = ({ options }) => {
    const { user } = useContext(UserContext);

    if (user.authToken && user.data?.role == "Administrator") {
        return (
            <>
                <Head>
                    <title>Admin / Options - {options["site-title"]}</title>
                </Head>
                <Header options={options} />
                <Layout user={user} heading="Options">
                    <OptionsPage />
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
