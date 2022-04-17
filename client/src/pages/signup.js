import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Header, SignUp, Footer } from "../components/";
import { UserContext } from "../context/";
import getOptions from "../util/getOptions";

const SignUpPage = ({ options }) => {
    const { user } = useContext(UserContext);

    const router = useRouter();
    useEffect(() => {
        const { callback } = router.query;
        if (localStorage.getItem("auth-token").length !== 0) {
            router.push({
                pathname: "/",
                query: {
                    notificationMessage: "You are already signed in!",
                    notificationType: "success",
                },
            });
        }
        if (
            localStorage.getItem("auth-token").toString().length > 0 &&
            callback
        ) {
            for (const application of options.applications) {
                console.log(application);
                if (callback.endsWith(application)) {
                    router.push(
                        `${callback}?authToken=${localStorage.getItem(
                            "auth-token"
                        )}` || "/"
                    );
                }
            }
        }
    }, [router]);

    if (!user.authToken) {
        return (
            <>
                <Head>
                    <title>Sign Up - {options["site-title"]}</title>
                </Head>
                <Header options={options} />
                <SignUp />
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

export default SignUpPage;
