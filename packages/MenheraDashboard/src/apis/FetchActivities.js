import axios from "axios"
import { ip } from "../config.json"

export default axios.create({
    baseURL: `http://${ip}:25156/api/activity`
});