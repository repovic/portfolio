module.exports = (req) => {
    let browser = null;
    if (req.headers["user-agent"]) {
        let ua = req.headers["user-agent"].toLowerCase();
        if (ua.indexOf("chrome") > -1) {
            browser = "Chrome";
        } else if (ua.indexOf("firefox") > -1) {
            browser = "Firefox";
        } else if (ua.indexOf("safari") > -1) {
            browser = "Safari";
        } else if (ua.indexOf("opera") > -1) {
            browser = "Opera";
        } else if (ua.indexOf("msie") > -1) {
            browser = "IE";
        }
    }

    return browser;
};
