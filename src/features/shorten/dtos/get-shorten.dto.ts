import z from "zod";

export enum ShortenSortOrder {
  RECENTLY = 'recently',
  MOST_CLICKS = 'most-clicks',
}

export const getShortenSchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional(),
  sort: z.enum(Object.values(ShortenSortOrder)).optional(),
  search: z.string().min(1).optional(),
})

export type GetShortenDTO = z.infer<typeof getShortenSchema>;