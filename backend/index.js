import express from "express"
import "dotenv/config"
import cors from "cors"
import { connection } from "./db/mongoDB.js"
import routerUser from "./routes/userRoute.js"
import router from "./routes/mapRoute.js"
import helmet from "helmet"


const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use("/auth", routerUser)
app.use("/incidents", router)






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
