import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function MapView({getLocation} :{ getLocation: (location: {lat: number, lon: number}) => void }) {
    useEffect(() => {
        const map = L.map("map").setView([31.7683, 35.2137], 12)

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap"
        }).addTo(map)

        L.marker([31.7683, 35.2137])
            .addTo(map)
            .bindPopup("Jerusalem")
        
        let clickMarker = null
        map.on('click', (e) => {
            const lat = e.latlng.lat
            const lon = e.latlng.lng
            

            if (clickMarker!){
                map.removeLayer(clickMarker)
            }

            clickMarker = L.marker([lat, lon]).addTo(map)

            if (getLocation) {
                getLocation({lat, lon})
            }
        
        })
        return () => {
            map.remove()
        }
    }, [])
    return (
        <div id="map">
        </div>
    )
}
