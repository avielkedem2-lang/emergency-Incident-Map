import express from "express"
import "dotenv/config"
import cors from "cors"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())







function run(){
    app.listen(PORT, () => {
        console.log("The server is running...");
    })
}


run()
