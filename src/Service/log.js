import axios from "axios";
import { BACKEND_URL } from "../Constant/constant";

export async function getLogs({page,perPage}){
    const response = await axios.get(`${BACKEND_URL}?page=${page}&perPage=${perPage}`);
    return response.data;
}

export async function createLog(data){
    const response = await axios.post(`${BACKEND_URL}/`,data);
    return response.data;
}