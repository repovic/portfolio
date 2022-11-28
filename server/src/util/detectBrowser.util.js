const Bowser = require("bowser");

module.exports = ({ headers }) => {
    const userAgent = headers["user-agent"];
    const { browser } = Bowser.parse(userAgent);

    return `${browser.name}\\${browser.version}`;
};
