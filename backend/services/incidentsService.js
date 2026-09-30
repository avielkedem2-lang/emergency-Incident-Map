import mapDal from "../DAL/map.dal.js"
import userDal from "../DAL/user.dal.js"
import { createError } from "../utils/createError.js"



export async function createIncidents(body) {
    const user = await userDal.findUserById(body.createdBy);
    if (!user) throw createError(409, "The user not exists");
    body.status = "open";
    const data = await mapDal.insert(body);
    return data
}





export async function updateIncident(id, body) {
    const user = await userDal.findUserById(body.createdBy);
    if (!user) throw createError(409, "The user not exists");
    const incident = await mapDal.findById(id)
    if (!incident && incident.createdBy === body.createdBy) return createError(400, "The change must to be the user that did that")
    await mapDal.update(id, body)
    return { success: true }
};



export async function deleteIncident(id, userId) {
    const user = await userDal.findUserById(userId);
    if (!user) throw createError(409, "The user not exists");
    const incident = await mapDal.findById(id)
    if (!incident && incident.createdBy === userId) return createError(400, "The change must to be the user that did that")
    await mapDal.deleteFromMap(id)
    return { success: true }
}