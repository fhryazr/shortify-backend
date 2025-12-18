import z from "zod";

export const createShortenSchema = z.object({
  userId: z.string(),
  url: z.url().min(1, "URL is required"),
})

export type CreateShortenDTO = z.infer<typeof createShortenSchema>