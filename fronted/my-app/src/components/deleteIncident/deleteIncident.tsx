import { useEffect, useRef, useState } from "react";
import { incidentsCard } from "../../store/incidentsCard";
import { deleteById } from "../../fetchIncident";
import { useNavigate } from "react-router";


type Location = {
    lat: number,
    lon: number
}


export default function DeleteIncident({ deleteIncident, location }: { deleteIncident: string, location: Location | undefined }) {
    
    const [loc, setLocation] = useState<Location>();
    const incidents = incidentsCard(s => s.incidents)
    const removeIncident = incidentsCard(s => s.removeIncident)
    const res = useRef('')
    const [isRes, setIsRes] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        setLocation(location)
    }, [location])

    console.log("location",loc);
    

    const deleteInc = () => {
        const incident = incidents.find((incident) => { return incident.location.lat === loc?.lat && incident.location.lon === loc.lon }); 
        if (!incident) return <p>The location is not good</p>
        const token = localStorage.getItem("token")
        deleteById(token!, incident?._id).then((data) => {
            console.log(data);
            if (data?.data) {
                removeIncident(incident)
                setIsRes(true)
                res.current = data.data.data.success
            } else {

                setIsRes(true);
                res.current = data?.message.message
                console.log(res.current);

                if (data?.message.message === "The token is not good") return navigate("/login")
            }
        })
    }
    if (deleteIncident !== "delete") return null;
    return (
        <div>
            <button onClick={deleteInc}>I want to delete</button>
            {isRes && (
                <p>{res.current}</p>
            )}
        </div>
    )
}
