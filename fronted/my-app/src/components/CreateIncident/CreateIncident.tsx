import { useEffect, useRef, useState } from "react";
import { createIncident } from "../../fetchIncident";
import { useNavigate } from "react-router";
import { incidentsCard } from "../../store/incidentsCard";



type Location = {
  lat: number,
  lon: number
}

type Incident = {
  title: string,
  description: string,
  category: string,
  location: Location,
}



export default function CreateIncident({ create, location }: { create: string, location: Location | undefined }) {

  
  const [incident, setIncident] = useState<Incident>({ title: '', description: '', category: "", location: { lat: 0, lon: 0 } })
  useEffect(() => {
    setIncident({ ...incident, location: location! })
  }, [location])

  const res = useRef('')
  const [isRes, setIsRes] = useState<boolean>(false)
  const navigate = useNavigate();
  const addIncident = incidentsCard(s => s.addIncident);
  if (create !== "create") return null;
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        createIncident(incident, token!).then((data) => {
          console.log(data?.data?.data);
          if (data?.data) {  
            addIncident(data.data.data.data)
          } else {

            setIsRes(true);
            res.current = data?.message.message
            console.log(res.current);
            
            if (data?.message.message === "The token is not good") return navigate("/login")

          }
        })
      }}>
        <input type="text" placeholder="title" onChange={(e) => setIncident({ ...incident, title: e.target.value })} />
        <input type="text" placeholder="description" onChange={(e) => setIncident({ ...incident, description: e.target.value })} />
        <select name="" id="" onChange={(e) => setIncident({ ...incident, category: e.target.value })}>
          <option value=""></option>
          <option value="fire">fire</option>
          <option value="flood">flood</option>
          <option value="medical">medical</option>
          <option value="other">other</option>
        </select>
        <button type="submit">send incident</button>
        {isRes && (
          <p>{res.current}</p>
        )}
      </form>
    </div>
  )
}
