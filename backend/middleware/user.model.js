import { validationRegisterAndLogin } from "../utils/validation_zod.js"
import { verifyToken } from "../utils/token.js"
import {passwordHash} from "../utils/hash.js"



export const checkRegister = async (req, res, next) => {
    const body = req.body;
    if (validationRegisterAndLogin.safeParse(body).success === false) return res.status(400).json({ success: false, message: "bad request" });
    const password = await passwordHash(body.password);
    req.body.password = password
    next()
}


export const checkLogin = async (req, res, next) => {
    const body = req.body;
    if (validationRegisterAndLogin.safeParse(body).success === false) return res.status(400).json({ success: false, message: "bad request" });
    next()
}



export const checkMe = async (req, res, next) => {
    const token = req.headers.token
    if (!token) return res.status(400).json({ success: false, message: "missing token" });
    try {
        const isToken = verifyToken(token)
    } catch (err) {
        return res.status(401).json({ success: false, message: "The token is not good" })
    }
    req.token = token
    next()
}