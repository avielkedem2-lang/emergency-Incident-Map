import express from "express"
import "dotenv/config"
import cors from "cors"
import { connection } from "./db/mongoDB.js"
import routerUser from "./routes/userRoute.js"
import router from "./routes/mapRoute.js"
import helmet from "helmet";
import { Server } from "socket.io"
import {createServer} from "http"



const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use("/auth", routerUser)
app.use("/incidents", router)

const server = createServer(app)

const io = new Server(server, {
    cors: {origin: ["http://localhost:5173/"]}
})



io.on("connection", ()=>{
    
})


async function run() {
    try {
        await connection()
        app.listen(PORT, () => {
            console.log("The server is running...");
        })
    } catch (error) {

    }
}


run()
