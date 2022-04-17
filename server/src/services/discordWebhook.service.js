const axios = require("axios");

const self = (module.exports = {
    postMessage: async (data) => {
        try {
            if (Number(process.env.DISCORD_WEBHOOK_ENABLED) === 1) {
                return await axios.post(process.env.DISCORD_WEBHOOK_URL, data);
            }
        } catch (error) {
            console.log(error);
        }
    },
});
