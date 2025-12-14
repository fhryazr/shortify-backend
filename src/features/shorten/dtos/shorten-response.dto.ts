import z from "zod";

export const shortenResponseSchema = z.object({
  id: z.cuid(),
  shortCode: z.string().length(6).regex(/^[A-Za-z0-9_-]+$/, "Invalid shortCode format"),
  url: z.url(),
  accessCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const idParamSchema = shortenResponseSchema.pick({ id: true });
export const shortCodeParamSchema = shortenResponseSchema.pick({ shortCode: true });

export type ShortenResponseDTO = z.infer<typeof shortenResponseSchema>;