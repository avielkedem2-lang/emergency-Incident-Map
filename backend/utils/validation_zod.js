import z from "zod"

export const validationRegisterAndLogin = z.object({
    email: z.email(),
    password: z.string().min(8),
})



export const validationIncidents = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(["fire", "flood", "accident", "medical", "other"]),
    location: z.object({ lat: z.number(), lon: z.number() }),
    createdBy: z.string(),
})
