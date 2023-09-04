import { z } from "zod"

export const IdeasRequestSchema = z.object({
    description: z.string().max(100),
})

export const ProfileSchema = z.object({
    username: z.string().max(100),
    firstname: z.string().max(100),
    lastname: z.string().max(100),
})

export type IdeasRequest = z.infer<typeof IdeasRequestSchema>

export type Profile = z.infer<typeof ProfileSchema>