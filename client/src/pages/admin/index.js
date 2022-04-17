import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/";
import getOptions from "../../util/getOptions";

const AdminPage = ({ options }) => {
    const { user } = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        if (window.innerWidth < 1600) {
            router.push({
                pathname: "/",
                query: {
                    notificationMessage:
                        "You cannot use Admin Dashboard at this time!",
                    notificationType: "error",
                },
            });
        } else if (user.authToken && user.data?.role == "Administrator") {
            router.push({
                pathname: "/admin/dashboard",
                query: {
                    notificationMessage:
                        "Successfully logged in as administrator!",
                    notificationType: "success",
                },
            });
        } else {
            router.push({
                pathname: "/signin",
                query: {
                    notificationMessage:
                        "You are not logged in as an administrator!",
                    notificationType: "error",
                },
            });
        }
    }, [router, user]);
    return null;
};

export const getServerSideProps = async (context) => {
    return {
        props: {
            options: (await getOptions()) || null,
        },
    };
};

export default AdminPage;
