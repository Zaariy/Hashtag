import axios from "axios";

export const axiosInc = axios.create({
    baseURL : "https://hashtagappe.herokuapp.com/"
})