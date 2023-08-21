import * as z from "zod"

export const singInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
})