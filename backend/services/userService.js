import userDal from "../DAL/user.dal.js"
import { createToken, decodeToken } from "../utils/token.js"
import { createError } from "../utils/createError.js";
import {comparePassword} from "../utils/hash.js"





export async function createUser(body) {
    const isUser = await userDal.findUserByEmail(body.email);
    if (isUser) throw createError(409, "The user already eexist");
    const user = await userDal.insertUser(body);
    delete user.password
    return user
}





export async function loginUser(body) {
    const user = await userDal.findUserByEmail(body.email);
    if (!user) throw createError(404, "The is not eexist");
    const isCompere = await comparePassword(body.password, user.password);
    if (!isCompere) throw createError(401, "The password not correct");
    const token = createToken(user._id)
    return token
}




export async function getUser(token) {
    const id = decodeToken(token).id;
    const user = await userDal.findUserById(id);
    delete user.password
    return user
}