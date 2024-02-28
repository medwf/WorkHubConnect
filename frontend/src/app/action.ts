"use server"

import domain from "@/helpers/constants";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchWorkers = async () => {
    try {
        const url = `${domain}/workers`
        const response = await axios.get(url);
        const data = response.data
        return data;
    } catch (error:any) {
        toast(error.response.data.error);
    }
}