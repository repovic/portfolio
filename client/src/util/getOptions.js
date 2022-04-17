import axios from "../services/axios";

const getOptions = async () => {
    const { data } = await axios.get("/option");

    const options = data.success ? data.payload : null;

    let optionsFormatted = {};
    for (const option of options) {
        optionsFormatted[option.name] = option.value;
    }

    return optionsFormatted;
};

export default getOptions;
