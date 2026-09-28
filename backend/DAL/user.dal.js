import { ObjectId } from "bson";
import db from "../db/mongoDB.js";



const coll = db.collection("users");



async function insertUser(user) {
    const res = await coll.insertOne(user)
    return {_id: res.insertedId, ...user}
}



async function findUserById(id) {
    return coll.findOne({_id: ObjectId(id)})
}




export default {
    insertUser,
    findUserById,
}