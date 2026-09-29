import { ObjectId } from "bson";
import db from "../db/mongoDB.js";



const coll = db.collection("users");



async function insertUser(user) {
    const res = await coll.insertOne(user)
    return { _id: res.insertedId, ...user }
}



async function findUserById(id) {
    return coll.findOne({ _id:new ObjectId(id) })
}



async function findUserByEmail(email) {
    return coll.findOne({ email })
}


export default {
    insertUser,
    findUserById,
    findUserByEmail,
}