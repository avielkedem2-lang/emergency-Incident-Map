
export const checkCategory = (req, res, next) => {
    const { category } = req.query
    if (typeof category === "string" || typeof category === "object") return next()
    return res.status(400).json({success: false, message: "bad request"});
} 