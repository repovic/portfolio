import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { LinkIcon } from "../../svg";
import {
    Blog,
    BlogContainer,
    Button,
    Filter,
    Heading,
    Navigation,
    Post,
    PostExcerpt,
    PostInfo,
    PostTitle,
    ResultsCount,
    SearchInput,
} from "./BlogElements";

import { UserContext } from "../../context/";

function BlogComponent({ options, posts, categories }) {
    const { user } = useContext(UserContext);

    const [currentShownPosts, setCurrentShownPosts] = useState(posts);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentFilter, setCurrentFilter] = useState("all");

    const router = useRouter();

    useEffect(() => {
        if (router.query.q) {
            setSearchQuery(router.query.q);
        }
    }, [router]);

    useEffect(() => {
        if (searchQuery) {
            setCurrentFilter("all");
            router.push(
                {
                    pathname: `/blog/`,
                    query: {
                        q: searchQuery,
                    },
                },
                undefined,
                { shallow: true }
            );
            const searchResults = posts?.filter(
                (post) =>
                    post._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.slug
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.lastName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.displayName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.author.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.category._id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.category.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.content
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    post.excerpt
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            setCurrentShownPosts(searchResults);
            window.document.querySelector("select").selectedIndex = 0;
        } else {
            router.push(
                {
                    pathname: `/blog/`,
                },
                undefined,
                { shallow: true }
            );
            if (currentFilter === "all") {
                setCurrentShownPosts(posts);
            }
        }
    }, [searchQuery]);

    useEffect(() => {
        if (currentFilter === "all") {
            setCurrentShownPosts(posts);
        } else {
            setSearchQuery("");
            const filteredPosts = posts?.filter(
                (post) => post.category.name === currentFilter
            );
            setCurrentShownPosts(filteredPosts);
        }
    }, [currentFilter]);

    useEffect(() => {
        setCurrentShownPosts(posts);
    }, [posts]);

    const handleChange = (event) => {
        if (event.target.value !== "all") {
            setCurrentShownPosts(
                posts?.filter(
                    (post) => post.category.name == event.target.value
                )
            );
        } else {
            setCurrentShownPosts(posts);
        }
    };

    return (
        <>
            <Head>
                <title>Blog - {options["site-title"]}</title>
            </Head>
            <Blog>
                <Navigation data-aos="fade-down">
                    <Heading>Recent posts: </Heading>
                    <div>
                        <SearchInput
                            placeholder="Search"
                            inputMode="search"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                        />
                        <Filter
                            value={currentFilter}
                            onChange={(e) => {
                                setCurrentFilter(e.target.value);
                            }}
                        >
                            <option value="all">All Categories</option>
                            {categories?.map((category) => (
                                <option
                                    key={category._id}
                                    vaule={category?.name}
                                >
                                    {category?.name}
                                </option>
                            ))}
                        </Filter>
                        <ResultsCount>
                            Showing {currentShownPosts?.length || 0} results.
                        </ResultsCount>
                    </div>
                    {user.data?.role == "Administrator" && (
                        <Link href={"/admin/posts/add"}>
                            <Button>Add Post</Button>
                        </Link>
                    )}
                </Navigation>
                {currentShownPosts?.length > 0 ? (
                    <BlogContainer>
                        {currentShownPosts?.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post._id}>
                                <a>
                                    <Post data-aos="zoom-in">
                                        <img
                                            src={post.thumbnail}
                                            alt={`${post.title} - Thumbnail`}
                                            loading={"lazy"}
                                        />
                                        <PostInfo>
                                            <div>
                                                <PostTitle>
                                                    {post.title} -{" "}
                                                    {post.category?.name}
                                                </PostTitle>
                                                <PostExcerpt>
                                                    {post.excerpt}
                                                </PostExcerpt>
                                            </div>
                                            <LinkIcon />
                                        </PostInfo>
                                    </Post>
                                </a>
                            </Link>
                        ))}
                    </BlogContainer>
                ) : (
                    <Heading className="error-message">
                        No posts available!
                    </Heading>
                )}
            </Blog>
        </>
    );
}

export default BlogComponent;
