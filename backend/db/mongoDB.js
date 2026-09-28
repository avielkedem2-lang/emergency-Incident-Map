import "dotenv";
import { MongoClient } from "mongodb"



const MONGODB_URI = process.env.MONGODB_URI

const client = new MongoClient(MONGODB_URI)


export async function connection() {
    try {
        await client.connect()
        console.log("connection success");
    } catch (error) {
        console.log("connection to mongo filed");
    }
}


const db = client.db("emergency_Incident_Map");

export default db;