import { ObjectId } from "mongodb";
import db from "../db/mongoDB.js";



const coll = db.collection("map");



async function findAll() {
    return coll.find().toArray()
}


async function findById(id) {
    return coll.findOne({ _id: new ObjectId(id) })
}


async function insert(body) {
    return coll.insertOne(body)
}


async function update(id, body) {
    return coll.updateOne({ _id: new ObjectId(id) }, { $set: { ...body } })
}



async function deleteFromMap(id) {
    return coll.deleteOne({_id: new ObjectId(id)})
}



export default {
    findAll,
    findById,
    insert,
    update,
    deleteFromMap,
}