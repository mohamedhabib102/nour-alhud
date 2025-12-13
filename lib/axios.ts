import axios from "axios";

const req = axios.create({
    baseURL: "https://alhodaalnabawya.runasp.net/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default req;