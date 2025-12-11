import z from "zod";

export enum ShortenSortOrder {
  RECENTLY = 'recently',
}

export const getShortenSchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional(),
  sort: z.enum(Object.values(ShortenSortOrder)).optional(),
})

export type GetShortenDTO = z.infer<typeof getShortenSchema>;