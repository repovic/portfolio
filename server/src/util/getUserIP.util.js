module.exports = (req) => {
    return req.headers["X-Forwarded-For"] || req.ip || "N/A";
}