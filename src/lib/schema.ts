import { z } from "zod"

export const IdeasRequestSchema = z.object({
    description: z.string().max(100),
})

export type IdeasRequest = z.infer<typeof IdeasRequestSchema>