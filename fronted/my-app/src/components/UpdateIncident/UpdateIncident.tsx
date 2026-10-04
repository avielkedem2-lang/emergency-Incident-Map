import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { updateIncident } from "../../fetchIncident";
import { incidentsCard } from "../../store/incidentsCard";


type Location = {
  lat: number,
  lon: number
}

type Incident = {
  title?: string,
  description?: string,
  category?: string,
  location: Location,
  status?: string
}


export default function UpdateIncident({ update, location }: { update: string, location: Location | undefined }) {
  if (update !== "update") return null
  const [incident, setIncident] = useState<Incident>({ location: { lat: -99, lon: -190 } })
  console.log(incident);

  useEffect(() => {
    setIncident({ ...incident, location: location! })
  }, [location])
  const res = useRef('')
  const [isRes, setIsRes] = useState<boolean>(false)
  const incidents = incidentsCard(s => s.incidents)
  const navigate = useNavigate()
  const inc = incidents.find((incident) => { return incident.location.lat === location?.lat && incident.location.lon === location.lon });
  if (!inc) return <p>not found location</p>
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        updateIncident(incident, token!,inc._id).then((data) => {
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
          {/* <option value=""></option> */}
          <option value="fire">fire</option>
          <option value="flood">flood</option>
          <option value="medical">medical</option>
          <option value="other">other</option>
        </select>
        <select name="" id="" onChange={(e) => setIncident({ ...incident, status: e.target.value })}>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        <button type="submit">send incident</button>
        {isRes && (
          <p>{res.current}</p>
        )}
      </form>
    </div>
  )
}
