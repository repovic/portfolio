module.exports = {
    async headers() {
        return [
            {
                source: "/",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "default-src 'unsafe-inline' *; img-src http: data:;",
                    },
                    {
                        key: "X-Content-Security-Policy",
                        value: "default-src 'unsafe-inline' *; img-src http: data:;",
                    },
                    {
                        key: "X-WebKit-CSP",
                        value: "default-src 'unsafe-inline' *; img-src http: data:;",
                    },
                ],
            },
        ];
    },
    env: {
        CLIENT_URL: process.env.CLIENT_URL,
        SERVER_URL: process.env.SERVER_URL,
        SERVER_CDN_URL: process.env.SERVER_CDN_URL,
        SITE_TITLE: process.env.SITE_TITLE,
        SITE_AUTHOR: process.env.SITE_AUTHOR,
        SITE_DOMAIN: process.env.SITE_DOMAIN,
        URL_SHORTENER_DOMAIN: process.env.URL_SHORTENER_DOMAIN,
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
        GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
    },
    images: {
        domains: ["drive.google.com"],
    },
};
