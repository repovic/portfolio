import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Header, Blog, Footer } from "../../components/";
import { NotificationContext } from "../../context/";
import axios from "../../services/axios";
import getOptions from "../../util/getOptions";

const PostsPage = ({ options, categories, posts }) => {
    const { showNotification } = useContext(NotificationContext);

    const router = useRouter();

    useEffect(() => {
        const { notificationMessage, notificationType } = router.query;
        if (notificationMessage && notificationType) {
            showNotification(notificationMessage, notificationType);
            window.history.replaceState(
                {},
                document.title,
                window.location.href.split("?")[0]
            );
        }
    }, []);
    return (
        <>
            <Header options={options} />
            <Blog categories={categories} posts={posts} options={options} />
            <Footer options={options} />
        </>
    );
};

export const getServerSideProps = async (context) => {
    var categories,
        posts = [];
    await axios
        .get(`/category/`, {})
        .then(async ({ data }) => {
            if (data.success) {
                categories = data.payload;
                await axios
                    .get(`/post/`, {})
                    .then(({ data }) => {
                        if (data.success) {
                            posts = data.payload;
                        }
                    })
                    .catch(() => {
                        posts = [];
                    });
            }
        })
        .catch(() => {
            categories = [];
        });

    return {
        props: {
            categories: categories,
            posts: posts,
            options: (await getOptions()) || null,
        },
    };
};

export default PostsPage;
