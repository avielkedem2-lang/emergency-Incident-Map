import {validationRegisterAndLogin} from "../utils/validation_zod.js"



export const checkRegister = (req, res, next) => {
    const body = req.body;
    if (validationRegisterAndLogin.safeParse(body).success === false) return;
    next()
}


