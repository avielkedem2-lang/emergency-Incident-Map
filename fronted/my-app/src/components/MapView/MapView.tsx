import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { incidentsCard } from "../../store/incidentsCard"

export default function MapView({ getLocation }: { getLocation: (location: { lat: number, lon: number }) => void }) {
    const incidents = incidentsCard(s => s.incidents)
    console.log(incidents);

    useEffect(() => {
        const map = L.map("map").setView([31.7683, 35.2137], 8)

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap"
        }).addTo(map)

        incidents.forEach((incident) => {
            const marker = L.marker([
                incident.location.lat,
                incident.location.lon
            ]).addTo(map)
                .bindPopup(`
            <b>${incident.title}</b>
            <br/>
            ${incident.description}
            <br/>
            category: ${incident.category}
            <br/>
            status: ${incident.status}
        `);
            
        marker.on("click", () => {
            getLocation({lat: incident.location.lat, lon: incident.location.lon})
        })

        })


        let clickMarker = null
        map.on('click', (e) => {
            const lat = e.latlng.lat
            const lon = e.latlng.lng


            if (clickMarker!) {
                map.removeLayer(clickMarker)
            }

            clickMarker = L.marker([lat, lon]).addTo(map)

            if (getLocation) {
                getLocation({ lat, lon })
            }

        })
        return () => {
            map.remove()
        }
    }, [incidents])
    return (
        <div id="map">
        </div>
    )
}
