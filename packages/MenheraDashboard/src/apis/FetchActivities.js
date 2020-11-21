import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:25156/api/activity"
});