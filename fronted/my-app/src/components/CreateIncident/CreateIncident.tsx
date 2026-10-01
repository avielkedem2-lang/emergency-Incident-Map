import { useEffect, useState } from "react";



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
  const [incident, setIncident] = useState({title: '', description: '', category: "", location: {lat: 0, lon: 0}})
  console.log(incident);
  
  useEffect(() => {
    setIncident({...incident, location:location!})
  },[location])
  
  
  return (
    <div>
      <form>
        <input type="text" placeholder="title" onChange={(e) => setIncident({...incident, title: e.target.value})}/>
        <input type="text" placeholder="description" onChange={(e) => setIncident({...incident, description: e.target.value})}/>
        <select name="" id="" onChange={(e) => setIncident({...incident, category: e.target.value})}>
          <option value=""></option>
          <option value="fire">fire</option>
          <option value="flood">flood</option>
          <option value="medical">medical</option>
          <option value="other">other</option>
        </select>
      </form>
    </div>
  )
}
