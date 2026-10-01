import "leaflet/dist/leaflet.css"
import "./map.css"
import MapView from "../components/MapView/MapView"
import CreateIncident from "../components/CreateIncident/CreateIncident"
import UpdateIncident from "../components/UpdateIncident/UpdateIncident"
import { useState } from "react"

type Location = {
    lat: number,
    lon: number
}



export default function Map() {
    const [mode, setMode] = useState<"none" | "create" | "update" | "delete">("none")
    const [location, setLocation] = useState<Location>()
    return (
        <div className="map" >
            <button onClick={() => setMode("create")}>To create</button>
            <button onClick={() => setMode("update")}>To update</button>
            <button onClick={() => setMode("delete")}>To delete</button>
            <MapView getLocation={setLocation} />
            <CreateIncident create={mode} location={location}/>
            <UpdateIncident update={mode}/>
        </div>
    )
}
