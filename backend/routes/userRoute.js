import express from "express"
import { createUser, loginUser } from "../services/userService.js"
import { checkRegister } from "../middleware/user.model.js"





const router = express.Router()




router.post("/register", checkRegister, async (req, res) => {
    try {
        const body = req.body
        const user = await createUser(body);
        res.status(201).json({ success: true, data: user })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})






router.post("/login", async (req, res) => {
    try {
        const body = req.body
        const data = await loginUser(body);
        res.status(201).json({ success: true, data })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})





router.get("/me", async (req, res) => {
    try {

    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})




export default router;