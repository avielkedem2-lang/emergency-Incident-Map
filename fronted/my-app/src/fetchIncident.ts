import axios from "axios";




async function sendRequestPost(url: string, body: object, token: string) {
    try {
        const data = await axios.post(url, body, { headers: { token } });
        return { data }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data
            return { message }
        }
    }
}



export async function createIncident(body: object, token: string) {
    const url = "http://localhost:3000/incidents";
    const res = await sendRequestPost(url, body, token);
    return res
}

