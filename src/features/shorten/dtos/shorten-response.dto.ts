import z from "zod";

const shortenResponseSchema = z.object({
  id: z.cuid(),
  shortCode: z.string(),
  url: z.url(),
  accessCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ShortenResponseDTO = z.infer<typeof shortenResponseSchema>;