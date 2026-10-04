import { create } from "zustand";



type Location = {
  lat: number,
  lon: number
}


type Incident = {
    _id: string,
    title: string,
    description: string,
    category: string,
    location: Location,
    createdBy: string,
    status: string,
};




type IncidentsType = {
    incidents: Incident[],
    setIncidents: (incidents: Incident[]) => void,
    removeIncident : (incident: Incident) => void,
    addIncident: (incident: Incident) => void;
    updateInc: (incident: Incident) => void
};


export const incidentsCard = create<IncidentsType>((set) => ({
    incidents: [],
    setIncidents: (incidents: Incident[]) => set(() => ({incidents})),
    removeIncident: (incident: Incident) => set((s) => ({incidents: s.incidents.filter((inc) => {return inc._id !== incident._id})})),
    addIncident : (incident: Incident) => set((s) => ({incidents: [...s.incidents, incident]})),
    updateInc: (incident: Incident) => set((s) =>({incidents: [...s.incidents.filter((inc) => {return inc._id !== incident._id}), incident]}))
}))