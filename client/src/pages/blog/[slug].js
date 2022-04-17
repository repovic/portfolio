import { Header, Post, Footer } from "../../components/";
import getOptions from "../../util/getOptions";
import axios from "../../services/axios";

const PostPage = ({ slug, post, options }) => {
    return (
        <>
            <Header options={options} />
            <Post post={post} options={options} />
            <Footer options={options} />
        </>
    );
};

export const getServerSideProps = async (context) => {
    const slug = context.query.slug;
    var post = null;
    await axios
        .get(`/post/${slug}`, {})
        .then(({ data }) => {
            if (data.success) {
                post = data.payload;
            }
        })
        .catch(() => {
            post = null;
        });
    return {
        props: {
            post: post,
            options: (await getOptions()) || null,
        },
    };
};

export default PostPage;
