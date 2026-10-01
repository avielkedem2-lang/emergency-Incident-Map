import { useEffect, useRef, useState } from "react";
import { createIncident } from "../../fetchIncident";
import { useNavigate } from "react-router";



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

  if (create !== "create") return null;
  const [incident, setIncident] = useState<Incident>({ title: '', description: '', category: "", location: { lat: 0, lon: 0 } })
  console.log(incident);

  useEffect(() => {
    setIncident({ ...incident, location: location! })
  }, [location])

  const res = useRef('')
  const [isRes, setIsRes] = useState<boolean>(false)
  const navigate = useNavigate()
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        createIncident(incident, token!).then((data) => {
          console.log(data?.message.message)
          if (data?.data) {
            setIsRes(true)
            res.current = data.data.data.success
            console.log(res);
            
          } else {
            
            setIsRes(true);
            res.current = data?.message.message
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
