import express from "express"
import { checkCategory } from "../middleware/map.model.js"
import { getCategory, getIncident } from "../services/map.getService.js"


const router = express.Router()



router.get("/", checkCategory, async (req, res) => {
    try {
        const { category } = req.query
        const data = await getCategory(category)
        res.status(200).json({ success: true, data })
    } catch (err) {
        console.log(err);
    }
})



router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getIncident(id)
        res.status(200).json({success: true, data})
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})


export default router;