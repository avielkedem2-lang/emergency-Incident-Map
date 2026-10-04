import mapDal from "../DAL/map.dal.js"
import userDal from "../DAL/user.dal.js"
import { createError } from "../utils/createError.js"



export async function createIncidents(body) {
    const user = await userDal.findUserById(body.createdBy);
    if (!user) throw createError(409, "The user not exists");
    body.status = "open";
    const id = await mapDal.insert(body);
    const data = await mapDal.findById(id.insertedId)
    return data
}





export async function updateIncident(id, body) {
    const user = await userDal.findUserById(body.createdBy);
    if (!user) throw createError(409, "The user not exists");
    const incident = await mapDal.findById(id)
    if (!incident) throw createError(404, "The change must to be the user that did that");
    if (incident.createdBy !== body.createdBy) throw createError(403, "Only the creator can change this incident")
    await mapDal.update(id, body)
    return "The incident update successfully!"
};



export async function deleteIncident(id, userId) {
    const user = await userDal.findUserById(userId);
    if (!user) throw createError(409, "The user not exists");
    const incident = await mapDal.findById(id)
    if (!incident) throw createError(404, "The change must to be the user that did that");
    if (incident.createdBy !== userId) throw createError(403, "Only the creator can change this incident")
    await mapDal.deleteFromMap(id)
    return "The incident delete successfully!"
}