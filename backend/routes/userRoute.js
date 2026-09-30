import express from "express"
import { createUser, getUser, loginUser } from "../services/userService.js"
import { checkLogin, checkRegister, checkToken } from "../middleware/user.model.js"




const router = express.Router()




router.post("/register", checkRegister, async (req, res) => {
    try {
        const body = req.body
        console.log(body);
        
        const user = await createUser(body);
        res.status(201).json({ success: true, data: user })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})






router.post("/login", checkLogin, async (req, res) => {
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





router.get("/me",checkToken, async (req, res) => {
    try {
        const token = req.token
        const data = await getUser(token);
        res.status(200).json({ success: true, data })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})




export default router;