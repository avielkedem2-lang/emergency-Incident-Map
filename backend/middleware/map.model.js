import { validationIncidents, validationUpdateIncidents } from "../utils/validation_zod.js"
import { decodeToken } from "../utils/token.js"
import { ObjectId } from "mongodb"



export const checkCategory = (req, res, next) => {
    if (Object.keys(req.query).length === 0) return next();
    const { category } = req.query
    if (typeof category === "string" || typeof category === "object") return next()
    return res.status(400).json({ success: false, message: "bad request" });
}




export const checkIncidents = (req, res, next) => {
    const body = req.body;
    const id = decodeToken(req.token).id
    if (!body) return res.status(400).json({ success: false, message: "bad request" });
    req.body.createdBy = id
    if (validationIncidents.safeParse(body).success === false) return res.status(400).json({ success: false, message: "bad request" });
    next()
}





export const checkUpdateIncidents = (req, res, next) => {
    const body = req.body;
    console.log(body);
    
    const userId = decodeToken(req.token).id
    if (!body) return res.status(400).json({ success: false, message: "bad request" });
    req.body.createdBy = userId
    if (validationUpdateIncidents.safeParse(body).success === false) return res.status(400).json({ success: false, message: "bad request" });
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "bad request ID is not good" });
    next()
}






export const checkDeleteIncidents = (req, res, next) => {
    const userId = decodeToken(req.token).id
    req.userId = userId
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "bad request ID is not good" });
    next()
}