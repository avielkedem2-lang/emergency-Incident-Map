import axios from "axios";




async function sendRequestPost(url:string, body:object) {
    try {
        const data = await axios.post(url, body);
        return {data}
    } catch (err) {
        if (axios.isAxiosError(err)){
            const message = err.response?.data
            return {message}
        }
    }
}



export async function register(body:object) {
    const url = "http://localhost:3000/auth/register";
    const res = await sendRequestPost(url, body);
    return res
}




export async function login(body:object) {
    const url = "http://localhost:3000/auth/login";
    const res = await sendRequestPost(url, body);
    return res
};



async function sendRequestGet(url:string, token: string) {
    try {
        const data = await axios.get(url, {headers: {token}});
        return {data}
    } catch (err) {
        if (axios.isAxiosError(err)){
            const message = err.response?.data
            return {message}
        }
    }
}




export async function getUser(token:string) {
    const url = "http://localhost:3000/auth/me";
    const res = await sendRequestGet(url, token);
    return res
}