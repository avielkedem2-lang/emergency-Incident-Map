import bcrypt from "bcrypt"


export async function passwordHash(password) {
    return bcrypt.hash(password, 10)
}


export async function comparePassword(password, passwordHash) {
    console.log(passwordHash);
    
    return bcrypt.compare(password, passwordHash)
}
