import express from "express"
import "dotenv/config"
import cors from "cors"
import { connection } from "./db/mongoDB.js"
import routerUser from "./routes/userRoute.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use("/auth", routerUser)






function run() {
    try {
        connection()
        app.listen(PORT, () => {
            console.log("The server is running...");
        })
    } catch (error) {

    }
}


run()
