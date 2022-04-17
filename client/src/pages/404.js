import { useEffect, useState } from "react";
import Head from "next/head";
import { Header, Page404, Footer } from "../components";
import getOptions from "../util/getOptions";

const _404Page = () => {
    const [options, setOptions] = useState(null);
    useEffect(async () => {
        setOptions(await getOptions());
    }, []);
    return (
        <>
            {options && (
                <>
                    <Head>
                        <title>Page not found - {options["site-title"]}</title>
                    </Head>
                    <Header options={options} />
                    <Page404 />
                    <Footer options={options} />
                </>
            )}
        </>
    );
};

export default _404Page;
