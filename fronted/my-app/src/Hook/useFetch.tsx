import { useEffect } from "react";
import { incidentsCard } from "../store/incidentsCard";
import axios from "axios";




export function useFetch(url: string, token: string) {
    const setIncident = incidentsCard(s => s.setIncidents);
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(url, {headers: {token}})
                console.log(data.data);
                setIncident(data.data)
            } catch (error) {
                console.log("ERROR:", error)
            }
        }
        fetch()
    }, []);

}