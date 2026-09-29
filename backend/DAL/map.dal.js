import db from "../db/mongoDB.js";



const coll = db.collection("map");



async function findAll() {
    return coll.find().toArray()
}


async function findById(id) {
    return coll.findOne({ id })
}


async function insert(body) {
    return coll.insertOne(body)
}


async function update(id, body) {
    return coll.updateOne({ id }, { $set: { ...body } })
}



async function deleteFromMap(id) {
    return coll.deleteOne({id})
}



export default {
    findAll,
    findById,
    insert,
    update,
    deleteFromMap,
}