import express from "express"
import "dotenv/config"
import cors from "cors"
import { connection } from "./db/mongoDB.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())







function run(){
    app.listen(PORT, () => {
        console.log("The server is running...");
    })
    try {
        connection()
    } catch (error) {
        
    }
}


run()
