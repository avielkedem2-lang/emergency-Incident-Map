import mapDal from "../DAL/map.dal.js"
import userDal from "../DAL/user.dal.js"
import { createError } from "../utils/createError.js"



export async function createIncidents(body) {
    const user = await userDal.findUserById(body.createBy);
    if (!user) throw createError(409, "The user not exists");
    body.status = "open";
    const data = await mapDal.insert(body);
    return data
}





export async function updateIncident(id, body) {
    const user = await userDal.findUserById(body.createBy);
    if (!user) throw createError(409, "The user not exists");
    await mapDal.update(id, body)
    return { success: true }
};



export async function deleteIncident(id, userId) {
    const user = await userDal.findUserById(userId);
    if (!user) throw createError(409, "The user not exists");
    await mapDal.deleteFromMap(id)
    return { success: true }
}