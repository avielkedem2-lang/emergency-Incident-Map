import axios from "axios";







async function sendRequestPost(url: string, body: object, token: string) {
    try {
        const data = await axios.patch(url, body, { headers: { token } });
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





export async function updateIncident(body: object, token: string, id:string) {
    const url = `http://localhost:3000/incidents/${id}`;
    const res = await sendRequestPost(url, body, token);
    return res
}







async function sendRequestDelete(url: string, token: string) {
    try {
        const data = await axios.delete(url, { headers: { token } });
        return { data }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data
            return { message }
        }
    }
}




export async function deleteById(token:string, id:string) {
    const url = `http://localhost:3000/incidents/${id}`;
    const res = await sendRequestDelete(url, token);
    return res
}
