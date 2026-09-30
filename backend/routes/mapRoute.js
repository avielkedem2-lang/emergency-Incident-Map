import express from "express"
import { checkCategory, checkIncidents, checkUpdateIncidents, checkDeleteIncidents } from "../middleware/map.model.js"
import { getCategory, getIncident } from "../services/map.getService.js"
import { checkToken } from "../middleware/user.model.js"
import { updateIncident, deleteIncident ,createIncidents} from "../services/incidentsService.js"


const router = express.Router()



router.get("/", checkToken, checkCategory, async (req, res) => {
    try {
        const { category } = req.query
        const data = await getCategory(category)
        res.status(200).json({ success: true, data })
    } catch (err) {
        console.log(err);
    }
})



router.get("/:id", checkToken, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getIncident(id)
        res.status(200).json({ success: true, data })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})





router.post("/", checkToken, checkIncidents, async (req, res) => {
    try {
        const body = req.body
        const data = await createIncidents(body)
        res.status(201).json({ success: true, data })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})





router.patch("/:id", checkToken, checkUpdateIncidents, async (req, res) => {
    try {
        const id = req.params
        const body = req.body
        const data = await updateIncident(id, body)
        res.status(200).json({ success: true, data })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})





router.delete("/:id", checkToken, checkDeleteIncidents, async (req, res) => {
    try {
        const id = req.params
        const userId = req.userId
        const data = await deleteIncident(id, body)
        res.status(200).json({ success: true, data })
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ success: false, message: err.message })
        }
        console.log(err);
    }
})




export default router;