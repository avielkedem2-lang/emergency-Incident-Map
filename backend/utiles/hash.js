import bcrypt from "bcrypt"


export async function passwordHash(password){
    return bcrypt.hash(password, 10)
}


export async function comparePassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash)
}
