import axios from "axios";

const OnyxCoreInstance = axios.create({
    baseURL: "https://api.onyxcore.io",
})