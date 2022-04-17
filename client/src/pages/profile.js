import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Header, Profile, Footer } from "../components";
import { UserContext } from "../context/";
import getOptions from "../util/getOptions";

const ProfilePage = ({ options }) => {
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("auth-token").toString().length == 0) {
            router.push({
                pathname: "/signin",
                query: {
                    notificationMessage: "You must be signed in!",
                    notificationType: "error",
                },
            });
        }
    }, [router]);

    if (user.authToken) {
        return (
            <>
                <Head>
                    <title>Profile - {options["site-title"]}</title>
                </Head>
                <Header options={options} />
                <Profile />
                <Footer options={options} />
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

export default ProfilePage;
