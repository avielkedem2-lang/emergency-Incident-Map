import mapDal from "../DAL/map.dal.js"





export async function getCategory(category) {
    const incidents = await mapDal.findAll()
    if (typeof category === "string") {
        return getByCategory(category, incidents)
    }
    const allCategory = category.map((c) => {
        return getByCategory(c, incidents)
    })
    return allCategory
};


export async function getIncident(id){
    const incident = await mapDal.findById(id)
    if (!incident) throw createError(404, "The incident is not eexist");
    return incident
}






function getByCategory(category, incidents) {
    const allFire = incidents.filter((incident) => { return incident.category === category })
    return allFire
}



