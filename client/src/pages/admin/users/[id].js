import Head from "next/head";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/";
import { Header, Layout, UserDetailsPage } from "../../../components";
import getOptions from "../../../util/getOptions";

const AdminPage = ({ options }) => {
    const { user } = useContext(UserContext);
    const router = useRouter();

    if (user.authToken && user.data?.role == "Administrator") {
        return (
            <>
                <Head>
                    <title>Admin / Users - {options["site-title"]}</title>
                </Head>
                <Header options={options} />
                <Layout user={user} heading="Update User">
                    <UserDetailsPage userId={router.query.id} />
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
