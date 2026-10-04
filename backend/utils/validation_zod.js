import z from "zod"

export const validationRegisterAndLogin = z.object({
    email: z.email(),
    password: z.string().min(8),
})



export const validationIncidents = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(["fire", "flood", "accident", "medical", "other"]),
    location: z.object({ lat: z.number().min(-90).max(90), lon: z.number().min(-180).max(180) }),
    createdBy: z.string(),
})





export const validationUpdateIncidents = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    category: z.enum(["fire", "flood", "accident", "medical", "other"]).optional(),
    status: z.enum(["open", "in_progress", "closed"]).optional(),
    location: z.object({ lat: z.number().min(-90).max(90), lon: z.number().min(-180).max(180) }).optional(),
    createdBy: z.string().optional(),
})



export const validationCategory = z.enum(["fire", "flood", "accident", "medical", "other"])