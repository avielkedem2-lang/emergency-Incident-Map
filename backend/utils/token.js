import jwt from "jsonwebtoken";
import "dotenv/config";



export function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}


export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}




export function decodeToken(token) {
    return jwt.decode(token)
}